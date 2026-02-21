'use client';

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Blog', path: '/blog' },
        { name: 'Feedback', path: '/feedback' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="fixed left-0 top-0 bottom-0 w-32 md:w-48 z-50 flex flex-col justify-between py-12 px-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {/* Top Logo */}
            <div>
                <Link href="/" className="block group">
                    <div className="flex flex-col items-start transition-opacity duration-300 hover:opacity-70">
                        <span className="text-2xl md:text-3xl font-serif tracking-tight leading-none italic">
                            SciScribe
                        </span>
                        <span className="text-[9px] md:text-[10px] font-mono tracking-[0.35em] text-white/40 uppercase mt-1.5">
                            Solutions
                        </span>
                    </div>
                </Link>
            </div>

            {/* Middle Links */}
            <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`text-xs md:text-sm font-medium tracking-widest transition-colors ${isActive(link.path) ? "text-white" : "text-white/70 hover:text-white"
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Bottom Search Icon */}
            <div>
                <button className="p-2 -ml-2 text-white/50 hover:text-white transition-colors" aria-label="Search">
                    <Search size={20} strokeWidth={1.5} />
                </button>
            </div>
        </nav>
    );
}
