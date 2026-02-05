# BACKLOG — OpenClaw & Infrastructure

*Separate from Candid business stuff*

---

## To Do

### 🔒 Cloudflare Tunnel Setup
**Priority:** High  
**Source:** Clawdbot (Ryan's agent) — 2026-02-05

Secure remote access to OpenClaw gateway without exposing home network.

**What it does:**
- Outbound-only tunnel from local machine to Cloudflare edge
- No port forwarding, no exposed IP
- Works behind NAT/firewalls
- Encrypted end-to-end

**Security layers (4 deep):**
1. Cloudflare's network (DDoS, WAF)
2. Cloudflare Access (auth rules)
3. Gateway token (OpenClaw auth)
4. Device pairing (approval required)

**Setup needs:**
- [ ] `cloudflared` installed and configured
- [ ] Dedicated infra domain (or subdomain)
- [ ] Background service (launchd/systemd)
- [ ] Cloudflare Access rules configured

**Notes:** Free tier covers personal use. Ask @Clawdbot for details.

---

## To Scope (Priority)

### 👁️ Silent Monitor Mode
**Added:** 2026-02-05
**Status:** Needs scoping & decision

**Goal:** Monitor group chats without posting replies — observe, filter, alert via DM.

**Core Features:**
1. Receive all messages (`requireMention: false`)
2. Never reply in-group (always NO_REPLY)
3. Alert to DM when action needed
4. Daily/running digest

**Implementation Options:**

| Approach | Pros | Cons |
|----------|------|------|
| **Prompt-only** | Simple, no config changes | Relies on model discipline |
| **Tool restriction** | Enforced, can't accidentally reply | More complex config |
| **Dedicated agent** | Clean separation, own workspace | Higher resource use |

**Alert Triggers (to decide):**
- [ ] Keywords (urgent, help, deadline, etc.)
- [ ] Direct questions
- [ ] @mentions of Dee
- [ ] Sentiment (frustration, confusion)
- [ ] Action items / requests
- [ ] Unanswered questions after X time

**Digest Options:**
- [ ] Daily summary to DM (morning?)
- [ ] Running digest to DM (every N messages or X hours)
- [ ] Weekly rollup to DM
- [ ] On-demand ("give me the digest")
- [ ] **IN-GROUP digest** — post summary in the group itself at end of day (variant)

**Open Questions:**
1. Which groups to start with?
2. Alert threshold — too noisy vs missing things?
3. Where to store accumulated context between digests?
4. Same agent or separate "watcher" agent?

---

### Variant: In-Group Daily Digest
**Added:** 2026-02-05

Instead of (or in addition to) DM alerts, post a digest **in the group itself** at end of day.

**Use case:** Team groups where everyone benefits from the summary, not just Dee.

**Example output (posted at 6pm):**
```
📋 Daily Digest — Feb 5

🔹 Key decisions: X agreed to handle Y
🔹 Action items: 3 open (Alice: report, Bob: review, Charlie: deploy)
🔹 Unanswered: "Does anyone have the Q4 numbers?"
🔹 Topics: Budget (12 msgs), Launch timeline (8 msgs), Offsite (5 msgs)
```

**Considerations:**
- Timing: End of workday? After X hours of quiet?
- Tone: Helpful summary vs annoying bot
- Opt-out: Can group members mute/disable?
- Length: Keep it scannable

**Next Steps:**
- [ ] Pick a test group
- [ ] Choose implementation approach
- [ ] Define initial alert triggers
- [ ] Set digest frequency
- [ ] Build & test

---

## Ideas / Future

*(add items here)*

---

## Done

*(move completed items here)*
