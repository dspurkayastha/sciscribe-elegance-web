
import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sciscribe-navy py-10 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">
              SciScribe<span className="text-sciscribe-gold">Solutions</span>
            </h3>
            <p className="mt-1 text-sm text-gray-300">
              Elevating research through expert editing
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-sciscribe-gold">
              Home
            </a>
            <a href="#about" className="hover:text-sciscribe-gold">
              About
            </a>
            <a href="#services" className="hover:text-sciscribe-gold">
              Services
            </a>
            <a href="#portfolio" className="hover:text-sciscribe-gold">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-sciscribe-gold">
              Contact
            </a>
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-sciscribe-gold"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
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
