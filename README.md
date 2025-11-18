# Vercel Feature Flags Demo with Edge Config

A modern, dark-themed Next.js application demonstrating **Vercel Edge Config** for ultra-low latency feature flag management. This demo showcases real-world feature flag patterns including beta testing, percentage rollouts, and instant flag updates at the edge.

## ✨ Features

- 🚩 **Edge Config Integration** - Sub-millisecond feature flag reads globally
- 🎨 **Modern Dark UI** - Beautiful glassmorphism design with Tailwind CSS v4
- 🎯 **User Targeting** - Beta tester allowlists and percentage-based rollouts
- ⚡ **Edge Runtime** - Ultra-fast API responses at the edge
- 🔄 **Instant Updates** - Change flags without redeploying
- 📊 **Admin Dashboard** - Test and visualize feature flag behavior

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Edge Config

See [EDGE_CONFIG_SETUP.md](./EDGE_CONFIG_SETUP.md) for detailed instructions.

**Quick setup:**
1. Create an Edge Config in your Vercel project
2. Add the `EDGE_CONFIG` connection string to `.env.local`
3. Add this key to your Edge Config:
   - `testingFeature`: `false`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📱 Demo Pages

- **/** - Login page with demo credentials
- **/dashboard** - Main dashboard showing feature flags in action
- **/admin/flags** - Admin panel to test flag evaluation

### Demo Credentials

**You can use ANY email address and ANY password (minimum 6 characters) to login!**

Quick examples:
- Email: `demo@example.com` or `test@yopmail.com`
- Password: `123456` (any 6+ characters work)

Or click **"Fill demo credentials"** on the login page for auto-fill.

## 🧪 How to See the Testing Banner

The testing banner is a **domain-based feature flag** that demonstrates targeted feature rollouts based on user email domains.

### 🎯 Testing Banner Rules

The testing banner has **domain-specific targeting**:

**✅ WILL see the banner:**
- Any email with `@yopmail.com` domain
- Examples: `test@yopmail.com`, `user123@yopmail.com`, `hello@yopmail.com`

**❌ Will NOT see the banner:**
- Any other email domain
- Examples: `user@gmail.com`, `demo@example.com`, `test@outlook.com`

### Quick Test Instructions

**Step 1: See the Banner (ENABLED)**
1. Go to the login page
2. Enter email: `yourname@yopmail.com` (any name works)
3. Enter password: `123456` (any 6+ characters)
4. Click "Sign in"
5. ✅ You'll see the **blue-purple testing banner** at the top of the dashboard

**Step 2: Compare Without Banner (DISABLED)**
1. Log out (click your avatar → Logout)
2. Login with: `demo@gmail.com`
3. Enter password: `123456`
4. Click "Sign in"
5. ❌ No banner appears - showing the default experience

### What You'll See

**With Yopmail Domain (Enabled):**
```
┌─────────────────────────────────────────────┐
│ 🧪 Testing Feature Enabled!                 │
│ This banner is controlled by the            │
│ "testing-feature" flag. You're seeing this  │
│ because the feature flag is enabled for     │
│ your account.                                │
└─────────────────────────────────────────────┘
```
- Feature Flag Status shows: **"ENABLED"** (green badge)

**With Other Domains (Disabled):**
- No banner displayed at the top
- Feature Flag Status shows: **"DISABLED"** (gray badge)

### 💡 Why Domain-Based Targeting?

This demonstrates a real-world use case:
- **Beta Testing**: Roll out features to specific domains first (e.g., internal company domains)
- **A/B Testing**: Compare user experience across different user segments
- **Gradual Rollouts**: Enable features for select user groups before full launch

## 🎯 Feature Flag Strategies

### 1. Domain-Based Targeting
The testing banner feature uses **email domain targeting**:
- Users with `@yopmail.com` domain see the testing banner
- All other domains see the default experience
- This demonstrates targeted feature rollouts by user segments

### 2. Edge Config Storage (Optional)
Base flag values can be stored in Vercel Edge Config for instant global updates and centralized control.

## 🏗️ Architecture

```
┌─────────────────┐
│   Edge Config   │  ← Global feature flag storage
│   (Vercel)      │
└────────┬────────┘
         │
    ┌────▼────┐
    │  Edge   │  ← API routes running at edge
    │ Runtime │
    └────┬────┘
         │
    ┌────▼────────┐
    │   Client    │  ← React components
    │  Dashboard  │
    └─────────────┘
```

## 📦 Tech Stack

- **Next.js 16** - App Router with Edge Runtime
- **React 19** - Latest React features
- **Tailwind CSS v4** - Modern styling with CSS variables
- **@vercel/edge-config** - Feature flag storage
- **TypeScript** - Type safety

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
EDGE_CONFIG=your_connection_string_here
```

### Edge Config Keys

| Key | Type | Description |
|-----|------|-------------|
| `testingFeature` | boolean | Shows testing banner on dashboard |

## 📚 Documentation

- [Edge Config Setup Guide](./EDGE_CONFIG_SETUP.md) - Detailed setup instructions
- [Vercel Edge Config Docs](https://vercel.com/docs/storage/edge-config)
- [Next.js Documentation](https://nextjs.org/docs)

## 🚢 Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above
2. Connect your repository
3. Create an Edge Config in project settings
4. Add feature flag keys to Edge Config
5. Deploy!

## 🤝 Contributing

This is a demo application. Feel free to fork and customize for your needs!
