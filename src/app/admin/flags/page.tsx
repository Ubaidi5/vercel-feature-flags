"use client";

import { useState } from "react";

export default function FlagsAdminPage() {
  const [testUserId, setTestUserId] = useState("user-12345");
  const [testEmail, setTestEmail] = useState("admin@example.com");
  const [flagResult, setFlagResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testFlags = async () => {
    setLoading(true);
    const response = await fetch("/api/checkout/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: testUserId,
        userEmail: testEmail,
      }),
    });

    const data = await response.json();
    setFlagResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Feature Flags Admin Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Test Flag Evaluation
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Test User ID
              </label>
              <input
                type="text"
                value={testUserId}
                onChange={(e) => setTestUserId(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="user-12345"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Test Email
              </label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="user@example.com"
              />
              <p className="text-xs text-slate-500 mt-2">
                Beta tester emails: admin@example.com, beta@example.com
              </p>
            </div>

            <button
              onClick={testFlags}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-2 rounded transition"
            >
              {loading ? "Testing..." : "Test Flags"}
            </button>
          </div>

          {flagResult && (
            <div className="bg-slate-50 p-6 rounded border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">Results:</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">User ID:</p>
                  <code className="bg-white px-3 py-1 rounded border border-slate-200 text-sm font-mono">
                    {flagResult.userId}
                  </code>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-2">
                    Flags Status:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-200">
                      <span className="font-medium text-slate-700">
                        new-checkout
                      </span>
                      <span
                        className={`px-3 py-1 rounded font-bold text-sm ${
                          flagResult.flags.newCheckout
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {flagResult.flags.newCheckout ? "ENABLED" : "DISABLED"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-200">
                      <span className="font-medium text-slate-700">
                        discount-code
                      </span>
                      <span
                        className={`px-3 py-1 rounded font-bold text-sm ${
                          flagResult.flags.discountCode
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {flagResult.flags.discountCode ? "ENABLED" : "DISABLED"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            How Flag Targeting Works
          </h2>
          <div className="space-y-4 text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Strategy 1: Beta Testers
              </h3>
              <p>
                If the user email is in the beta tester list (admin@example.com,
                beta@example.com), they ALWAYS get the new feature.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Strategy 2: Gradual Rollout (30%)
              </h3>
              <p>
                For regular users, we hash their User ID and use modulo math to
                consistently assign them to either new or old experience.
                Currently 30% of users get the new checkout.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded border border-blue-200 mt-4">
              <p className="text-sm font-mono text-blue-900">
                Try these emails to see different flag combinations:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-blue-800 font-mono">
                <li>✓ admin@example.com → New Checkout: ENABLED</li>
                <li>✓ beta@example.com → New Checkout: ENABLED</li>
                <li>
                  ✓ user@example.com → Depends on user ID hash (30% chance)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
