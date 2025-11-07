import { evaluateFlags } from "@/lib/flags";
import { NextRequest } from "next/server";

// Enable edge runtime for ultra-fast responses
export const runtime = "edge";

/**
 * API route to fetch feature flags for a user
 * Uses Edge Config for ultra-low latency reads
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail } = body;

    if (!userId || !userEmail) {
      return Response.json(
        { error: "userId and userEmail are required" },
        { status: 400 }
      );
    }

    // Evaluate feature flags with user context
    const flags = await evaluateFlags(userId, userEmail);

    return Response.json({
      flags,
      userId,
      userEmail,
      source: "edge-config",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in dashboard config API:", error);
    return Response.json(
      { error: "Failed to fetch feature flags" },
      { status: 500 }
    );
  }
}
