#!/usr/bin/env python3
"""
Telegram message history exporter.
Uses Telethon to fetch messages from a specific chat.

SETUP:
1. Go to https://my.telegram.org
2. Log in with your phone number
3. Go to "API development tools"
4. Create an app, get api_id and api_hash
5. Set them as environment variables or edit this script

USAGE:
    python3 telegram-export.py

First run will prompt for phone number + SMS code.
"""

import os
import sys
import json
import asyncio
from datetime import datetime
from pathlib import Path

# Add venv to path
VENV_PATH = Path.home() / ".openclaw" / "venv" / "lib" / "python3.11" / "site-packages"
sys.path.insert(0, str(VENV_PATH))

from telethon import TelegramClient
from telethon.tl.types import User, Chat, Channel

# Configuration - SET THESE or use environment variables
API_ID = os.environ.get("TELEGRAM_API_ID", "")  # Your api_id from my.telegram.org
API_HASH = os.environ.get("TELEGRAM_API_HASH", "")  # Your api_hash from my.telegram.org

# Session file (stores auth so you don't need to re-login)
SESSION_PATH = Path.home() / ".openclaw" / "telegram-session"

# Output path
OUTPUT_DIR = Path.home() / ".openclaw" / "workspace" / "vault" / "inbox"


async def main():
    if not API_ID or not API_HASH:
        print("ERROR: Set TELEGRAM_API_ID and TELEGRAM_API_HASH environment variables")
        print("Get them from https://my.telegram.org")
        sys.exit(1)

    client = TelegramClient(str(SESSION_PATH), int(API_ID), API_HASH)
    
    await client.start()
    print("Connected to Telegram!")
    
    # Get the bot chat (search for it)
    me = await client.get_me()
    print(f"Logged in as: {me.first_name} {me.last_name or ''} (@{me.username or 'no username'})")
    
    # List recent dialogs to find the bot
    print("\nRecent chats:")
    dialogs = await client.get_dialogs(limit=20)
    for i, dialog in enumerate(dialogs):
        name = dialog.name or "Unknown"
        entity_type = type(dialog.entity).__name__
        print(f"  {i+1}. {name} ({entity_type})")
    
    # Ask which chat to export
    choice = input("\nEnter number of chat to export (or 'q' to quit): ").strip()
    if choice.lower() == 'q':
        await client.disconnect()
        return
    
    try:
        idx = int(choice) - 1
        dialog = dialogs[idx]
    except (ValueError, IndexError):
        print("Invalid choice")
        await client.disconnect()
        return
    
    print(f"\nExporting messages from: {dialog.name}")
    
    # Fetch all messages
    messages = []
    async for message in client.iter_messages(dialog.entity, limit=None):
        msg_data = {
            "id": message.id,
            "date": message.date.isoformat() if message.date else None,
            "text": message.text or "",
            "from_id": message.sender_id,
            "reply_to": message.reply_to_msg_id if message.reply_to else None,
        }
        
        # Add sender info if available
        if message.sender:
            if isinstance(message.sender, User):
                msg_data["from_name"] = f"{message.sender.first_name or ''} {message.sender.last_name or ''}".strip()
                msg_data["from_username"] = message.sender.username
            else:
                msg_data["from_name"] = getattr(message.sender, 'title', 'Unknown')
        
        # Note if there's media
        if message.media:
            msg_data["has_media"] = True
            msg_data["media_type"] = type(message.media).__name__
        
        messages.append(msg_data)
        
        if len(messages) % 100 == 0:
            print(f"  Fetched {len(messages)} messages...")
    
    print(f"\nTotal messages: {len(messages)}")
    
    # Reverse to chronological order
    messages.reverse()
    
    # Save as JSON
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    safe_name = "".join(c if c.isalnum() else "_" for c in dialog.name)
    output_file = OUTPUT_DIR / f"telegram-export-{safe_name}-{timestamp}.json"
    
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump({
            "chat_name": dialog.name,
            "exported_at": datetime.now().isoformat(),
            "message_count": len(messages),
            "messages": messages
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\nExported to: {output_file}")
    
    # Also create a plain text version for easier reading
    text_file = output_file.with_suffix(".txt")
    with open(text_file, "w", encoding="utf-8") as f:
        f.write(f"Chat: {dialog.name}\n")
        f.write(f"Exported: {datetime.now().isoformat()}\n")
        f.write(f"Messages: {len(messages)}\n")
        f.write("=" * 60 + "\n\n")
        
        for msg in messages:
            date = msg.get("date", "")[:19].replace("T", " ") if msg.get("date") else ""
            sender = msg.get("from_name", "Unknown")
            text = msg.get("text", "")
            media = f" [MEDIA: {msg.get('media_type')}]" if msg.get("has_media") else ""
            
            f.write(f"[{date}] {sender}:{media}\n{text}\n\n")
    
    print(f"Text version: {text_file}")
    
    await client.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
