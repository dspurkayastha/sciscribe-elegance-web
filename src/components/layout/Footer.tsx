
import { Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-sciscribe-navy py-10 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Logo */}
          <div className="text-center md:text-left">
            <Link to="/">
              <h3 className="text-xl font-bold">
                SciScribe<span className="text-sciscribe-gold">Solutions</span>
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-300">
              Elevating research through expert editing
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/" className="hover:text-sciscribe-gold transition-colors duration-300">
              Home
            </Link>
            <Link to="/about" className="hover:text-sciscribe-gold transition-colors duration-300">
              About
            </Link>
            <Link to="/services" className="hover:text-sciscribe-gold transition-colors duration-300">
              Services
            </Link>
            <Link to="/pricing" className="hover:text-sciscribe-gold transition-colors duration-300">
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-sciscribe-gold transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-sciscribe-gold"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-sciscribe-gold"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} SciScribe Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
