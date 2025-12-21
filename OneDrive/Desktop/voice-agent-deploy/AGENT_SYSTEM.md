# Agent Template System

This template system allows you to create and manage multiple voice agents from a single codebase.

## How It Works

### File Structure

```
agents/
├── chloe.json              # Car detailing agent config
├── dental.json             # Dental agent config (create this)
├── .active                 # File storing which agent is currently active
└── knowledge-bases/
    ├── chloe.txt           # Knowledge base for Chloe
    └── dental.txt          # Knowledge base for dental agent
```

### Agent Configuration

Each agent is defined in a JSON file (`agents/{agent-id}.json`) with:
- **id**: Unique identifier (e.g., "chloe", "dental")
- **name**: Display name
- **voice**: TTS configuration (Deepgram model)
- **listen**: STT configuration (Deepgram model)
- **think**: LLM configuration (OpenAI model, prompt, temperature)
- **functions**: Custom function definitions (optional)
- **knowledgeBase**: Knowledge base file reference
- **integrations**: Calendar, CRM, etc.
- **greeting**: Opening message

### Switching Agents

1. **Via Dashboard**: Go to `/admin` → "Switch Agent" tab → Click agent name
2. **Via File**: Edit `agents/.active` file to set the agent ID

### Creating a New Agent

1. Go to `/admin` → "Manage Agents" tab
2. Click "Create New Agent"
3. Fill in:
   - Agent ID (e.g., "dental")
   - Name (e.g., "Dental Assistant")
   - System prompt (the main instructions)
   - Greeting message
4. Click "Save"
5. Create knowledge base file: `agents/knowledge-bases/dental.txt`
6. Switch to the new agent via "Switch Agent" tab

### Example: Creating a Dental Agent

1. **Create Config**: Use the dashboard or create `agents/dental.json`:

```json
{
  "id": "dental",
  "name": "Dental Assistant",
  "voice": {
    "provider": "deepgram",
    "model": "aura-2-vesta-en"
  },
  "listen": {
    "provider": "deepgram",
    "model": "nova-3"
  },
  "think": {
    "provider": "open_ai",
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "prompt": "You are a friendly dental office assistant. Help patients schedule appointments, answer questions about services, and provide information about dental procedures..."
  },
  "knowledgeBase": {
    "enabled": true,
    "file": "dental.txt"
  },
  "integrations": {
    "calendar": {
      "enabled": true,
      "provider": "google"
    }
  },
  "greeting": "Hello! This is the dental office. How can I help you today?"
}
```

2. **Create Knowledge Base**: `agents/knowledge-bases/dental.txt` with dental-specific info

3. **Switch Agent**: Use dashboard or set `agents/.active` to `dental`

4. **Reload**: The app will automatically load the new agent

## API Endpoints

- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get agent config
- `POST /api/agents/:id` - Create/update agent
- `GET /api/agents/active` - Get active agent ID
- `POST /api/agents/active` - Set active agent

## Built-in Functions

All agents automatically get these functions if integrations are enabled:

- **Calendar** (if `integrations.calendar.enabled`):
  - `check_availability` - Check available appointment slots
  - `book_appointment` - Book an appointment

- **Knowledge Base** (if `knowledgeBase.enabled`):
  - `search_kb` - Search the knowledge base

## Custom Functions

Add custom functions in the agent config:

```json
{
  "functions": [
    {
      "name": "custom_function",
      "description": "Does something custom",
      "parameters": {
        "type": "object",
        "properties": {
          "param1": {
            "type": "string",
            "description": "Parameter description"
          }
        },
        "required": ["param1"]
      }
    }
  ]
}
```

Then handle the function in `src/components/App.jsx` in the `handleFunctionCallRequest` function.

## Notes

- Agents are stored as JSON files (no database needed)
- The active agent is loaded on app startup
- Switching agents requires a page reload (automatic)
- Each agent can have its own knowledge base file
- Calendar integration works for all agents (uses same Google Calendar)
- CRM integration can be added per-agent in the future


