# Pre-Sharing Checklist

Before sending this repo to your client, follow this checklist:

---

## ✅ Files to Include

- ✅ All source code (`src/`, `server/`, `agents/`)
- ✅ Configuration files (`package.json`, `fly.toml`, `Dockerfile`, `vite.config.ts`)
- ✅ Documentation files (`.md` files)
- ✅ `.gitignore` file
- ✅ `README.md`

---

## ❌ Files to EXCLUDE (Don't Send)

- ❌ `node_modules/` folder (too large, they'll install it)
- ❌ `.env` files (may contain your secrets)
- ❌ `dist/` folder (build output, will be regenerated)
- ❌ `.fly/` folder (your Fly.io local config)
- ❌ `.cursor/` folder (your editor config)
- ❌ `.vscode/` folder (your editor config)
- ❌ Any files with API keys or secrets
- ❌ `*.pem` files (private keys)

---

## 📦 How to Share

### Option 1: GitHub Repository (Recommended)

**Best for:**
- Version control
- Easy updates
- Professional presentation

**Steps:**
1. Create a new GitHub repository (private or public)
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/voice-agent-template.git
   git push -u origin main
   ```
3. Share the repository URL with your client
4. They can clone it: `git clone <repository-url>`

**Note:** Make sure to remove any secrets before pushing!

---

### Option 2: ZIP File

**Best for:**
- Quick sharing
- One-time setup
- Clients not familiar with Git

**Steps:**
1. Clean the repository:
   ```bash
   # Remove node_modules
   rm -rf node_modules
   
   # Remove build files
   rm -rf dist
   
   # Remove local config
   rm -rf .fly .cursor .vscode
   
   # Remove any .env files
   rm -f .env .env.local .env.*.local
   ```

2. Create ZIP:
   - **Windows:** Right-click folder → "Send to" → "Compressed (zipped) folder"
   - **Mac/Linux:** `zip -r voice-agent-template.zip . -x "node_modules/*" -x ".git/*" -x "dist/*"`

3. Send ZIP file via email/cloud storage

---

### Option 3: Private Git Repository

**Best for:**
- Multiple clients
- Ongoing updates
- Professional service

**Steps:**
1. Use GitHub, GitLab, or Bitbucket
2. Create a private repository
3. Add client as collaborator (if needed)
4. Share repository access

---

## 🔒 Security Check Before Sharing

Run these checks:

```bash
# Check for any .env files
find . -name ".env*" -type f

# Check for API keys in code (common patterns)
grep -r "DEEPGRAM_API_KEY" . --exclude-dir=node_modules
grep -r "TWILIO_AUTH_TOKEN" . --exclude-dir=node_modules
grep -r "GOOGLE_PRIVATE_KEY" . --exclude-dir=node_modules

# Check for private keys
find . -name "*.pem" -type f
find . -name "*private*key*" -type f
```

**If you find any secrets:**
- Remove them from the code
- Rotate the keys (generate new ones)
- Use environment variables or dashboard instead

---

## 📋 What Client Needs to Do

Share these files with your client:

1. **`CLIENT_SETUP_GUIDE.md`** - Complete setup instructions
2. **`GOOGLE_CALENDAR_SETUP.md`** - Calendar integration guide
3. **`SYSTEM_PROMPT_DATE_FIX.md`** - System prompt instructions
4. **The codebase** (via GitHub or ZIP)

---

## 🎯 Quick Start Package

Create a package with:

```
voice-agent-template/
├── CLIENT_SETUP_GUIDE.md          ← Start here
├── GOOGLE_CALENDAR_SETUP.md       ← Calendar setup
├── SYSTEM_PROMPT_DATE_FIX.md      ← Prompt instructions
├── README.md                       ← Original README
├── src/                            ← Source code
├── server/                         ← Server code
├── agents/                         ← Agent configs
├── package.json                    ← Dependencies
├── fly.toml                        ← Deployment config
└── Dockerfile                      ← Build config
```

---

## 💡 Pro Tips

1. **Create a template repository** - Keep one clean version without client-specific configs
2. **Use environment variables** - Never hardcode secrets
3. **Document everything** - The more documentation, the easier for clients
4. **Test the setup** - Try following your own instructions on a fresh machine
5. **Provide support** - Be available for questions during initial setup

---

## 📝 Customization Before Sharing

Before sharing, you may want to:

1. **Update branding:**
   - Change "Aethon" to generic name or remove
   - Update colors if needed

2. **Remove client-specific data:**
   - Remove any hardcoded business names
   - Remove specific agent configs (or make them generic)

3. **Update documentation:**
   - Replace example URLs with placeholders
   - Update any client-specific references

4. **Create a generic example:**
   - Keep one example agent config
   - Make knowledge base generic or remove

---

## ✅ Final Checklist

Before sending to client:

- [ ] Removed `node_modules/`
- [ ] Removed `dist/` folder
- [ ] Removed `.env` files
- [ ] Removed `.fly/`, `.cursor/`, `.vscode/` folders
- [ ] Checked for hardcoded secrets
- [ ] Updated branding (if needed)
- [ ] Included all documentation files
- [ ] Tested that `npm install` works
- [ ] Verified `CLIENT_SETUP_GUIDE.md` is clear
- [ ] Created clean ZIP or GitHub repo

---

**Ready to share!** 🚀

Send them:
1. The codebase (GitHub link or ZIP)
2. `CLIENT_SETUP_GUIDE.md`
3. `GOOGLE_CALENDAR_SETUP.md` (if they need calendar)
4. `SYSTEM_PROMPT_DATE_FIX.md`
