"use client";
import Clarity from '@microsoft/clarity';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const projectId = "rwq42hh9v5";
    if (typeof window !== 'undefined' && !(window as any).clarity) {
      try {
        Clarity.init(projectId);
      } catch (e) {
        console.error("Failed to init Clarity", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  // Zen Editorial Navigation Links
  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${isScrolled
        ? "py-4 glass-editorial"
        : "py-8 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">

          {/* Logo - Editorial Serif */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-serif text-white tracking-wide transition-opacity duration-300 hover:opacity-70">
              SciScribe
            </span>
          </Link>

          {/* Desktop Navigation - Stark, Minimal */}
          <div className="hidden space-x-12 md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[11px] uppercase tracking-[0.2em] font-mono transition-colors duration-500 ${isActive(link.path) ? "text-white" : "text-white/40 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-white md:hidden p-2 transition-transform duration-300 active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay Style */}
        <div className={`
          md:hidden fixed inset-0 bg-black/95 backdrop-blur-3xl transition-all duration-700 ease-[0.16,1,0.3,1] z-40 flex items-center justify-center
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}>
          <div className="flex flex-col space-y-8 items-center text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-4xl font-serif text-white/70 hover:text-white transition-colors duration-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-6 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
