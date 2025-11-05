import { newCheckout, discountCode } from "@/lib/flags";
import { reportValue } from "flags";

// This API route returns feature flag configuration for the user
export async function POST(request: Request) {
  const body = await request.json();
  const { userId, userEmail } = body;

  // Evaluate flags with user context
  const newCheckoutEnabled = await newCheckout.decide?.({
    userId,
    userEmail,
  });

  const discountCodeEnabled = await discountCode.decide?.({
    userId,
    userEmail,
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
