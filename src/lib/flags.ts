import { createClient } from "@vercel/edge-config";

// Initialize Edge Config client
const edgeConfig = process.env.EDGE_CONFIG
  ? createClient(process.env.EDGE_CONFIG)
  : null;

// Feature flag interface
export interface FeatureFlags {
  testingFeature: boolean;
}

// Default feature flags when Edge Config is not available
const defaultFlags: FeatureFlags = {
  testingFeature: false,
};

/**
 * Get all feature flags from Edge Config
 * Falls back to default values if Edge Config is not configured
 */
export async function getAllFlags(): Promise<FeatureFlags> {
  try {
    if (!edgeConfig) {
      console.warn("Edge Config not configured, using default flags");
      return defaultFlags;
    }

    // Get all flags from Edge Config
    const flags = await edgeConfig.getAll();

    // Merge with defaults to ensure all flags exist
    return {
      testingFeature:
        (flags?.testingFeature as boolean) ?? defaultFlags.testingFeature,
    };
  } catch (error) {
    console.error("Error fetching flags from Edge Config:", error);
    return defaultFlags;
  }
}

/**
 * Get a specific feature flag from Edge Config
 * @param key - The flag key to retrieve
 * @param defaultValue - Fallback value if flag is not found
 */
export async function getFlag<K extends keyof FeatureFlags>(
  key: K,
  defaultValue?: boolean
): Promise<boolean> {
  try {
    if (!edgeConfig) {
      console.warn(`Edge Config not configured, using default for ${key}`);
      return defaultValue ?? defaultFlags[key];
    }

    const value = await edgeConfig.get<boolean>(key);
    return value ?? defaultValue ?? defaultFlags[key];
  } catch (error) {
    console.error(`Error fetching flag ${key} from Edge Config:`, error);
    return defaultValue ?? defaultFlags[key];
  }
}

/**
 * Evaluate feature flags based on user context
 * This allows for advanced targeting based on user properties
 * @param userId - User identifier
 * @param userEmail - User email for email-based targeting
 */
export async function evaluateFlags(
  userId: string,
  userEmail: string
): Promise<FeatureFlags> {
  const flags = await getAllFlags();

  // Beta tester targeting: Enable testing feature for specific emails
  const betaTesterEmails = ["admin@example.com", "beta@example.com"];
  if (betaTesterEmails.includes(userEmail)) {
    flags.testingFeature = true;
  }

  return flags;
}
