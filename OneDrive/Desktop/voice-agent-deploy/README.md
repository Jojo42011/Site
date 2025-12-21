# EquipTech Dental Voice Agent (Deepgram + Twilio + KB)

This repo contains a **low-latency Deepgram Voice Agent** tailored for **EquipTech Dental** (Chicago-area dental equipment service). It includes:

- **Browser voice demo**: mic → Deepgram Voice Agent WS → realtime audio playback
- **Agent template system** (agents folder) with a fully built **EquipTech Dental** persona
- **Knowledge Base tool** (`search_kb`) backed by `agents/knowledge-bases/equiptech-dental.txt`
- **Calendar tools** (`check_availability`, `book_appointment`) for scheduling
- **Twilio inbound calling** via Media Streams (8k mulaw, barge-in clearing)
- **Fly.io deployment** for stable Twilio endpoints
- **Admin dashboard** (/admin) focused on editing the active agent (no new agents are created in this repo)

## Prerequisites

- **Node.js v20+**
- (Optional) **Fly CLI**: `flyctl`
- (Optional) **Twilio** number for inbound calling

## What’s included (current state)

- **Active persona**: EquipTech Dental Service Coordinator (Chicago dental equipment triage, scheduling, emergencies)
- **Knowledge Base**: `agents/knowledge-bases/equiptech-dental.txt` loaded via `search_kb`
- **Agent config**: `agents/equiptech-dental.json` (prompt, greeting, voice/listen/think models, calendar + KB flags)
- **Admin dashboard** (`/admin`): edits the active agent in-place; no new agent files are created in this repo
- **Web demo** (`/`): streams mic audio directly to Deepgram Voice Agent; plays agent audio in realtime
- **Calendar tools**: `check_availability` + `book_appointment` wired to the server calendarService
- **Twilio bridge**: `/twilio/voice` (TwiML) and WS `/twilio` for Media Streams (8k mulaw, barge-in clearing)
- **Deploy**: Fly.io ready (`fly.toml`, `Dockerfile`)
- **Audio Intelligence**: `/api/audio-intelligence` endpoint for summaries/topics/intents/sentiment on PCM16 input

## Key files

- **Frontend**: `src/` (Vite + React)
  - App shell / Deepgram wiring: `src/components/App.jsx`
  - Agent constants (fallback prompt, tools): `src/lib/constants.ts`
  - KB client search: `src/lib/kbSearch.ts` + `src/lib/knowledgeBase.ts`
  - Admin dashboard: `src/components/AdminDashboard.tsx` + `src/admin/AgentManager.tsx`
- **Server**: `server/index.ts` (Express API, Twilio WS bridge)
  - Agent routes: `server/routes/agents.ts`
  - Calendar integration: `server/calendarService.ts`
  - Twilio attach helper: `server/twilioAttach.ts`
- **Agent data**: `agents/equiptech-dental.json`, `agents/knowledge-bases/equiptech-dental.txt`, `.active`
- **Build output**: `dist/` (for static serving)

## Local development (Windows PowerShell)

1) Install dependencies:

```powershell
npm install
```

2) Create `.env` (project root) and add your Deepgram key:

```powershell
Copy-Item .env.example .env
notepad .env
```

At minimum set:

```text
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY
```

3) Start web + API together:

```powershell
npm run dev
```

- **Web**: `http://localhost:5173/`
- **API**: `http://localhost:3001/api/healthz`

## Knowledge Base

- Primary KB for this repo: `agents/knowledge-bases/equiptech-dental.txt`
- The agent calls `search_kb` to retrieve short, relevant snippets; do not paste the whole KB into prompts.

## Twilio inbound calling (Fly deployment recommended)

### Endpoints (Fly)

If deployed to Fly, the stable endpoints are:

- **TwiML webhook**: `https://<app>.fly.dev/twilio/voice`
- **Media stream WS**: `wss://<app>.fly.dev/twilio`

In Twilio Console for your phone number:

- **A CALL COMES IN**: Webhook
- **URL**: `https://<app>.fly.dev/twilio/voice`
- **Method**: GET or POST (both work)

### Fly deploy

```powershell
flyctl deploy --remote-only
```

Then set secrets (do **not** commit real keys):

```powershell
flyctl secrets set -a renovated-detailing-voice-agent `
  DEEPGRAM_API_KEY="YOUR_DEEPGRAM_API_KEY" `
  TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" `
  TWILIO_AUTH_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" `
  TWILIO_PHONE_NUMBER="+1xxxxxxxxxx" `
  TWILIO_BUFFER_FRAMES="10"
```

## Admin dashboard behavior (important)

- The dashboard at `/admin` is scoped to the **active agent only** (this repo edits `equiptech-dental` in-place).
- It does **not** create new agents or files—this keeps the repo tidy per deployment.
- To switch personas in another project, clone the repo and update that project’s active agent + KB.

## Notes on security

- Never commit `.env` or real API keys.
- If you ever paste keys into chat/logs, **rotate them** immediately (Deepgram + Twilio).
