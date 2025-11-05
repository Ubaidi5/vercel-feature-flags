import {
  enhancedDashboard,
  advancedAnalytics,
  betaFeatures,
} from "@/lib/flags";
import { reportValue } from "flags";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This API route returns dashboard feature flag configuration for the user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, userEmail } = body;

  // Get headers and cookies from the request
  const headers = request.headers;
  const cookieStore = await cookies();

  // Evaluate dashboard flags with user context
  const enhancedDashboardEnabled = await enhancedDashboard.decide?.({
    headers,
    cookies: cookieStore,
    entities: {
      userId,
      userEmail,
    },
  });

  const advancedAnalyticsEnabled = await advancedAnalytics.decide?.({
    headers,
    cookies: cookieStore,
    entities: {
      userId,
      userEmail,
    },
  });

  const betaFeaturesEnabled = await betaFeatures.decide?.({
    headers,
    cookies: cookieStore,
    entities: {
      userId,
      userEmail,
    },
  });

  // Report flag values for analytics
  reportValue("enhanced-dashboard", enhancedDashboardEnabled);
  reportValue("advanced-analytics", advancedAnalyticsEnabled);
  reportValue("beta-features", betaFeaturesEnabled);

  return Response.json({
    flags: {
      enhancedDashboard: enhancedDashboardEnabled,
      advancedAnalytics: advancedAnalyticsEnabled,
      betaFeatures: betaFeaturesEnabled,
    },
    userId,
    userEmail,
  });
}
