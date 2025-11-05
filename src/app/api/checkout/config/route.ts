import { newCheckout, discountCode } from "@/lib/flags";
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

  // Evaluate flags with user context
  // Note: decide expects context with headers, cookies, and entities properties
  const newCheckoutEnabled = await newCheckout.decide?.({
    headers,
    cookies: cookieStore,
    entities: {
      userId,
      userEmail,
    },
  });

  const discountCodeEnabled = await discountCode.decide?.({
    headers,
    cookies: cookieStore,
    entities: {
      userId,
      userEmail,
    },
  });

  reportValue("new-checkout", newCheckoutEnabled);
  reportValue("discount-code", discountCodeEnabled);

  return Response.json({
    flags: {
      newCheckout: newCheckoutEnabled,
      discountCode: discountCodeEnabled,
    },
    userId,
  });
}
