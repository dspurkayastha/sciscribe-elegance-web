import { Linkedin, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-transparent pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 flex flex-col h-full justify-end">

        {/* Massive Typographic Statement */}
        <div className="mb-24 md:mb-32 max-w-5xl">
          <h2 className="font-serif text-[12vw] leading-[0.9] tracking-tighter text-white/90">
            Elegance <br />
            <span className="text-white/40 italic">in every word.</span>
          </h2>
        </div>

        {/* Minimal Grid for Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">

          <div className="flex flex-col space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Sitemap</span>
            <div className="flex flex-col space-y-3">
              <Link href="/services" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Services</Link>
              <Link href="/pricing" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Pricing</Link>
              <Link href="/blog" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Blog</Link>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Connect</span>
            <div className="flex flex-col space-y-3">
              <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Contact</Link>
              <a href="https://www.linkedin.com/company/sciscribe-solutions" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/sciscribesolutions_ig/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">Legal</span>
            <div className="flex flex-col space-y-3">
              <Link href="/privacy" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Terms of Service</Link>
              <Link href="/refund" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Refund Policy</Link>
            </div>
          </div>

          {/* Final Sign-off */}
          <div className="flex flex-col space-y-6 md:items-end justify-between h-full">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/40">© {new Date().getFullYear()}</span>
            <Link href="/" className="inline-block mt-auto">
              <h3 className="text-xl font-serif tracking-tight text-white">
                SciScribe
              </h3>
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
