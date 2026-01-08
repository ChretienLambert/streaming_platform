import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 py-4 px-6 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-red-600 hover:text-red-500 transition"
            onClick={closeMobileMenu}
          >
            StreamHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-lg">
            <Link to="/" className="hover:text-red-500 transition">
              Home
            </Link>
            <Link to="/videos" className="hover:text-red-500 transition">
              Videos
            </Link>
            <Link to="/music" className="hover:text-red-500 transition">
              Music
            </Link>
            <Link to="/about" className="hover:text-red-500 transition">
              About
            </Link>

            {/* Desktop Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, shows, music..."
                className={`w-80 pl-12 pr-6 py-3 bg-gray-800/80 rounded-full focus:outline-none focus:ring-4 focus:ring-red-600/50 transition-all duration-300 backdrop-blur ${
                  searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible w-0'
                }`}
              />
              <button
                type="submit"
                onClick={() => !searchQuery && setSearchOpen(true)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                <Search size={22} />
              </button>
            </form>

            {/* Auth Links */}
            {user ? (
              <>
                <span className="text-gray-300">Hello, {user.name.split(' ')[0]}!</span>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="bg-gray-800 px-6 py-2.5 rounded-full hover:bg-gray-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-red-500 transition">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-red-600 px-6 py-2.5 rounded-full hover:bg-red-700 transform hover:scale-105 transition shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-80 bg-black/98 backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold text-red-600">StreamHub</h2>
            <button
              onClick={closeMobileMenu}
              className="text-3xl text-white hover:text-red-500 transition"
            >
              ×
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="p-6 border-b border-gray-800">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full pl-12 pr-6 py-4 bg-gray-800 rounded-full focus:outline-none focus:ring-4 focus:ring-red-600/50 transition"
                autoFocus
              />
              <button
                type="submit"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={22} />
              </button>
            </form>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 p-6 space-y-6 text-xl">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block hover:text-red-500 transition py-2"
            >
              Home
            </Link>
            <Link
              to="/videos"
              onClick={closeMobileMenu}
              className="block hover:text-red-500 transition py-2"
            >
              Videos
            </Link>
            <Link
              to="/music"
              onClick={closeMobileMenu}
              className="block hover:text-red-500 transition py-2"
            >
              Music
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="block hover:text-red-500 transition py-2"
            >
              About
            </Link>

            {user ? (
              <>
                <div className="border-t border-gray-700 pt-6">
                  <p className="text-gray-300 mb-4">Hello, {user.name.split(' ')[0]}!</p>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full bg-gray-800 py-4 rounded-full hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block hover:text-red-500 transition py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block bg-red-600 text-center py-4 rounded-full hover:bg-red-700 transition shadow-lg"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Navbar;