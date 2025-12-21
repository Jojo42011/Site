# System Prompt Update for Date Handling

## Problem
The agent was calling `check_availability` with dates from 2023 instead of current/future dates, causing repeated errors.

## Solution
Add the following instructions to your **System Prompt** in the dashboard:

---

## Add This to Your System Prompt

Add this section to your system prompt (you can add it at the beginning or in the "IMPORTANT REMINDERS" section):

```
DATE HANDLING (CRITICAL)
- Today's date is automatically provided in your context. ALWAYS use the current year (2025) or later when checking availability.
- When a customer mentions a date without a year (e.g., "November 1st", "Dec 15"), assume they mean the NEXT occurrence of that date in the future, NOT a past date.
- If check_availability returns an error saying "Date is in the past", immediately ask the customer for a different date. Do NOT retry with the same date.
- Always format dates as YYYY-MM-DD (e.g., 2025-12-22, 2026-01-15).
- Never use dates from previous years or conversations - always use current or future dates.
```

---

## Where to Add This

1. Go to your dashboard at `/` (root path)
2. Scroll to **"System Prompt"** section
3. Add the text above to your existing prompt
4. Click **"Save changes"**

---

## Example Updated Prompt Structure

Your prompt should look something like this:

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

## What This Fixes

1. **Prevents past date errors**: The agent will understand to use current/future dates
2. **Better error handling**: When an error occurs, the agent will ask for a new date instead of retrying
3. **Date inference**: When customers say dates without years, the agent will correctly infer future dates
4. **Consistent formatting**: Ensures dates are always in YYYY-MM-DD format

---

## Testing

After updating the prompt:
1. Test in the web demo at `/demo`
2. Try asking for availability with dates like "November 1st" or "next Monday"
3. The agent should correctly use 2025 dates (or later)
4. If you mention a past date, the agent should ask for a future date

---

## Note

The backend now provides better error messages that include:
- The date you provided
- Today's date
- Clear instructions to ask for a new date

This works together with the system prompt to ensure proper date handling.
