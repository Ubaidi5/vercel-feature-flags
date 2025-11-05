"use client";

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const menuItems = [
    { icon: "📊", label: "Overview", href: "/dashboard", active: true },
    { icon: "📈", label: "Analytics", href: "#", active: false },
    { icon: "👥", label: "Users", href: "#", active: false },
    { icon: "💼", label: "Projects", href: "#", active: false },
    { icon: "�", label: "Checkout Demo", href: "/checkout", active: false },
    { icon: "�🔧", label: "Settings", href: "#", active: false },
    { icon: "🚩", label: "Feature Flags", href: "/admin/flags", active: false },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <span className="sr-only">Close sidebar</span>✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${
                      item.active
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Feature Flag Indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs font-medium text-green-800">
              🚩 Feature Flags Active
            </p>
            <p className="text-xs text-green-600 mt-1">
              Dashboard variant and other features are being A/B tested
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
