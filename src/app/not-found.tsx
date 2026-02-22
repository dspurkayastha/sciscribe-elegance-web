import Link from 'next/link';
import { ArrowRight, FileQuestion } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sciscribe-navy/40 via-[#020817] to-black">
            {/* Subtle ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-sciscribe-blue/[0.05] rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <FileQuestion className="w-20 h-20 text-white/20 mb-8 stroke-[1]" />

                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    Fragment Not Found
                </h2>

                <p className="text-xl md:text-2xl font-light text-white/60 max-w-lg mb-12">
                    The manuscript or resource you are looking for has been moved or does not exist.
                </p>

                <Link
                    href="/"
                    className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
                >
                    <span className="flex items-center gap-4">
                        Return to Index
                        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
