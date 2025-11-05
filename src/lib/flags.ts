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

// Dashboard Feature Flags
export const enhancedDashboard = flag({
  key: "enhanced-dashboard",
  description:
    "Enhanced dashboard with advanced UI and analytics - Gradual rollout to premium users",
  decide: async (context) => {
    const userId: string | undefined = context.entities?.userId;
    const userEmail = context.entities?.userEmail;

    // Premium users or beta testers get enhanced dashboard
    const premiumUsers = [
      "admin@example.com",
      "premium@example.com",
      "demo@example.com",
    ];

    // STRATEGY 1: Premium users always get enhanced dashboard
    if (userEmail && premiumUsers.includes(userEmail)) {
      return true;
    }

    // STRATEGY 2: Gradual rollout - enable for 50% of users
    if (userId) {
      const hash = userId
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const percentage = (hash % 100) + 1;

      // 50% rollout for enhanced dashboard
      return percentage <= 50;
    }

    // Default: simple dashboard
    return false;
  },
});

export const advancedAnalytics = flag({
  key: "advanced-analytics",
  description: "Advanced analytics features and detailed reporting",
  decide: async (context) => {
    const userId: string | undefined = context.entities?.userId;
    const userEmail = context.entities?.userEmail;

    // Analytics available to enterprise users
    const enterpriseUsers = ["admin@example.com", "enterprise@example.com"];

    if (userEmail && enterpriseUsers.includes(userEmail)) {
      return true;
    }

    // 25% rollout for advanced analytics
    if (userId) {
      const hash = userId
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const percentage = (hash % 100) + 1;

      return percentage <= 25;
    }

    return false;
  },
});

export const betaFeatures = flag({
  key: "beta-features",
  description: "Beta features for testing new functionality",
  decide: async (context) => {
    const userEmail = context.entities?.userEmail;

    // Only specific beta testers get beta features
    const betaTesters = [
      "admin@example.com",
      "beta@example.com",
      "demo@example.com",
    ];

    return userEmail ? betaTesters.includes(userEmail) : false;
  },
});
