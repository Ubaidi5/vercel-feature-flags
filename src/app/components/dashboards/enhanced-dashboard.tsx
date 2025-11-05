"use client";

interface User {
  name: string;
  email: string;
  id: string;
}

interface EnhancedDashboardProps {
  user: User;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ user }) => {
  // Hardcoded enhanced data for testing
  const stats = {
    totalProjects: 12,
    activeUsers: 1423,
    revenue: "$24,891",
    growth: "+12%",
    conversion: "3.2%",
    bounceRate: "42%",
  };

  const recentProjects = [
    { name: "E-commerce App", status: "In Progress", progress: 75, team: 4 },
    { name: "Mobile Dashboard", status: "Review", progress: 90, team: 6 },
    { name: "API Integration", status: "Planning", progress: 25, team: 3 },
  ];

  const teamPerformance = [
    { name: "Alice Johnson", role: "Frontend Dev", tasks: 12, completed: 10 },
    { name: "Bob Smith", role: "Backend Dev", tasks: 8, completed: 8 },
    { name: "Carol White", role: "Designer", tasks: 6, completed: 5 },
  ];

  return (
    <div className="p-6">
      {/* Enhanced Dashboard Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name}! 🚀
            </h1>
            <p className="text-gray-600 mt-1">
              Here's your comprehensive overview with advanced insights.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              📊 Generate Report
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>

      {/* Feature Flag Notice */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-medium text-sm">
          ✨ Enhanced Dashboard Experience
        </p>
        <p className="text-green-700 text-sm mt-1">
          You're part of our beta group! Enjoy advanced analytics, team
          insights, and interactive charts.
        </p>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-90">Total Projects</h3>
              <p className="text-2xl font-bold mt-2">{stats.totalProjects}</p>
            </div>
            <div className="text-2xl opacity-80">📁</div>
          </div>
        </div>

        <div className="bg-linear-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-90">Active Users</h3>
              <p className="text-2xl font-bold mt-2">
                {stats.activeUsers.toLocaleString()}
              </p>
            </div>
            <div className="text-2xl opacity-80">👥</div>
          </div>
        </div>

        <div className="bg-linear-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-90">Revenue</h3>
              <p className="text-2xl font-bold mt-2">{stats.revenue}</p>
            </div>
            <div className="text-2xl opacity-80">💰</div>
          </div>
        </div>

        <div className="bg-linear-to-r from-yellow-500 to-orange-500 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-90">Growth</h3>
              <p className="text-2xl font-bold mt-2">{stats.growth}</p>
            </div>
            <div className="text-2xl opacity-80">📈</div>
          </div>
        </div>

        <div className="bg-linear-to-r from-indigo-500 to-indigo-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-90">Conversion</h3>
              <p className="text-2xl font-bold mt-2">{stats.conversion}</p>
            </div>
            <div className="text-2xl opacity-80">🎯</div>
          </div>
        </div>

        <div className="bg-linear-to-r from-red-500 to-pink-500 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-90">Bounce Rate</h3>
              <p className="text-2xl font-bold mt-2">{stats.bounceRate}</p>
            </div>
            <div className="text-2xl opacity-80">⏱️</div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Projects Card */}
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              🚀 Recent Projects
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : project.status === "Review"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>👥 {project.team} team members</span>
                    <span>{project.progress}% complete</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Performance Card */}
        <div className="bg-white rounded-lg shadow-lg border">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              👨‍💼 Team Performance
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {member.completed}/{member.tasks} tasks
                    </p>
                    <p className="text-xs text-gray-500">
                      {Math.round((member.completed / member.tasks) * 100)}%
                      complete
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg border">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-900">
            ⚡ Quick Actions
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium text-blue-900">
                Create Report
              </div>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
              <div className="text-2xl mb-2">➕</div>
              <div className="text-sm font-medium text-green-900">
                New Project
              </div>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-medium text-purple-900">
                Invite Team
              </div>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium text-orange-900">
                Settings
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
