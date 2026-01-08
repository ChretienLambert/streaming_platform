import { Link } from 'react-router-dom';
import { Mail, Twitter, Facebook, Instagram, Youtube, Heart, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-black to-gray-900 border-t border-gray-800 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-red-900/50 via-purple-900/50 to-pink-900/50 rounded-2xl p-8 mb-12 border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Stay Connected
                </span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get the latest updates on new releases, exclusive content, and special offers delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-full focus:outline-none focus:ring-4 focus:ring-red-600/50 transition-all"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 rounded-full font-semibold hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Brand */}
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-6 flex items-center gap-2">
              StreamHub
              <Heart className="w-6 h-6 text-red-500" />
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your all-in-one destination for unlimited videos and music streaming. 
              Enjoy premium entertainment anytime, anywhere.
            </p>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">SH</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Videos</span>
                </Link>
              </li>
              <li>
                <Link to="/music" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Music</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Plans & Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Terms of Service</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition flex items-center gap-2">
                  <span>Privacy Policy</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Follow Us</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transform hover:scale-110 transition-all duration-300">
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transform hover:scale-110 transition-all duration-300">
                <Facebook className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transform hover:scale-110 transition-all duration-300">
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transform hover:scale-110 transition-all duration-300">
                <Youtube className="w-6 h-6 text-white" />
              </a>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6">
              <p className="text-sm text-gray-400 mb-3">Need help?</p>
              <a href="#" className="text-red-400 hover:text-red-300 font-semibold text-sm">
                Contact Support →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-gray-500">
                &copy; {new Date().getFullYear()} StreamHub. All rights reserved.
              </p>
              <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                Made with 
                <Heart className="w-4 h-4 text-red-500" />
                for the ultimate streaming experience
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                App Store
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Google Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;