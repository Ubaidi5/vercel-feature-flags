import { flag } from "flags/next";

// Simple testing feature flag - Controlled by Vercel Feature Flags Dashboard
export const testingFeature = flag({
  key: "testing-feature",
  description: "Testing feature flag - Shows banner when enabled",
  decide: async (context) => {
    const userEmail = context.entities?.userEmail;

    // Enable for testing email domains (fallback behavior)
    // This will be overridden by Vercel Feature Flags Dashboard in production
    if (userEmail) {
      const testingDomains = ["yopmail.com", "test.com", "testing.com"];
      const emailDomain = userEmail.split("@")[1];
      return testingDomains.includes(emailDomain);
    }

    return false; // Default: disabled
  },
});
