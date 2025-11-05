"use client";

import { useEffect, useState } from "react";
import { NewCheckout, LegacyCheckout } from "@/app/components/checkouts";

interface CheckoutConfig {
  flags: {
    newCheckout: boolean;
    discountCode: boolean;
  };
  userId: string;
}

export default function CheckoutPage() {
  const [config, setConfig] = useState<CheckoutConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");

  // Mock user data - in real app, get from auth
  const userId = "user-" + Math.random().toString(36).substr(2, 9);
  const userEmail = "user@example.com";

  useEffect(() => {
    // Fetch feature flag configuration from server
    const fetchConfig = async () => {
      const response = await fetch("/api/checkout/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userEmail }),
      });

      const data = await response.json();
      setConfig(data);

      // Store flag info in DOM for Web Analytics integration
      document.documentElement.setAttribute(
        "data-flags",
        JSON.stringify(data.flags)
      );

      setLoading(false);
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading checkout...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Navigation */}
        <div className="mb-6">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Home
          </a>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Checkout</h1>
        <p className="text-sm text-slate-500 mb-8">
          User ID:{" "}
          <code className="bg-slate-100 px-2 py-1 rounded">
            {config?.userId}
          </code>
        </p>

        {config?.flags?.newCheckout ? (
          <NewCheckout
            discountCodeEnabled={config?.flags?.discountCode ?? false}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
          />
        ) : (
          <LegacyCheckout
            discountCodeEnabled={config?.flags?.discountCode ?? false}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
          />
        )}

        <div className="mt-8 p-4 bg-slate-50 rounded border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">
            Feature Flags Active:
          </h3>
          <ul className="space-y-1 text-sm text-slate-700">
            <li>
              ✓ New Checkout:{" "}
              <span
                className={
                  config?.flags?.newCheckout
                    ? "text-green-600 font-bold"
                    : "text-gray-400"
                }
              >
                {config?.flags?.newCheckout ? "ENABLED" : "DISABLED"}
              </span>
            </li>
            <li>
              ✓ Discount Code:{" "}
              <span
                className={
                  config?.flags?.discountCode
                    ? "text-green-600 font-bold"
                    : "text-gray-400"
                }
              >
                {config?.flags.discountCode ? "ENABLED" : "DISABLED"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
