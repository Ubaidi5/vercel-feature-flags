"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const isAuthenticated = localStorage.getItem("isAuthenticated");

      if (user && isAuthenticated) {
        // User is logged in, redirect to dashboard
        router.push("/dashboard");
      } else {
        // User is not logged in, redirect to login
        router.push("/login");
      }
    };

    // Small delay to prevent flash
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  // Loading screen
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Dashboard App
        </h1>
        <p className="text-gray-600">Powered by Vercel Feature Flags</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
      </div>
    </div>
  );
}
