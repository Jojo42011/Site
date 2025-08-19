# Aethon - AI Automation Platform

Transform your business with AI agents that work 24/7. Scout, Eve, and Shadow automate your sales, customer service, and operations.

## 🚀 Features

- **Scout**: Lead Intelligence Specialist - Real-time lead generation and outreach
- **Eve**: Customer Service Specialist - 24/7 customer support automation  
- **Shadow**: Workflow Automation Specialist - Process optimization and analytics
- **Stripe Integration**: Complete subscription management
- **Supabase Backend**: Real-time database with authentication
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Auth, Database, Real-time)
- **Payments**: Stripe (Subscriptions, Webhooks)
- **Animations**: Framer Motion, Lottie
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aethon-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` with:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repo to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

### Environment Variables for Production

Update `NEXT_PUBLIC_APP_URL` to your production domain:
```bash
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🔧 Configuration

### Stripe Webhook Setup

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook secret to environment variables

### Supabase Setup

1. Create new project in [Supabase](https://supabase.com)
2. Run SQL migrations (see `database/` folder)
3. Copy project URL and anon key to environment variables

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   ├── dashboard/      # User dashboard
│   ├── login/          # Authentication
│   ├── pricing/        # Pricing page
│   └── page.tsx        # Landing page
├── components/          # Reusable components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
└── lib/                # Utility functions
```

## 🔒 Security

- Environment variables are properly secured
- Supabase RLS policies enabled
- Stripe webhook signature verification
- Protected routes with authentication

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Progressive Web App ready

## 🚀 Performance

- Next.js 15 with App Router
- Optimized images and animations
- Code splitting and lazy loading
- SEO optimized

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, email support@aethon.ai or create an issue in the repository.
