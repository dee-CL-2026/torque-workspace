# Model Routing Rules Document

## Current Architecture (Feb 2026):
- **Main session:** Claude Opus 4.6 (Anthropic MAX subscription)
- **Default sub-agents:** OpenAI GPT-4o (verified, reliable)
- **Code-heavy tasks:** OpenAI GPT-5.2-Codex (file writes, scripts, dashboards)
- **Future cheap default:** OpenAI GPT-5-mini (pending org verification)

## Routing Rules:
- **Tier 1 (GPT-4o default):** research, writing, planning, reviews, triage — analyst, pa, secretary, docs-bot, marketing, hr-ga, finance, sales-ops, customer-success, product
- **Tier 2 (Codex):** code, scripts, file creation, config, dashboards — frontend, gas-dev, data-eng, ops (when code-heavy)
- **Tier 3 (GPT-5-mini, when available):** replace Tier 1 for even cheaper execution

## Key Lessons:
- **Gemini Flash:** unreliable for file writes, dropped
- **GPT-5-mini:** requires org verification, pending
- **Codex:** most reliable but most expensive on output tokens
- **GPT-4o:** good balance of cost and capability, occasionally misses multi-step instructions
