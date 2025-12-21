# Complete Voice Agent Setup Guide

**Everything you need to set up and deploy your voice agent system.**

---

## Table of Contents

1. [What You'll Receive](#what-youll-receive)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Detailed Setup Steps](#detailed-setup-steps)
5. [Google Calendar Integration](#google-calendar-integration)
6. [System Prompt Configuration](#system-prompt-configuration)
7. [Testing & Troubleshooting](#testing--troubleshooting)
8. [Security & Best Practices](#security--best-practices)

---

## What You'll Receive

You'll receive a complete codebase that includes:

- ✅ **Frontend Dashboard** - Web-based interface for configuring your agent
- ✅ **Voice Agent System** - Phone calls + web demo
- ✅ **Calendar Integration** - Google Calendar for appointment scheduling
- ✅ **Twilio Integration** - Phone call handling
- ✅ **Deepgram Integration** - Speech-to-text and text-to-speech
- ✅ **Knowledge Base Search** - Searchable knowledge base functionality

---

## Prerequisites

Before starting, you'll need accounts for:

1. **Fly.io Account** - For hosting (free tier available)
   - Sign up: https://fly.io
   - Install CLI: https://fly.io/docs/getting-started/installing-flyctl/

2. **Deepgram Account** - For voice AI
   - Sign up: https://deepgram.com
   - Get API key from dashboard

3. **Google Cloud Account** - For Calendar (optional)
   - Sign up: https://console.cloud.google.com

4. **Twilio Account** - For phone calls (optional)
   - Sign up: https://www.twilio.com

---

## Quick Start

### 1. Get the Codebase

**GitHub:**
```bash
git clone <repository-url>
cd voice-agent-deploy
```

**Or extract ZIP file**

### 2. Install Dependencies

```bash
npm install
```

### 3. Deploy to Fly.io

```bash
# Login
fly auth login

# Create app
fly apps create your-app-name

# Create volume for credentials
fly volume create secrets --size 3 --region sjc --count 2

# Update fly.toml (change app name)
# Then deploy
fly deploy --remote-only
```

### 4. Configure in Dashboard

Visit: `https://your-app-name.fly.dev`

1. Add Deepgram API key
2. (Optional) Add Google Calendar credentials
3. Customize your agent's system prompt
4. Test at `/demo`

---

## Detailed Setup Steps

### Step 1: Get the Codebase

**Option A: GitHub Repository**
```bash
git clone <repository-url>
cd voice-agent-deploy
```

**Option B: ZIP File**
1. Extract the ZIP file
2. Open terminal in the extracted folder

---

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages (may take a few minutes).

---

### Step 3: Configure Fly.io

1. **Login to Fly.io:**
   ```bash
   fly auth login
   ```
   (Opens browser for authentication)

2. **Create a new Fly app:**
   ```bash
   fly apps create your-app-name
   ```
   Replace `your-app-name` with your desired app name (must be unique).

3. **Create a volume for storing credentials:**
   ```bash
   fly volume create secrets --size 3 --region sjc --count 2
   ```
   - `sjc` = San Jose (US West)
   - `iad` = Virginia (US East)
   - `lhr` = London (Europe)
   - Choose region closest to your users

4. **Update `fly.toml`:**
   - Open `fly.toml` in a text editor
   - Change `app = "renovated-detailing-voice-agent"` to `app = "your-app-name"`
   - The volume mount should already be configured (don't change it)

---

### Step 4: Deploy to Fly.io

```bash
fly deploy --remote-only
```

This will:
- Build your application (takes 2-5 minutes)
- Deploy it to Fly.io
- Make it available at `https://your-app-name.fly.dev`

**Note:** First deployment may take longer. Subsequent deployments are faster.

---

### Step 5: Configure Credentials in Dashboard

Once deployed, visit your dashboard: `https://your-app-name.fly.dev`

#### 5.1 Deepgram API Key (Required)

1. Go to Deepgram dashboard: https://console.deepgram.com
2. Navigate to **"API Keys"**
3. Click **"Create API Key"**
4. Copy the API key
5. In your dashboard, go to **"Credentials (stored server-side)"** → **"Deepgram"**
6. Paste your API key
7. Click **"Save credentials"**

#### 5.2 Google Calendar (Optional)

See [Google Calendar Integration](#google-calendar-integration) section below for detailed instructions.

#### 5.3 Twilio (Optional)

1. In your Twilio console, go to your phone number settings
2. Find **"A CALL COMES IN"** section
3. Set webhook to: `https://your-app-name.fly.dev/twilio/voice`
4. Save configuration

**Note:** No credentials needed in dashboard - Twilio calls your server directly via webhook.

---

### Step 6: Configure Your Agent

1. In the dashboard, scroll to **"System Prompt"** section
2. Customize it for your business:
   - Update company name
   - Modify instructions
   - Add your specific workflows
3. **IMPORTANT:** Add date handling instructions (see [System Prompt Configuration](#system-prompt-configuration))
4. Configure other settings:
   - Agent name and greeting
   - LLM model (e.g., gpt-4o, gpt-4o-mini)
   - Voice model (choose from Aura 2 voices)
   - Temperature (0-1.5)
5. Click **"Save changes"**

---

### Step 7: Test Your Setup

#### Web Demo
Visit: `https://your-app-name.fly.dev/demo`
- Click microphone button
- Speak to test voice interaction
- Verify calendar integration (if configured)
- Check that agent responds correctly

#### Phone Calls (if Twilio configured)
- Call your Twilio phone number
- Test the full phone conversation flow
- Verify appointments are created (if calendar configured)

---

## Google Calendar Integration

### Required Credentials

You need **4 pieces of information**:

1. **Service Account Email** - Email of your Google Service Account
2. **Calendar ID** - ID of the Google Calendar to use
3. **Time Zone** - Your timezone (e.g., `America/Chicago`)
4. **Private Key (PEM)** - Private key from service account JSON file

---

### Step-by-Step Setup

#### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter project name (e.g., "Voice Agent Calendar")
4. Click **"Create"**

#### Step 2: Enable Google Calendar API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Calendar API"**
3. Click on it and press **"Enable"**

#### Step 3: Create Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Enter a name (e.g., "calendar-service-account")
4. Click **"Create and Continue"**
5. Skip optional steps, click **"Done"**

#### Step 4: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **"JSON"** format
5. Click **"Create"** - This downloads a JSON file

#### Step 5: Extract Credentials from JSON

Open the downloaded JSON file. You'll see:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "calendar-service@your-project.iam.gserviceaccount.com",
  ...
}
```

**Extract these values:**

- **Service Account Email**: Copy the `client_email` value
- **Private Key (PEM)**: Copy the entire `private_key` value (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines)

#### Step 6: Share Calendar with Service Account

1. Open [Google Calendar](https://calendar.google.com/)
2. Find the calendar you want to use (or create a new one)
3. Click **three dots** next to calendar name → **"Settings and sharing"**
4. Scroll to **"Share with specific people"**
5. Click **"Add people"**
6. Paste your **Service Account Email** (from Step 5)
7. Set permission to **"Make changes to events"**
8. Click **"Send"**

#### Step 7: Get Calendar ID

1. Still in Calendar Settings, scroll to **"Integrate calendar"**
2. Find **"Calendar ID"** - it looks like:
   - `your-email@gmail.com` (for primary calendar)
   - `c_xxxxxxxxxxxxx@group.calendar.google.com` (for shared calendars)
3. Copy this **Calendar ID**

#### Step 8: Enter Credentials in Dashboard

1. Go to your dashboard: `https://your-app-name.fly.dev`
2. Scroll to **"Credentials (stored server-side)"** → **"Calendar (Google)"**
3. Enter:
   - **Service account email**: From Step 5
   - **Calendar ID**: From Step 7
   - **Time zone**: Your timezone (see [Common Time Zones](#common-time-zones))
   - **Private key (PEM)**: Entire private key from Step 5 (including BEGIN/END lines)
4. Click **"Save credentials"**

#### Common Time Zones

- `America/Chicago` - Central Time
- `America/New_York` - Eastern Time
- `America/Denver` - Mountain Time
- `America/Los_Angeles` - Pacific Time
- `America/Phoenix` - Arizona (no DST)
- `UTC` - Coordinated Universal Time

Find more: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

---

## System Prompt Configuration

### Date Handling Instructions (CRITICAL)

Add this section to your **System Prompt** in the dashboard to prevent date errors:

```
DATE HANDLING (CRITICAL)
- Today's date is automatically provided in your context. ALWAYS use the current year (2025) or later when checking availability.
- When a customer mentions a date without a year (e.g., "November 1st", "Dec 15"), assume they mean the NEXT occurrence of that date in the future, NOT a past date.
- If check_availability returns an error saying "Date is in the past", immediately ask the customer for a different date. Do NOT retry with the same date.
- Always format dates as YYYY-MM-DD (e.g., 2025-12-22, 2026-01-15).
- Never use dates from previous years or conversations - always use current or future dates.
```

### Where to Add This

1. Go to dashboard: `https://your-app-name.fly.dev`
2. Scroll to **"System Prompt"** section
3. Add the text above to your existing prompt (at the beginning or in "IMPORTANT REMINDERS" section)
4. Click **"Save changes"**

### Example Updated Prompt Structure

```
You are the [Your Company] Service Coordinator...

PRIMARY GOAL
[Your goals]

DATE HANDLING (CRITICAL)
- Today's date is automatically provided in your context. ALWAYS use the current year (2025) or later when checking availability.
- When a customer mentions a date without a year (e.g., "November 1st", "Dec 15"), assume they mean the NEXT occurrence of that date in the future, NOT a past date.
- If check_availability returns an error saying "Date is in the past", immediately ask the customer for a different date. Do NOT retry with the same date.
- Always format dates as YYYY-MM-DD (e.g., 2025-12-22, 2026-01-15).
- Never use dates from previous years or conversations - always use current or future dates.

BOOKING WORKFLOW
[Your existing booking workflow]

IMPORTANT REMINDERS
- Always call 'check_availability' before offering times.
- Use Central Time (Chicago) for scheduling.
- Never invent open slots or mention availability without tool data.
- Ask questions one at a time and keep responses short.
- Sound confident, calm, and professional.
```

---

## Testing & Troubleshooting

### Common Issues

#### "Missing required calendar setting" error
- **Solution:** Make sure all 4 calendar fields are filled in dashboard
- Check that private key includes BEGIN/END lines
- Verify you clicked "Save credentials"

#### "Failed to load Deepgram API key" error
- **Solution:** Check that Deepgram API key is saved in dashboard
- Verify the key is valid in Deepgram console
- Try regenerating the key if needed

#### Deployment fails
- **Solution:** Check Fly.io logs: `fly logs`
- Verify `fly.toml` has correct app name
- Ensure volume is created: `fly volumes list`
- Check build errors in deployment output

#### Calendar not working
- **Solution:** Verify calendar is shared with service account email
- Check Calendar ID is correct (no extra spaces)
- Ensure Google Calendar API is enabled
- Verify service account has "Make changes to events" permission

#### "Date is in the past" errors
- **Solution:** Add date handling instructions to system prompt (see above)
- The backend now provides better error messages
- Agent should ask for new date instead of retrying

#### Agent not responding
- **Solution:** Check Deepgram API key is configured
- Verify agent system prompt is saved
- Check Fly.io logs: `fly logs`
- Test web demo first, then phone calls

### Checking Logs

```bash
# View real-time logs
fly logs

# View logs for specific app
fly logs -a your-app-name

# SSH into machine for debugging
fly ssh console -a your-app-name
```

### Verifying Volumes

```bash
# List volumes
fly volumes list -a your-app-name

# Check volume is mounted
fly ssh console -a your-app-name
# Then: ls -la /data
```

---

## Security & Best Practices

### ✅ Secure Practices

- **Credentials stored on Fly.io volume** - Not in git or code
- **API keys never exposed** - Not in frontend bundle
- **Server-side only access** - Credentials only accessible server-side
- **Dashboard authentication** - Only authorized users can access

### ❌ Don't Commit

- API keys
- Private keys
- Service account credentials
- `.env` files
- `*.pem` files

### Security Checklist

- [ ] No secrets in code
- [ ] No `.env` files committed
- [ ] Credentials only in dashboard
- [ ] Service account has minimal permissions
- [ ] Calendar shared only with service account
- [ ] Regular key rotation (recommended)

---

## Cost Estimates

### Fly.io
- **Free tier:** 3 shared-cpu VMs, 3GB storage
- **Paid:** ~$5-20/month for production use

### Deepgram
- **Pricing:** Pay-as-you-go
- **Speech-to-text:** ~$0.0043 per minute
- **Text-to-speech:** Included with Aura voices
- Check current pricing: https://deepgram.com/pricing

### Google Cloud
- **Calendar API:** Free (within quotas)
- **Service account:** Free
- **No charges** for typical usage

### Twilio
- **Phone number:** ~$1/month
- **Per-minute charges:** Varies by country
- Check pricing: https://www.twilio.com/pricing

---

## Quick Reference

### Important URLs

- **Dashboard:** `https://your-app-name.fly.dev/`
- **Web Demo:** `https://your-app-name.fly.dev/demo`
- **Twilio Webhook:** `https://your-app-name.fly.dev/twilio/voice`

### Important Files

- **`fly.toml`** - Fly.io deployment configuration
- **`src/admin/AgentManager.tsx`** - Dashboard UI
- **`src/components/AdminDashboard.tsx`** - Main dashboard
- **`server/calendarService.ts`** - Calendar integration
- **`server/index.ts`** - Main server file

### Common Commands

```bash
# Deploy
fly deploy --remote-only

# View logs
fly logs

# List volumes
fly volumes list

# SSH into machine
fly ssh console

# Check app status
fly status
```

---

## Quick Start Checklist

- [ ] Clone/download repository
- [ ] Install dependencies (`npm install`)
- [ ] Create Fly.io account
- [ ] Create Fly app (`fly apps create`)
- [ ] Create volume (`fly volume create secrets`)
- [ ] Update `fly.toml` with app name
- [ ] Deploy (`fly deploy --remote-only`)
- [ ] Add Deepgram API key in dashboard
- [ ] (Optional) Configure Google Calendar
- [ ] (Optional) Configure Twilio webhook
- [ ] Add date handling to system prompt
- [ ] Customize agent system prompt
- [ ] Test web demo (`/demo`)
- [ ] Test phone calls (if configured)

---

## Support

If you encounter issues:

1. **Check Fly.io logs:** `fly logs`
2. **Review error messages** in dashboard
3. **Verify credentials** are correctly entered
4. **Check volumes are mounted:** `fly volumes list`
5. **Test web demo first** before phone calls
6. **Review this guide** for common issues

---

## Next Steps

After setup:

1. ✅ **Deploy the application**
2. ✅ **Configure credentials** in dashboard
3. ✅ **Customize agent** system prompt
4. ✅ **Test web demo** and phone calls
5. ✅ **Share agent URL** with customers
6. ✅ **Monitor usage** and adjust as needed

---

**Your agent will be live at:** `https://your-app-name.fly.dev`

**Dashboard:** `https://your-app-name.fly.dev/`

**Web Demo:** `https://your-app-name.fly.dev/demo`

---

*Last updated: December 2025*
