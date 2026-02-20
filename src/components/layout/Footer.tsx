import { Linkedin, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12 relative z-10">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                SciScribe<span className="text-accent font-light">Solutions</span>
              </h3>
            </Link>
            <p className="text-foreground/70 text-balance max-w-md font-light">
              Elevating scientific research and medical communications through expert, precise, and sophisticated editing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col space-y-3">
            <h4 className="font-medium text-foreground mb-2">Platform</h4>
            <Link href="/about" className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300">About</Link>
            <Link href="/services" className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300">Services</Link>
            <Link href="/portfolio" className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300">Portfolio</Link>
            <Link href="/pricing" className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300">Pricing</Link>
          </div>

          {/* Connect & Legal */}
          <div className="col-span-1 flex flex-col space-y-3">
            <h4 className="font-medium text-foreground mb-2">Connect</h4>
            <Link href="/contact" className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300">Contact Us</Link>

            <div className="flex space-x-4 pt-4">
              <a href="https://www.linkedin.com/company/sciscribe-solutions/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576386514296" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/sciscribesolutions_ig/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 border-t border-border pt-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 text-xs text-foreground/50">
          <p>&copy; {new Date().getFullYear()} SciScribe Solutions. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
