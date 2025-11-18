# Vercel Flags Explorer Setup Guide

## What I Fixed

Your app was using `@vercel/edge-config` directly, but the Vercel Flags Explorer in the toolbar requires the newer `flags` SDK. I've updated your setup to use the proper SDK.

## Changes Made

1. **Installed the `flags` package** - The modern replacement for `@vercel/flags`
2. **Created the discovery endpoint** - Added `/.well-known/vercel/flags/route.ts` that the Flags Explorer needs
3. **Updated flags.ts** - Now exports flag definitions that work with the Toolbar

## How to Use the Flags Explorer

1. **Make sure your project is linked to Vercel**:
   ```bash
   vercel link
   ```

2. **Set up your Edge Config** (if not already done):
   - Go to your Vercel Dashboard
   - Navigate to Storage → Create Database → Edge Config
   - Name it (e.g., "feature-flags")
   - Connect it to your project
   - Add the `testingFeature` key as a boolean

3. **Get your Edge Config connection string** for local development:
   - In Vercel Dashboard, go to your Edge Config
   - Copy the Connection String
   - Create a `.env.local` file in your project root:
     ```env
     EDGE_CONFIG=your_connection_string_here
     ```

4. **Restart your dev server**:
   ```bash
   npm run dev
   ```

5. **Open the Flags Explorer**:
   - Look for the Vercel Toolbar at the bottom of your dev app
   - Click the flags icon (🚩)
   - You should now see your `testingFeature` flag!

## Testing Your Flags

You can toggle the flag in the Flags Explorer and see it take effect in your app. The flag controls the testing banner on the dashboard.

### Test Users

The app includes beta tester targeting. These emails always get the testing feature enabled:
- `admin@example.com`
- `beta@example.com`

## Troubleshooting

### "Missing version information" error
- This was caused by using the old SDK without the discovery endpoint
- Fixed by installing the `flags` package and creating the endpoint

### Flags not showing in Explorer
- Make sure your project is linked to Vercel (`vercel link`)
- Verify the Vercel Toolbar is loading (check bottom of page in dev mode)
- Check browser console for any errors

### "Unauthorized" error
- The Toolbar needs to authenticate with the discovery endpoint
- Make sure you're running in development mode
- Ensure you're logged into Vercel in your browser

## How It Works

1. **Discovery Endpoint**: The `/.well-known/vercel/flags/route.ts` file tells the Toolbar what flags exist
2. **Flag Definitions**: In `src/lib/flags.ts`, each flag is defined with its schema and decision logic
3. **Edge Config Integration**: Flag values are still stored in Edge Config for ultra-fast reads
4. **Toolbar Integration**: The Flags Explorer reads from the discovery endpoint and lets you override flags locally

## Next Steps

- Add more flags by creating new flag definitions in `flags.ts`
- Add them to the discovery endpoint
- Use them in your components via the API route or directly with the SDK

