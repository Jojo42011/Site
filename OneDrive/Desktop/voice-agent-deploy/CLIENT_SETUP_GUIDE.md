# Client Setup Guide - Voice Agent Deployment

This guide helps clients set up their own instance of the voice agent system.

---

## What You'll Receive

You'll receive a complete codebase that includes:
- ✅ Frontend dashboard for agent configuration
- ✅ Voice agent system (phone calls + web demo)
- ✅ Calendar integration (Google Calendar)
- ✅ Twilio phone integration
- ✅ Deepgram speech-to-text and text-to-speech
- ✅ Knowledge base search functionality

---

## Prerequisites

Before starting, you'll need accounts for:

1. **Fly.io Account** - For hosting (free tier available)
   - Sign up at: https://fly.io
   - Install Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/

2. **Deepgram Account** - For voice AI
   - Sign up at: https://deepgram.com
   - Get your API key from the dashboard

3. **Google Cloud Account** - For Calendar integration (optional)
   - Sign up at: https://console.cloud.google.com
   - See `GOOGLE_CALENDAR_SETUP.md` for detailed instructions

4. **Twilio Account** - For phone calls (optional)
   - Sign up at: https://www.twilio.com
   - Get a phone number

---

## Step 1: Get the Codebase

**Option A: GitHub Repository (Recommended)**
```bash
git clone <repository-url>
cd voice-agent-deploy
```

**Option B: ZIP File**
1. Extract the ZIP file
2. Open terminal in the extracted folder

---

## Step 2: Install Dependencies

```bash
npm install
```

---

## Step 3: Configure Fly.io

1. **Login to Fly.io:**
   ```bash
   fly auth login
   ```

2. **Create a new Fly app:**
   ```bash
   fly apps create your-app-name
   ```
   (Replace `your-app-name` with your desired app name)

3. **Create a volume for storing credentials:**
   ```bash
   fly volume create secrets --size 3 --region sjc --count 2
   ```
   (Adjust region if needed: `sjc` = San Jose, `iad` = Virginia, `lhr` = London)

4. **Update `fly.toml`:**
   - Open `fly.toml`
   - Change `app = "renovated-detailing-voice-agent"` to `app = "your-app-name"`
   - The volume mount should already be configured

---

## Step 4: Deploy to Fly.io

```bash
fly deploy --remote-only
```

This will:
- Build your application
- Deploy it to Fly.io
- Make it available at `https://your-app-name.fly.dev`

---

## Step 5: Configure Credentials in Dashboard

Once deployed, visit your dashboard at: `https://your-app-name.fly.dev`

### 5.1 Deepgram API Key

1. Go to Deepgram dashboard: https://console.deepgram.com
2. Create an API key
3. In your dashboard, go to **"Credentials (stored server-side)"** → **"Deepgram"**
4. Paste your API key
5. Click **"Save credentials"**

### 5.2 Google Calendar (Optional)

Follow the instructions in `GOOGLE_CALENDAR_SETUP.md` to:
1. Create a Google Cloud project
2. Enable Calendar API
3. Create a service account
4. Get your credentials
5. Enter them in the dashboard

### 5.3 Twilio (Optional)

1. In your Twilio console, go to your phone number settings
2. Set the **"A CALL COMES IN"** webhook to:
   ```
   https://your-app-name.fly.dev/twilio/voice
   ```
3. Save the configuration

**Note:** No credentials needed in dashboard - Twilio calls your server directly via webhook.

---

## Step 6: Configure Your Agent

1. In the dashboard, edit the **"System Prompt"** section
2. Customize it for your business
3. Add the date handling instructions (see `SYSTEM_PROMPT_DATE_FIX.md`)
4. Configure your agent's:
   - Name and greeting
   - LLM model
   - Voice model
   - Temperature settings
5. Click **"Save changes"**

---

## Step 7: Test Your Setup

### Web Demo
Visit: `https://your-app-name.fly.dev/demo`
- Test voice interaction
- Verify calendar integration (if configured)
- Check that agent responds correctly

### Phone Calls (if Twilio configured)
- Call your Twilio number
- Test the full phone conversation flow

---

## Important Files Reference

- **`GOOGLE_CALENDAR_SETUP.md`** - Detailed Google Calendar setup
- **`SYSTEM_PROMPT_DATE_FIX.md`** - Date handling instructions for system prompt
- **`fly.toml`** - Fly.io deployment configuration
- **`src/admin/AgentManager.tsx`** - Dashboard UI (editable)
- **`src/components/AdminDashboard.tsx`** - Main dashboard component

---

## Customization

### Change Dashboard Branding

Edit `src/components/AdminDashboard.tsx`:
- Change "Aethon" to your company name
- Modify colors/styling as needed

### Modify Agent Behavior

Edit the **System Prompt** in the dashboard (no code changes needed)

### Add Custom Functions

Edit `src/lib/constants.ts` to add custom function definitions

---

## Troubleshooting

### "Missing required calendar setting" error
- Make sure you've entered all calendar credentials in the dashboard
- Verify you clicked "Save credentials"

### "Failed to load Deepgram API key" error
- Check that your Deepgram API key is saved in the dashboard
- Verify the key is valid in Deepgram console

### Deployment fails
- Check Fly.io logs: `fly logs`
- Verify `fly.toml` has correct app name
- Ensure volume is created: `fly volumes list`

### Calendar not working
- Verify calendar is shared with service account email
- Check Calendar ID is correct
- Ensure Google Calendar API is enabled

---

## Security Notes

✅ **Secure:**
- Credentials stored on Fly.io volume (not in git)
- API keys never exposed in frontend bundle
- Server-side only credential access

❌ **Don't Commit:**
- API keys
- Private keys
- Service account credentials
- `.env` files (if any)

---

## Support

If you encounter issues:
1. Check Fly.io logs: `fly logs`
2. Review error messages in dashboard
3. Verify all credentials are correctly entered
4. Check that volumes are mounted: `fly volumes list`

---

## Next Steps

1. ✅ Deploy the application
2. ✅ Configure credentials in dashboard
3. ✅ Customize your agent's system prompt
4. ✅ Test web demo and phone calls
5. ✅ Share your agent URL with customers

---

## Cost Estimates

**Fly.io:**
- Free tier: 3 shared-cpu VMs, 3GB storage
- Paid: ~$5-20/month for production use

**Deepgram:**
- Pay-as-you-go pricing
- ~$0.0043 per minute for speech-to-text
- Check current pricing: https://deepgram.com/pricing

**Google Cloud:**
- Calendar API: Free (within quotas)
- Service account: Free

**Twilio:**
- Phone number: ~$1/month
- Per-minute call charges
- Check pricing: https://www.twilio.com/pricing

---

## Quick Start Checklist

- [ ] Clone/download repository
- [ ] Install dependencies (`npm install`)
- [ ] Create Fly.io account and app
- [ ] Create Fly volume for secrets
- [ ] Deploy to Fly.io (`fly deploy`)
- [ ] Add Deepgram API key in dashboard
- [ ] (Optional) Configure Google Calendar
- [ ] (Optional) Configure Twilio webhook
- [ ] Customize agent system prompt
- [ ] Test web demo
- [ ] Test phone calls (if configured)

---

**Your agent will be live at:** `https://your-app-name.fly.dev`

**Dashboard:** `https://your-app-name.fly.dev/`

**Web Demo:** `https://your-app-name.fly.dev/demo`
