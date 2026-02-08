# Cross-channel messaging limitation (Telegram → WhatsApp)

## What the channel docs say

**Deterministic routing / channel-bound replies**
- **WhatsApp:** The channel description states routing is deterministic and replies return to WhatsApp — “Model never chooses channels.” (WhatsApp doc, *Goals* section).
- **Telegram:** Same wording: replies go back to Telegram and the model never chooses channels (Telegram doc, *What it is* section).

**Session isolation is channel-specific**
- **Telegram:** DMs share the agent’s **main** session, but groups are isolated as `agent:<agentId>:telegram:group:<chatId>` (Telegram doc, *What it is* section).
- **WhatsApp:** Groups map to `agent:<agentId>:whatsapp:group:<jid>` sessions (WhatsApp doc, *Groups* section).

These notes imply **session-bound routing**: inbound messages establish a channel session; replies are forced back to that channel. That matches the runtime error you’re seeing (“Cross-context messaging denied”) when a Telegram-spawned sub-agent tries to send to WhatsApp.

## Related delivery / targeting hints
- **Telegram delivery targets** are described for CLI/cron: use chat id or `@username` (Telegram doc, *Delivery targets (CLI/cron)* section).
- **WhatsApp** doc emphasizes that **outbound sends require an active gateway listener**; if the gateway is not running, sends fail fast (WhatsApp doc, *Architecture* and *Outbound send* sections).
- **Heartbeat delivery** defaults to “last used channel (or configured target)” (WhatsApp doc, *Heartbeats* section) — this hints the system tracks channel context for delivery.

## Practical workarounds

1. **Send via CLI/cron instead of in-session tool call**
   - Use the gateway CLI to deliver WhatsApp messages from outside the Telegram session context:
     ```bash
     openclaw message send --channel whatsapp --target "+15551234567" --message "..."
     ```
   - This bypasses the Telegram session’s channel binding and uses explicit delivery targeting.

2. **Run the send from a WhatsApp-context session**
   - Start a WhatsApp DM with the assistant (or route the sender to a WhatsApp-bound agent via `bindings`).
   - Spawn the sub-agent from that WhatsApp conversation so its session context matches the target channel.

3. **Use multi-agent routing to dedicate a WhatsApp agent**
   - The WhatsApp doc notes you can route each sender to different agents via `bindings` (WhatsApp FAQ: “multiple people use different OpenClaw instances”).
   - Create a WhatsApp-specific agent and call it for WhatsApp outbound messaging so its session context is always WhatsApp.

## Takeaway
- The **docs consistently frame replies as channel-bound** and **sessions as channel-specific**, which explains cross-channel send errors from Telegram sessions.
- Use **explicit CLI delivery** or **WhatsApp-context agents/sessions** to avoid the cross-context denial.
