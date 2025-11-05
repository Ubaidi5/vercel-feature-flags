"use client";

interface User {
  name: string;
  email: string;
  id: string;
}

interface SimpleDashboardProps {
  user: User;
  showTestingBanner: boolean;
}

const SimpleDashboard: React.FC<SimpleDashboardProps> = ({
  user,
  showTestingBanner,
}) => {
  // Simple hardcoded data for the 3 cards
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Active Projects",
      value: "42",
      icon: "📊",
      color: "bg-green-500",
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: "💰",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6">
      {/* Testing Feature Banner - Only shows if flag is enabled */}
      {showTestingBanner && (
        <div className="mb-6 p-4 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🧪</span>
            <div>
              <h3 className="font-bold text-lg">Testing Feature Enabled!</h3>
              <p className="text-blue-100">
                This banner is controlled by the "testing-feature" flag. You're
                seeing this because the feature flag is enabled for your
                account.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your simple dashboard overview.
        </p>
      </div>

      {/* Three Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center">
              <div
                className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-4`}
              >
                {stat.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Flag Status */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          🚩 Feature Flag Status
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Testing Feature</span>
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              showTestingBanner
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {showTestingBanner ? "ENABLED" : "DISABLED"}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          User Email:{" "}
          <code className="bg-gray-200 px-1 rounded">{user.email}</code>
        </p>
      </div>
    </div>
  );
};

export default SimpleDashboard;
