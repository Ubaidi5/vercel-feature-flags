import { flag } from "flags/next";

// Simple testing feature flag - Controlled by Vercel Feature Flags Dashboard
export const testingFeature = flag({
  key: "testing-feature",
  description: "Testing feature flag - Shows banner when enabled",
  // Default value when no override is set and decide logic can't be evaluated
  defaultValue: false,
  // The decide function acts as FALLBACK logic when no override is set
  // Vercel Toolbar/Dashboard overrides take precedence over this logic
  decide: async (context) => {
    // Check for user email in cookies (can be set by the API route)
    const userEmailFromCookie = context.cookies?.get?.("user-email")?.value;
    const userEmail = context.entities?.userEmail || userEmailFromCookie;

    // Fallback: Enable for testing email domains when no override is active
    if (userEmail) {
      const testingDomains = ["yopmail.com", "test.com", "testing.com"];
      const emailDomain = userEmail.split("@")[1];
      return testingDomains.includes(emailDomain);
    }

    // Default: disabled when no user context available
    return false;
  },
});
