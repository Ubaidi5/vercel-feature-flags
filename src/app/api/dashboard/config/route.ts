import { testingFeature } from "@/lib/flags";
import { reportValue } from "flags";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This API route returns feature flag configuration for the user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, userEmail } = body;

  // Get headers and cookies from the request
  const headers = request.headers;
  const cookieStore = await cookies();

  // Evaluate testing feature flag with user context
  const testingFeatureEnabled = await testingFeature.decide?.({
    headers,
    cookies: cookieStore,
    entities: {
      userId,
      userEmail,
    },
  });

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
