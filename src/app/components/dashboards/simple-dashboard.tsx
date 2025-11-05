"use client";

interface User {
  name: string;
  email: string;
  id: string;
}

interface SimpleDashboardProps {
  user: User;
}

const SimpleDashboard: React.FC<SimpleDashboardProps> = ({ user }) => {
  // Hardcoded data for testing
  const stats = {
    totalProjects: 12,
    activeUsers: 1423,
    revenue: "$24,891",
    growth: "+12%",
  };

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Feature Flag Notice */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 font-medium text-sm">
          📋 Simple Dashboard Experience
        </p>
        <p className="text-yellow-700 text-sm mt-1">
          You're seeing the basic dashboard. Some users get an enhanced version
          with more features.
        </p>
      </div>

      {/* Simple Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {stats.totalProjects}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {stats.activeUsers.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {stats.revenue}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Growth</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {stats.growth}
          </p>
        </div>
      </div>

      {/* Simple Activity Feed */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">Project completed</p>
                <p className="text-xs text-gray-500">4 hours ago</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900">
                  System maintenance scheduled
                </p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
