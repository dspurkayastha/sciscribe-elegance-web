"use client";
import Clarity from '@microsoft/clarity';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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
      // Sleek detection: switch to glass block after 50px
      if (window.scrollY > 50) {
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

  // Zen Modular Navigation Links
  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${isScrolled
        ? "py-3 glass-apple shadow-apple mx-4 mt-4 rounded-3xl"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-semibold tracking-tight text-foreground transition-all duration-300 group-hover:opacity-80">
              SciScribe<span className="text-accent font-light">Solutions</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden space-x-8 md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative py-2 text-sm font-medium transition-colors duration-300 ${isActive(link.path) ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-t-sm" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="text-foreground md:hidden p-2 transition-transform active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}
        `}>
          <div className="flex flex-col space-y-4 pb-4 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="py-2 text-base font-medium text-foreground/80 hover:text-foreground border-b border-border/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
