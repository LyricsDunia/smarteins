import { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to scroll to section
  const scrollToSection = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  // Check if we're on the blog page
  const isBlogPage = location.pathname.startsWith('/blog');

  return (
    <header className="bg-white shadow-sm border-b border-[var(--border-color)]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo / Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gradient">
                Smarteins
              </Link>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium outline-none focus:outline-none ${
                  !isBlogPage 
                    ? 'text-[var(--primary-color)]' 
                    : 'text-[var(--text-primary)] hover:text-[var(--primary-color)]'
                }`}
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection('categories')}
                className="text-[var(--text-primary)] hover:text-[var(--primary-color)] active:text-[var(--primary-color)] px-3 py-2 text-sm font-medium bg-transparent border-0 cursor-pointer outline-none focus:outline-none"
              >
                Categories
              </button>
              <button
                onClick={() => scrollToSection('compare')}
                className="text-[var(--text-primary)] hover:text-[var(--primary-color)] active:text-[var(--primary-color)] px-3 py-2 text-sm font-medium bg-transparent border-0 cursor-pointer outline-none focus:outline-none"
              >
                Compare
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-[var(--text-primary)] hover:text-[var(--primary-color)] active:text-[var(--primary-color)] px-3 py-2 text-sm font-medium bg-transparent border-0 cursor-pointer outline-none focus:outline-none"
              >
                Reviews
              </button>
              <Link
                to="/blog"
                className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md outline-none focus:outline-none ${
                  isBlogPage
                    ? 'text-white bg-blue-700'
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Blogpost
              </Link>
            </div>
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <button className="btn-primary">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] outline-none focus:outline-none"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-[var(--border-color)]">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-base font-medium outline-none focus:outline-none ${
                !isBlogPage ? 'text-[var(--primary-color)]' : 'text-[var(--text-primary)]'
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection('categories')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-[var(--text-primary)] hover:text-[var(--primary-color)] active:text-[var(--primary-color)] bg-transparent border-0 outline-none focus:outline-none"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection('compare')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-[var(--text-primary)] hover:text-[var(--primary-color)] active:text-[var(--primary-color)] bg-transparent border-0 outline-none focus:outline-none"
            >
              Compare
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-[var(--text-primary)] hover:text-[var(--primary-color)] active:text-[var(--primary-color)] bg-transparent border-0 outline-none focus:outline-none"
            >
              Reviews
            </button>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 text-base font-medium outline-none focus:outline-none ${
                isBlogPage ? 'text-[var(--primary-color)]' : 'text-blue-600'
              }`}
            >
              Blogpost
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;