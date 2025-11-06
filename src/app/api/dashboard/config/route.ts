import { testingFeature } from "@/lib/flags";
import { reportValue } from "flags";
import { NextRequest } from "next/server";

// This API route returns feature flag configuration for the user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, userEmail } = body;

  // Evaluate testing feature flag - it automatically checks for Vercel Toolbar overrides
  // In App Router, the flag function automatically picks up headers and cookies
  const testingFeatureEnabled = await testingFeature();

  // Report flag value for analytics
  reportValue("testing-feature", testingFeatureEnabled);

  return Response.json({
    flags: {
      testingFeature: testingFeatureEnabled,
    },
    userId,
    userEmail,
  });
}
