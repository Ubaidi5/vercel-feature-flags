"use client";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © 2025 Dashboard App. Built with Vercel Feature Flags.
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Support
            </a>
          </div>
        </div>

        {/* Feature Flag Status */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            Feature flags powered by Vercel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
