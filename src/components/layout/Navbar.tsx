
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "dark:bg-sciscribe-navy/80 bg-white/95 shadow-sm backdrop-blur-sm" 
          : "dark:bg-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold dark:text-white text-sciscribe-navy">
              SciScribe<span className="text-sciscribe-gold">Solutions</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden space-x-8 md:flex">
            <Link 
              to="/about" 
              className={`nav-link dark:text-white text-sciscribe-navy ${isActive('/about') ? 'after:w-full' : ''}`}>
              About
            </Link>
            <Link 
              to="/services" 
              className={`nav-link dark:text-white text-sciscribe-navy ${isActive('/services') ? 'after:w-full' : ''}`}>
              Services
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link dark:text-white text-sciscribe-navy ${isActive('/portfolio') ? 'after:w-full' : ''}`}>
              Portfolio
            </Link>
            <Link 
              to="/pricing" 
              className={`nav-link dark:text-white text-sciscribe-navy ${isActive('/pricing') ? 'after:w-full' : ''}`}>
              Pricing
            </Link>
            <Link 
              to="/payment" 
              className={`nav-link dark:text-white text-sciscribe-navy ${isActive('/payment') ? 'after:w-full' : ''}`}>
              Payment
            </Link>
            <Link 
              to="/feedback" 
              className={`nav-link dark:text-white text-sciscribe-navy ${isActive('/feedback') ? 'after:w-full' : ''}`}>
              Feedback
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link dark:text-white text-sciscribe-navy ${isActive('/contact') ? 'after:w-full' : ''}`}>
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              className="dark:text-white text-sciscribe-navy md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-4 pb-4 md:hidden dark:bg-sciscribe-navy/90 dark:backdrop-blur-md">
            <Link
              to="/about"
              className="border-b border-gray-100 dark:border-gray-700 py-2 text-sciscribe-navy dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="border-b border-gray-100 dark:border-gray-700 py-2 text-sciscribe-navy dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className="border-b border-gray-100 dark:border-gray-700 py-2 text-sciscribe-navy dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              to="/pricing"
              className="border-b border-gray-100 dark:border-gray-700 py-2 text-sciscribe-navy dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/payment"
              className="border-b border-gray-100 dark:border-gray-700 py-2 text-sciscribe-navy dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Payment
            </Link>
            <Link
              to="/feedback"
              className="border-b border-gray-100 dark:border-gray-700 py-2 text-sciscribe-navy dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            <Link
              to="/contact"
              className="py-2 text-sciscribe-navy dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
