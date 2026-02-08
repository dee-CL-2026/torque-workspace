# Heartbeat model routing — findings (T050)

## Sources reviewed
- OpenClaw docs: `docs/gateway/heartbeat.md`
- OpenClaw docs: `docs/gateway/configuration.md` (heartbeat config section)
- Workspace: `/home/dieterwerwath/torque-workspace/HEARTBEAT.md`

## What controls the heartbeat model
- **Primary control:** `agents.defaults.heartbeat.model` is an **optional override** for heartbeat runs. Docs explicitly list `model` under `agents.defaults.heartbeat` and state: “optional override model for heartbeat runs (`provider/model`)” (gateway/heartbeat.md + gateway/configuration.md).
- **Per‑agent override:** If an agent has `agents.list[].heartbeat`, that block **merges on top of** `agents.defaults.heartbeat`. So `agents.list[].heartbeat.model` can override the default heartbeat model for that agent.
- **If no heartbeat.model is set:** Heartbeats use the agent’s normal model routing (i.e., `agents.defaults.model.primary` or per‑agent model config). The docs don’t mention any alternate routing for heartbeat beyond the heartbeat model override.

## Precedence / routing rules that can “override”
- **Per‑agent heartbeat blocks take precedence** over `agents.defaults.heartbeat`. If any `agents.list[]` entry defines `heartbeat`, **only those agents** run heartbeats (gateway/heartbeat.md). This can change which agent (and thus which default model) is used.
- **Channel routing does not change model selection** for heartbeats. `target` / `to` only determine delivery destination; `session` controls run context. Model selection is independent and uses the heartbeat model override (if set) or the agent’s normal model.

## Workspace HEARTBEAT.md impact
- `HEARTBEAT.md` only defines the **prompt behavior** for heartbeat runs; it does **not** control model routing. It can influence whether a heartbeat runs at all (empty/headers-only skip), but not model choice.

## Conclusion for current config
- If `agents.defaults.heartbeat.model = openai/gpt-4o` is set, the docs say it **should** control the heartbeat model (as an explicit override).
- If the heartbeat still hit Opus, likely causes per docs:
  1) A **per‑agent heartbeat block** exists without `model`, so that agent runs heartbeats using its **default model** (likely Opus), or
  2) The agent running heartbeats is not the default agent you expected (multi‑agent routing + heartbeat scoping).

## Citations (doc locations)
- `docs/gateway/heartbeat.md` — heartbeat config + `model` override; precedence rules.
- `docs/gateway/configuration.md` — heartbeat config list including `model` override and per‑agent heartbeat behavior.
