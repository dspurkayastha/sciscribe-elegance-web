
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-sciscribe-navy">
              SciScribe<span className="text-sciscribe-gold">Solutions</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden space-x-8 md:flex">
            <a href="#about" className="nav-link text-sciscribe-navy">
              About
            </a>
            <a href="#services" className="nav-link text-sciscribe-navy">
              Services
            </a>
            <a href="#portfolio" className="nav-link text-sciscribe-navy">
              Portfolio
            </a>
            <a href="#testimonials" className="nav-link text-sciscribe-navy">
              Testimonials
            </a>
            <a href="#contact" className="nav-link text-sciscribe-navy">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-sciscribe-navy md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-4 pb-4 md:hidden">
            <a
              href="#about"
              className="border-b border-gray-100 py-2 text-sciscribe-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="border-b border-gray-100 py-2 text-sciscribe-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="border-b border-gray-100 py-2 text-sciscribe-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="#testimonials"
              className="border-b border-gray-100 py-2 text-sciscribe-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="py-2 text-sciscribe-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
