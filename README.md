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

Click "Fill demo credentials" on the login page, or use:
- Email: `demo@example.com`
- Password: `demo123` (any 6+ characters work)

## 🎯 Feature Flag Strategies

### 1. Edge Config Storage
Base flag values are stored in Vercel Edge Config for instant global updates.

### 2. Beta Tester Targeting
Specific email addresses always get the testing feature enabled:
- `admin@example.com`
- `beta@example.com`

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
