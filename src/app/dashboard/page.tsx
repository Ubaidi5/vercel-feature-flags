"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header, Footer } from "@/app/components/layout";
import SimpleDashboard from "@/app/components/simple-dashboard";

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardConfig {
  flags: {
    testingFeature: boolean;
  };
  userId: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!userData || !isAuthenticated) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Fetch feature flag configuration
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/dashboard/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: parsedUser.id,
            userEmail: parsedUser.email,
          }),
        });

        const data = await response.json();
        setConfig(data);

        // Store flag info in DOM for Web Analytics integration
        document.documentElement.setAttribute(
          "data-flags",
          JSON.stringify(data.flags)
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard config:", error);
        setLoading(false);
      }
    };

    fetchConfig();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will redirect to login in useEffect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col">
      {/* Header */}
      <Header user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1">
        <SimpleDashboard
          user={user}
          showTestingBanner={config?.flags?.testingFeature || false}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
