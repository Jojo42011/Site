# Google Calendar Integration Setup Guide

## Required Credentials

You need **4 pieces of information** to connect your Google Calendar:

1. **Service Account Email** - The email address of your Google Service Account
2. **Calendar ID** - The ID of the Google Calendar to use
3. **Time Zone** - Your timezone (e.g., `America/Chicago`, `America/New_York`)
4. **Private Key (PEM)** - The private key from your service account JSON file

---

## Step-by-Step Setup Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter a project name (e.g., "Voice Agent Calendar")
4. Click **"Create"**

### Step 2: Enable Google Calendar API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Calendar API"**
3. Click on it and press **"Enable"**

### Step 3: Create a Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Enter a name (e.g., "calendar-service-account")
4. Click **"Create and Continue"**
5. Skip the optional steps and click **"Done"**

### Step 4: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **"JSON"** format
5. Click **"Create"** - This downloads a JSON file

### Step 5: Extract Credentials from JSON File

Open the downloaded JSON file. You'll see something like:

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

- **Service Account Email**: Copy the `client_email` value (e.g., `calendar-service@your-project.iam.gserviceaccount.com`)
- **Private Key (PEM)**: Copy the entire `private_key` value, including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines

### Step 6: Share Calendar with Service Account

1. Open [Google Calendar](https://calendar.google.com/)
2. Find the calendar you want to use (or create a new one)
3. Click the **three dots** next to the calendar name → **"Settings and sharing"**
4. Scroll to **"Share with specific people"**
5. Click **"Add people"**
6. Paste your **Service Account Email** (from Step 5)
7. Set permission to **"Make changes to events"**
8. Click **"Send"**

### Step 7: Get Your Calendar ID

1. Still in Calendar Settings, scroll to **"Integrate calendar"**
2. Find **"Calendar ID"** - it will look like:
   - `your-email@gmail.com` (for your primary calendar)
   - `c_xxxxxxxxxxxxx@group.calendar.google.com` (for shared calendars)
3. Copy this **Calendar ID**

### Step 8: Enter Credentials in Dashboard

1. Go to your dashboard at `/` (root path)
2. Scroll to **"Credentials (stored server-side)"** section
3. Find **"Calendar (Google)"** section
4. Enter:
   - **Service account email**: Paste the email from Step 5
   - **Calendar ID**: Paste the Calendar ID from Step 7
   - **Time zone**: Enter your timezone (e.g., `America/Chicago`, `America/New_York`, `America/Los_Angeles`)
   - **Private key (PEM)**: Paste the entire private key from Step 5 (including BEGIN/END lines)
5. Click **"Save credentials"**

---

## Common Time Zones

Use these exact values for time zones:

- `America/Chicago` - Central Time
- `America/New_York` - Eastern Time
- `America/Denver` - Mountain Time
- `America/Los_Angeles` - Pacific Time
- `America/Phoenix` - Arizona (no DST)
- `UTC` - Coordinated Universal Time

Find more at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

---

## Troubleshooting

**"Missing required calendar setting" error:**
- Make sure all 4 fields are filled in the dashboard
- Check that the private key includes the BEGIN/END lines
- Ensure you clicked "Save credentials"

**"Calendar not found" error:**
- Verify the Calendar ID is correct
- Make sure you shared the calendar with the Service Account email
- Check that the Service Account has "Make changes to events" permission

**"Authentication failed" error:**
- Verify the Service Account Email matches the one in your JSON file
- Check that the Private Key is copied completely (including newlines)
- Ensure Google Calendar API is enabled in your Google Cloud project

---

## Security Notes

- Credentials are stored securely on the server (Fly.io volume)
- They are NOT committed to git or exposed in the frontend
- Only users with dashboard access can view/edit credentials
- The Service Account should only have access to the specific calendar needed
