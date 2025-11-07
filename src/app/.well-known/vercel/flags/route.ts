// Feature flags discovery endpoint for Vercel Toolbar
// Note: This app uses Edge Config for feature flags, not the flags package
export async function GET() {
  return Response.json({
    definitions: {
      testingFeature: {
        description: "Shows testing banner on dashboard",
        origin: "edge-config",
        options: [
          { value: false, label: "Disabled" },
          { value: true, label: "Enabled" },
        ],
      },
    },
  });
}
