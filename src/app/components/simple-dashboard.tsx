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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Testing Feature Banner - Only shows if flag is enabled */}
      {showTestingBanner && (
        <div className="mb-6 p-5 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl border border-blue-500/20">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl">🧪</span>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">
                Testing Feature Enabled!
              </h3>
              <p className="text-blue-100 text-sm">
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
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome, {user.name}! 👋
        </h1>
        <p className="text-gray-400 text-lg">Here's your dashboard overview</p>
      </div>

      {/* Three Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all hover:shadow-2xl"
          >
            <div className="flex items-center">
              <div
                className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl mr-4 shadow-lg`}
              >
                {stat.icon}
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Flag Status */}
      <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl">
        <h3 className="font-bold text-white mb-4 flex items-center text-lg">
          <span className="mr-2">🚩</span>
          Feature Flag Status
        </h3>
        <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
          <span className="text-sm font-medium text-gray-300">
            Testing Feature
          </span>
          <span
            className={`px-4 py-1.5 text-xs font-bold rounded-full ${
              showTestingBanner
                ? "bg-green-500/20 text-green-300 border border-green-500/50"
                : "bg-gray-700/50 text-gray-400 border border-gray-600/50"
            }`}
          >
            {showTestingBanner ? "ENABLED" : "DISABLED"}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          User Email:{" "}
          <code className="bg-gray-900/50 px-2 py-1 rounded text-gray-300 font-mono">
            {user.email}
          </code>
        </p>
      </div>
    </div>
  );
};

export default SimpleDashboard;
