# MEMORY.md — Long-Term Memory

*Curated from daily notes. Updated periodically.*

---

## Dee — Core Profile

- **Full name:** Dieter Lynton Kurt Werwath
- **Born:** Burton upon Trent, UK
- **Age:** 46
- **Location:** Jakarta (15 years)
- **Timezone:** GMT+7 (Asia/Jakarta)
- **Heritage:** English, Ghanaian, Welsh, German(?), Hungarian, Scottish (step)
- **Spouse:** Sinead (British, born South Africa) — Deputy Head at international school
- **Kids:** Evie & Connie
  - **Connie:** Born July 26, 2014 (11). Loves swimming (#1 sport) and music. High energy, enthusiastic (the jazz-hands waver). Stranger Things fan.
  - **Evie:** (details tbd)
- **Dog:** Marley 🐕 (golden retriever)
- **Sinead's passport:** Renewed (confirmed 2026-02-08)

### Personality & Working Style

- **Possibly ADHD-adjacent** — hyperfocus on interesting, procrastinates on "should do"
- Stubborn, naturally impatient, likes momentum
- Needs external systems — internal motivation unreliable
- 100 projects started, completion is the challenge
- Physical/tactile systems may work better than digital
- **Night owl** (sleep issues acknowledged)

### Identity Markers

- **BIG Arsenal fan** ⚽ — identity-level important
- God of War fan (has Kratos keychain)
- Loves rom coms, weepy coming-of-age TV
- Loves singing — had chance to tour Spain as entertainer
- Loves music (almost every genre)
- **Tuesday nights:** Mini soccer (regular commitment)
- **Thursday nights:** Padel (regular commitment)
- **Kicked Coca-Cola habit** Feb 2026 — replaced with Candid soda water + citrus

---

## Roles & Companies

### 1. Candid Mixers (PT Unisoda Mitra Jaya)
- Indonesian beverage company — makes mixers
- Products: Club Soda, Imperio Tonic, Ginger
- R&D: Green Tea, Nipis Madu
- Structure: Singapore holding → 99% Indonesia
- Founded 2022, launched 2023, investor 2024
- 5 co-founders (1 exiting), 1 VA (Philippines), sales team
- Distributor: SKD Cahaya Jaya
- **Financials:** Gross margin 40.7%→54.8% (great), OpEx up 60%, net profit flat
- **Where the heart is leaning** — building something new

### 2. Good Doctor Indonesia (COO)
- Telemedicine platform
- Feels locked in — ESOP cliff end of 2026
- Frustrated with CEO Danny
- Exploring part-time path

### 3. F45 Franchise (Investor)
- 4 investors; Dee + Sinead = 1 of 4
- Silent partner in Surabaya location
- Good friend leads (also has Kemang & Bintaro)

---

## Tech Setup

- **Google ecosystem:** Pixel 9a + Pixel Watch, Chromebook
- Mac Mini planned when real limitation appears
- Jakarta internet is patchy — prefer local-first solutions
- Smart home: Google Minis, smart bulbs, Aqara gateway (Home Assistant future)

---

## Side Projects (Priority)

- **TSLC:** The Shoeless Life Coach — coaching/lifestyle concept
- **SuperheroNinjaPirate:** Born from Jakarta flooding story

### Backlog/Ideas
- Character development platform (students + creators)
- Private poker app (replace Pokerrrr2)
- Betting analytics bot (had working edge, lost discipline)
- Park Run Indonesia
- Yoga app (could be TSLC module)
- Stretching studio concept
- ~100 more in stasis

---

## Connections

- **Ryan:** Friend on OpenClaw journey, has Clawdbot on WhatsApp. Future inter-bot connection planned.
- **GitHub:** dee-CL-2026, workspace at torque-workspace repo

---

## Working With Dee

### Two Modes
- **Work Torque:** Logical, systematic, clear (Candid, Good Doctor, data, code, ops)
- **Personal Torque:** Listener, talker, human (stories, family, projects, rambles)

### What They Need
- Track multiple workstreams (ops, data, personal)
- Pick up context fast during context-switches
- Handle grunt work so they can focus on decisions
- Explain *why*, not just *what*

### Daily Ritual (planned)
- Overnight analysis → GitHub push → morning summary in Telegram → voice Q&A

---

## Lessons Learned

### WhatsApp Config ⚠️
- Does NOT mirror Telegram structure
- `groups` expects object, not array
- No `enabled` key
- Always check docs/channels/whatsapp.md before editing

### Voice Workflow
- Short notes: work
- 18+ min files: don't come through
- Workaround: Google Recorder → transcript paste

### Google Drive
- Path: `/mnt/chromeos/GoogleDrive/SharedDrives/Candid CMS (Corp Drive)/`
- .gdoc/.gsheet are shortcuts — can't read content directly
- Honor system for read-only

---

---

## OpenClaw Critical Knowledge

### MAX Subscription API Limits (Discovered 2026-02-07)
- **MAX OAuth token only authorizes Opus** for API calls
- Sonnet/Haiku fail with "No API provider registered for api: undefined"
- Claude.ai UI lets you switch models, but API access is Opus-only
- Need separate pay-per-use API key for cheaper models

### Auth Recovery
If OpenClaw stops responding after model change:
1. `claude setup-token` (generates OAuth token)
2. `openclaw config` → Model → "Anthropic token" → paste token
3. Don't manually edit auth config — use wizard

### Subagents with Gemini (Discovered 2026-02-08) ✅
**Problem solved:** Subagents can now run on Gemini Flash for FREE!

**The fix:** `agents.defaults.models` is a model ALLOWLIST. If it has entries, only those models are permitted for subagents. Add Google models to allow them:

```json
{
  "agents": {
    "defaults": {
      "models": {
        "anthropic/claude-opus-4-5": { "alias": "opus" },
        "google/gemini-2.5-flash": {},
        "google/gemini-2.5-pro": {}
      },
      "subagents": {
        "model": "google/gemini-2.5-flash"
      }
    }
  }
}
```

**Current setup:**
- Main agent: Claude Opus 4.5 (via MAX subscription)
- Subagents: Gemini 2.5 Flash (free tier: 15 RPM, 1M tokens/day)
- Cost savings: Subagents cost $0 instead of ~$0.03+ each

**Google provider config required:**
```json
{
  "models": {
    "providers": {
      "google": {
        "baseUrl": "https://generativelanguage.googleapis.com",
        "apiKey": "YOUR_GEMINI_API_KEY",
        "auth": "api-key",
        "api": "google-generative-ai",
        "models": [...]
      }
    }
  },
  "auth": {
    "profiles": {
      "google:gemini": { "provider": "google", "mode": "api_key" }
    },
    "order": { "google": ["google:gemini"] }
  }
}
```

**Get API key:** https://aistudio.google.com/app/apikey

---

*Last updated: 2026-02-07*
