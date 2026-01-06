const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Column 1 - Brand */}
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-6">StreamHub</h2>
            <p className="text-gray-400 leading-relaxed">
              Your all-in-one destination for unlimited videos and music streaming. 
              Enjoy premium entertainment anytime, anywhere.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-gray-400 hover:text-red-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/videos" className="text-gray-400 hover:text-red-500 transition">
                  Videos
                </a>
              </li>
              <li>
                <a href="/music" className="text-gray-400 hover:text-red-500 transition">
                  Music
                </a>
              </li>
              <li>
                <a href="/subscription" className="text-gray-400 hover:text-red-500 transition">
                  Plans & Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Stay Connected</h3>
            <div className="flex space-x-8 mb-8">
              {/* X (Twitter) */}
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                <img src="https://graphically.io/wp-content/uploads/2025/11/2.jpg" alt="X (Twitter)" className="w-8 h-8" />
              </a>
              {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/008/385/720/small/facebook-social-media-icon-logo-symbol-design-illustration-free-vector.jpg" alt="Facebook" className="w-8 h-8" />
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                <img src="https://cdn.vectorstock.com/i/500p/52/12/instagram-icon-symbol-vector-42845212.jpg" alt="Instagram" className="w-8 h-8" />
              </a>
              {/* YouTube */}
              <a href="#" className="text-gray-400 hover:text-white transition transform hover:scale-110">
                <img src="https://www.logo.wine/a/logo/YouTube/YouTube-Icon-White-Dark-Background-Logo.wine.svg" alt="YouTube" className="w-8 h-8" />
              </a>
            </div>
            <p className="text-gray-400 mb-4">Subscribe for updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className="px-6 py-3 bg-red-600 rounded-r-lg hover:bg-red-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} StreamHub. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Made with ❤️ for the ultimate streaming experience
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;