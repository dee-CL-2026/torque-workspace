#!/usr/bin/env python3
"""
Telegram delta message exporter.
Exports only NEW messages since last run.

Modes:
  --delta    (default) Export only new messages since last run
  --full     Export all messages (resets state)
  --batch N  Export in batches of N messages (for initial backlog processing)

State tracked in: data/export-state.json
Output: vault/inbox/telegram-export-delta.txt (overwritten each run)

SETUP:
  TELEGRAM_API_ID and TELEGRAM_API_HASH env vars required.
  First run needs interactive auth (phone + code).
"""

import os
import sys
import json
import asyncio
import argparse
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path.home() / ".openclaw" / "venv" / "lib" / "python3.11" / "site-packages"))

from telethon import TelegramClient
from telethon.tl.types import User

API_ID = os.environ.get("TELEGRAM_API_ID", "")
API_HASH = os.environ.get("TELEGRAM_API_HASH", "")
SESSION_PATH = Path.home() / ".openclaw" / "telegram-session"

WORKSPACE = Path(os.environ.get("WORKSPACE", Path.home() / "torque-workspace"))
STATE_FILE = WORKSPACE / "data" / "export-state.json"
OUTPUT_DIR = WORKSPACE / "vault" / "inbox"
BATCH_DIR = WORKSPACE / "vault" / "inbox" / "batches"

# Bot chat name to auto-select
BOT_CHAT_NAME = "Claw Torque"


def load_state():
    if STATE_FILE.exists():
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"last_message_id": 0, "last_export": None, "total_exported": 0}


def save_state(state):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def write_messages(messages, output_path, chat_name, mode_label="delta"):
    """Write messages to text file."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"Chat: {chat_name}\n")
        f.write(f"Export mode: {mode_label}\n")
        f.write(f"Exported: {datetime.now().isoformat()}\n")
        f.write(f"Messages: {len(messages)}\n")
        f.write("=" * 60 + "\n\n")
        for msg in messages:
            date = msg.get("date", "")[:19].replace("T", " ") if msg.get("date") else ""
            sender = msg.get("from_name", "Unknown")
            text = msg.get("text", "")
            media = f" [MEDIA: {msg.get('media_type')}]" if msg.get("has_media") else ""
            reply = f" [reply_to:{msg['reply_to']}]" if msg.get("reply_to") else ""
            f.write(f"[{date}] {sender}:{media}{reply}\n{text}\n\n")
    return output_path


async def fetch_messages(client, entity, min_id=0, max_id=None, limit=None):
    """Fetch messages with optional ID range."""
    messages = []
    kwargs = {"limit": limit}
    if min_id:
        kwargs["min_id"] = min_id
    if max_id:
        kwargs["max_id"] = max_id

    async for message in client.iter_messages(entity, **kwargs):
        msg_data = {
            "id": message.id,
            "date": message.date.isoformat() if message.date else None,
            "text": message.text or "",
            "from_id": message.sender_id,
            "reply_to": message.reply_to_msg_id if message.reply_to else None,
        }
        if message.sender and isinstance(message.sender, User):
            msg_data["from_name"] = f"{message.sender.first_name or ''} {message.sender.last_name or ''}".strip()
            msg_data["from_username"] = message.sender.username
        elif message.sender:
            msg_data["from_name"] = getattr(message.sender, 'title', 'Unknown')
        if message.media:
            msg_data["has_media"] = True
            msg_data["media_type"] = type(message.media).__name__
        messages.append(msg_data)
        if len(messages) % 500 == 0:
            print(f"  Fetched {len(messages)} messages...", flush=True)

    messages.reverse()  # chronological
    return messages


async def find_bot_chat(client):
    """Auto-find the bot chat."""
    dialogs = await client.get_dialogs(limit=30)
    for d in dialogs:
        if d.name == BOT_CHAT_NAME:
            return d
    # Fallback: interactive selection
    print("Bot chat not found automatically. Recent chats:")
    for i, d in enumerate(dialogs[:20]):
        print(f"  {i+1}. {d.name} ({type(d.entity).__name__})")
    choice = input("Enter number: ").strip()
    return dialogs[int(choice) - 1]


async def main():
    parser = argparse.ArgumentParser(description="Telegram delta exporter")
    parser.add_argument("--full", action="store_true", help="Full export (reset state)")
    parser.add_argument("--batch", type=int, default=0, help="Batch size for backlog processing")
    parser.add_argument("--batch-num", type=int, default=0, help="Which batch number (0-indexed)")
    args = parser.parse_args()

    if not API_ID or not API_HASH:
        print("ERROR: Set TELEGRAM_API_ID and TELEGRAM_API_HASH")
        sys.exit(1)

    client = TelegramClient(str(SESSION_PATH), int(API_ID), API_HASH)
    await client.start()
    print("Connected!", flush=True)

    dialog = await find_bot_chat(client)
    print(f"Chat: {dialog.name}", flush=True)

    state = load_state()

    if args.full:
        # Full export — get everything, reset state
        print("Full export mode...", flush=True)
        messages = await fetch_messages(client, dialog.entity)
        output = OUTPUT_DIR / "telegram-export-full.txt"
        write_messages(messages, output, dialog.name, "full")
        state["last_message_id"] = messages[-1]["id"] if messages else 0
        state["last_export"] = datetime.now().isoformat()
        state["total_exported"] = len(messages)
        save_state(state)
        print(f"Full export: {len(messages)} messages → {output}", flush=True)

    elif args.batch > 0:
        # Batch mode — split all messages into chunks for processing
        print(f"Batch mode: size={args.batch}, batch_num={args.batch_num}", flush=True)
        # Get total count first
        all_msgs = await fetch_messages(client, dialog.entity)
        total = len(all_msgs)
        batch_size = args.batch
        num_batches = (total + batch_size - 1) // batch_size
        
        if args.batch_num >= num_batches:
            print(f"Batch {args.batch_num} doesn't exist (only {num_batches} batches)")
            await client.disconnect()
            return

        start = args.batch_num * batch_size
        end = min(start + batch_size, total)
        batch = all_msgs[start:end]
        
        BATCH_DIR.mkdir(parents=True, exist_ok=True)
        output = BATCH_DIR / f"batch-{args.batch_num:03d}.txt"
        write_messages(batch, output, dialog.name, f"batch {args.batch_num}/{num_batches-1}")
        
        # Update state to latest message
        state["last_message_id"] = all_msgs[-1]["id"] if all_msgs else 0
        state["last_export"] = datetime.now().isoformat()
        state["total_exported"] = total
        state["total_batches"] = num_batches
        state["batch_size"] = batch_size
        save_state(state)
        
        print(f"Batch {args.batch_num}/{num_batches-1}: msgs {start}-{end-1} ({len(batch)} msgs) → {output}", flush=True)
        print(f"Total: {total} messages, {num_batches} batches", flush=True)

    else:
        # Delta mode (default) — only new messages since last export
        last_id = state.get("last_message_id", 0)
        print(f"Delta mode: fetching messages after ID {last_id}...", flush=True)
        
        messages = await fetch_messages(client, dialog.entity, min_id=last_id)
        
        if not messages:
            print("No new messages.", flush=True)
            await client.disconnect()
            return

        output = OUTPUT_DIR / "telegram-export-delta.txt"
        write_messages(messages, output, dialog.name, f"delta (after ID {last_id})")
        
        state["last_message_id"] = messages[-1]["id"]
        state["last_export"] = datetime.now().isoformat()
        state["total_exported"] = state.get("total_exported", 0) + len(messages)
        save_state(state)
        
        print(f"Delta: {len(messages)} new messages → {output}", flush=True)

    await client.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
