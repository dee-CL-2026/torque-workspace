# TG Export Delta Mode Analysis

## Summary
Delta mode **does** track the last exported message ID via a JSON state file. It uses Telethon `iter_messages` with `min_id` to fetch only messages newer than the stored ID. The stored ID is updated to the newest message ID in the delta run.

## Where state is stored
- File: `data/export-state.json`
- Default state: `{"last_message_id": 0, "last_export": null, "total_exported": 0}`
- The file is read via `load_state()` and written via `save_state()`.

## How delta mode works
In the `else` branch (default, no `--full` and no `--batch`):
1. Reads `last_message_id` from `data/export-state.json`.
2. Calls `fetch_messages(..., min_id=last_id)`.
   - `min_id` is passed to Telethon `iter_messages`, which returns only messages **with ID > min_id**.
3. Writes messages to `vault/inbox/telegram-export-delta.txt` (overwrites each run).
4. Updates state:
   - `state["last_message_id"] = messages[-1]["id"]`
   - `state["last_export"] = now`
   - `state["total_exported"] += len(messages)`
5. Saves state to disk.

If no new messages are found, it prints “No new messages.” and returns **without updating state**.

## Notes / Behavior
- Delta mode is the **default** when no flags are passed.
- `min_id` only works if Telegram IDs are monotonic; delta will miss edits or deletions, and won’t re-export older messages.
- Output file is overwritten each run (no append).
- `--full` and `--batch` reset/update `last_message_id` as well, so a full export will advance the delta cursor to the latest message.

## Relevant code references
- State file path: `STATE_FILE = WORKSPACE / "data" / "export-state.json"`
- Delta branch:
  ```python
  last_id = state.get("last_message_id", 0)
  messages = await fetch_messages(client, dialog.entity, min_id=last_id)
  ...
  state["last_message_id"] = messages[-1]["id"]
  ```
