"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  // Mock authentication - in real app, this would be an API call
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication logic
    if (email && password.length >= 6) {
      const mockUser = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0].replace(/[^a-zA-Z]/g, ""),
        email: email,
      };

      // Store user in localStorage (in real app, use secure tokens)
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setError(
        "Invalid email or password. Password must be at least 6 characters."
      );
    }

    setLoading(false);
  };

  // Demo login function
  const handleDemoLogin = () => {
    setEmail("demo@example.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-3xl">🚩</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400">
            Access your dashboard and explore feature flags
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl px-8 py-8">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-900/50 border border-gray-600 text-white rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              <p className="mt-2 text-xs text-gray-400">
                Minimum 6 characters required
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-white shadow-lg transition-all ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          {/* Demo Section */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">
                Want to try the demo?
              </p>
              <button
                onClick={handleDemoLogin}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                Fill demo credentials →
              </button>
            </div>
          </div>

          {/* Feature Flag Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-300 mb-2 flex items-center">
              <span className="mr-2">🚩</span>
              About Feature Flags
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              After login, you'll experience either a simple or enhanced
              dashboard based on feature flag evaluation. This demonstrates A/B
              testing capabilities.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            This is a demo application showcasing Vercel Feature Flags
          </p>
        </div>
      </div>
    </div>
  );
}
