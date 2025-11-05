import { flag } from "flags/next";

// Define the new checkout feature flag with targeting logic
export const newCheckout = flag({
  key: "new-checkout",
  description: "New improved checkout experience - Gradual rollout",
  decide: async (context) => {
    // Context contains user info passed from the component
    const userId: string | undefined = context.entities?.userId;
    const userEmail = context.entities?.userEmail;
    const betaTesters = ["admin@example.com", "beta@example.com"];

    // STRATEGY 1: Beta testers always get the new feature
    if (userEmail && betaTesters.includes(userEmail)) {
      return true;
    }

    // STRATEGY 2: Gradual rollout - enable for percentage of users
    // Hash userId to get consistent assignment per user
    if (userId) {
      const hash = userId
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const percentage = (hash % 100) + 1;

      // Currently rolling out to 30% of users
      return percentage <= 30;
    }

    // Default: feature is disabled
    return false;
  },
});

export const discountCode = flag({
  key: "discount-code",
  description: "Show discount code input during checkout",
  decide: async (context) => {
    // Always enable this feature for demo purposes
    return true;
  },
});
