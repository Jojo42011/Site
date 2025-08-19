@echo off
echo 🚀 Aethon Platform Deployment Script
echo =====================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git not initialized. Initializing...
    git init
    git add .
    git commit -m "Initial commit"
    echo ✅ Git initialized
) else (
    echo ✅ Git already initialized
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No remote origin found.
    echo Please add your GitHub repository as origin:
    echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
    pause
    exit /b 1
)

echo 📤 Pushing to GitHub...
git add .
git commit -m "Deploy to production - %date% %time%"
git push origin main

echo ✅ Code pushed to GitHub!
echo.
echo 🌐 Next steps:
echo 1. Go to https://vercel.com
echo 2. Import your GitHub repository
echo 3. Add environment variables:
echo    - NEXT_PUBLIC_SUPABASE_URL
echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo    - STRIPE_SECRET_KEY
echo    - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
echo    - STRIPE_WEBHOOK_SECRET
echo    - NEXT_PUBLIC_APP_URL (your production domain)
echo 4. Deploy!
echo.
echo 🎉 Your Aethon platform will be live in minutes!
pause
