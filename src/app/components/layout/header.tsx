"use client";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
  } | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <div className="shrink-0 flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-xl">🚩</span>
              </div>
              <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Dashboard App
              </h1>
            </div>
          </div>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
