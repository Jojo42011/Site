## Twilio env vars for this project

Add these to your `.env` (project root):

```text
# Required for both browser demo + Twilio bridge
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_KEY

# Local API server port (defaults to 3001)
API_PORT=3001

# Optional but recommended if you use /twilio/voice TwiML webhook.
# Set to your public HTTPS URL (ngrok / cloudflare tunnel), no trailing slash.
PUBLIC_BASE_URL=https://YOUR_SUBDOMAIN.ngrok-free.app

# Twilio creds (not required for inbound media stream itself, but useful for:
# - validating Twilio webhooks
# - adding outbound calling later
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+13605551234

# Buffering: Twilio sends 20ms frames. 10 => ~200ms buffering for throughput.
TWILIO_BUFFER_FRAMES=10
```
















