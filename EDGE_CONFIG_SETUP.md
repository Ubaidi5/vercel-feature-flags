# Edge Config Setup Guide for Feature Flags

This application uses **Vercel Edge Config** for ultra-low latency feature flag management. Edge Config is a globally distributed key-value store that provides sub-millisecond read times at the edge.

## 📋 Prerequisites

- A Vercel account
- Your project deployed on Vercel (or linked to Vercel)
- Access to your project settings

## 🚀 Setup Steps

### 1. Create an Edge Config

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → Select **Edge Config**
4. Give it a name (e.g., `feature-flags`)
5. Click **Create**

### 2. Connect Edge Config to Your Project

1. In your Edge Config settings, click **Connect to Project**
2. Select your project from the dropdown
3. Choose the environment(s) to connect to (Production, Preview, Development)
4. Click **Connect**

This will automatically add the `EDGE_CONFIG` environment variable to your project.

### 3. Add Feature Flag Key

In your Edge Config dashboard, add the following key:

| Key              | Type    | Default Value | Description                                      |
| ---------------- | ------- | ------------- | ------------------------------------------------ |
| `testingFeature` | boolean | `false`       | Controls the testing feature banner on dashboard |

**How to add the key:**

1. In Edge Config dashboard, click **Edit Items**
2. Click **Add Item**
3. Enter:
   - Key: `testingFeature`
   - Type: `Boolean`
   - Value: `false` (or `true` to enable)
4. Click **Save Changes**

### 4. Set Up Local Development

For local development, you need to add the Edge Config connection string to your local environment:

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Get your Edge Config connection string:

   - Go to your Edge Config in Vercel dashboard
   - Click **Connection String**
   - Copy the string (it looks like `https://edge-config.vercel.com/...`)

3. Add it to `.env.local`:

   ```env
   EDGE_CONFIG=your_connection_string_here
   ```

4. Restart your development server:
   ```bash
   npm run dev
   ```

## 🎯 Feature Flag Configuration

### Base Flag (Stored in Edge Config)

This is the global default value:

- `testingFeature`: Whether to show the testing banner on the dashboard

### User-Based Targeting (Code Logic)

The application applies additional logic on top of Edge Config values:

#### 1. Beta Tester Targeting

Users with these emails always get `testingFeature` enabled:

- `admin@example.com`
- `beta@example.com`

### Example Use Cases

**Scenario 1: Enable testing feature for everyone**

- Set `testingFeature: true` in Edge Config
- All users will see the testing banner

**Scenario 2: Beta test with specific users**

- Set `testingFeature: false` in Edge Config
- Beta tester emails will still see it (overridden in code)

## 🔄 Updating Feature Flags

### Via Vercel Dashboard (Recommended)

1. Go to your Edge Config in Vercel dashboard
2. Click **Edit Items**
3. Update the values
4. Click **Save Changes**
5. **Changes are live globally within seconds!** No deployment needed.

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Update a flag
vercel edge-config set testingFeature true

# Get current value
vercel edge-config get testingFeature

# List all items
vercel edge-config list
```

### Via API (Programmatically)

```typescript
import { createClient } from "@vercel/edge-config";

const edgeConfig = createClient(process.env.EDGE_CONFIG!);

// Update a flag
await edgeConfig.set("testingFeature", true);

// Get a flag
const value = await edgeConfig.get("testingFeature");
```

## 📊 Testing Your Flags

Visit `/admin/flags` in your application to:

- Test different user IDs and emails
- See which flags are enabled for specific users
- View the targeting logic in action
- Verify Edge Config integration

## ⚡ Benefits of Edge Config

1. **Ultra-Low Latency**: Sub-millisecond reads globally
2. **Instant Updates**: Changes propagate in seconds (no deployment)
3. **Edge Runtime**: Flags are cached at edge locations near users
4. **No Cold Starts**: Always fast, even for infrequent requests
5. **Scalable**: Handles millions of requests with consistent performance

## 🔒 Security

- Edge Config connection strings are sensitive credentials
- Never commit `.env.local` to version control
- Use Vercel's environment variable management for production
- Rotate tokens if compromised

## 🐛 Troubleshooting

### "Edge Config not configured" Warning

**Cause**: `EDGE_CONFIG` environment variable is not set

**Solution**:

1. Check if `.env.local` exists with the connection string
2. Verify the connection string is correct
3. Restart your dev server after adding the variable

### Flags Not Updating

**Cause**: Edge Config might be cached

**Solution**:

1. Wait a few seconds (Edge Config has a small propagation delay)
2. Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
3. Check if the flag was actually updated in Edge Config dashboard

### "Error fetching flags" in Production

**Cause**: Edge Config not connected to production environment

**Solution**:

1. Go to Edge Config settings in Vercel
2. Ensure it's connected to Production environment
3. Redeploy your application

## 📚 Additional Resources

- [Vercel Edge Config Documentation](https://vercel.com/docs/storage/edge-config)
- [Edge Config API Reference](https://vercel.com/docs/storage/edge-config/edge-config-api)
- [@vercel/edge-config SDK](https://www.npmjs.com/package/@vercel/edge-config)

## 💡 Advanced Features

### Multi-Environment Setup

You can create separate Edge Configs for different environments:

```typescript
const edgeConfigUrl =
  process.env.NODE_ENV === "production"
    ? process.env.EDGE_CONFIG_PRODUCTION
    : process.env.EDGE_CONFIG_PREVIEW;
```

### Versioning

Edge Config supports versioning, allowing you to rollback changes:

```bash
# View version history
vercel edge-config versions

# Rollback to a specific version
vercel edge-config rollback <version-id>
```

### A/B Testing Analytics

Integrate with analytics to track flag performance:

```typescript
// Track flag exposure
analytics.track("feature_flag_exposed", {
  flag: "testingFeature",
  value: flags.testingFeature,
  userId: userId,
});
```

---

**Happy Feature Flagging! 🚩**
