"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header, Footer, Sidebar } from "@/app/components/layout";
import {
  SimpleDashboard,
  EnhancedDashboard,
} from "@/app/components/dashboards";

interface User {
  id: string;
  name: string;
  email: string;
}

interface DashboardConfig {
  flags: {
    enhancedDashboard: boolean;
    advancedAnalytics: boolean;
    betaFeatures: boolean;
    testingFeature: boolean;
  };
  userId: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [config, setConfig] = useState<DashboardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will redirect to login in useEffect
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header user={user} onLogout={handleLogout} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Mobile menu button */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <span className="sr-only">Open sidebar</span>☰
            </button>
          </div>

          {/* Dashboard Content */}
          <div className="bg-gray-50 min-h-full">
            {config?.flags?.enhancedDashboard ? (
              <EnhancedDashboard user={user} />
            ) : (
              <SimpleDashboard user={user} />
            )}
          </div>

          {/* Feature Flag Status Panel */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-7xl mx-auto">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span className="flex items-center">
                    🚩 Feature Flags Status
                    <span className="ml-2 text-xs text-gray-500">
                      (Click to expand)
                    </span>
                  </span>
                  <span className="group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm font-medium">
                        Enhanced Dashboard
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          config?.flags?.enhancedDashboard
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {config?.flags?.enhancedDashboard
                          ? "ENABLED"
                          : "DISABLED"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm font-medium">
                        Advanced Analytics
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          config?.flags?.advancedAnalytics
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {config?.flags?.advancedAnalytics
                          ? "ENABLED"
                          : "DISABLED"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm font-medium">Beta Features</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          config?.flags?.betaFeatures
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {config?.flags?.betaFeatures ? "ENABLED" : "DISABLED"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded border">
                      <span className="text-sm font-medium">
                        Testing Feature
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          config?.flags?.testingFeature
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {config?.flags?.testingFeature ? "TESTING" : "DISABLED"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-500">
                    User ID:{" "}
                    <code className="bg-gray-200 px-1 rounded">
                      {config?.userId}
                    </code>
                  </p>
                </div>
              </details>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
