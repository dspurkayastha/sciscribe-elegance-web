"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ApolloPromoBanner() {
    return (
        <section className="w-full py-16 relative overflow-hidden my-24 border-y border-border/40">
            {/* Background with Apple-like blurred gradients */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-sciscribe-navy via-sciscribe-dark to-black" />
            <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-sciscribe-blue/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[150%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Mesh Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
                >
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-white/90">Introducing Apollo by SciScribe</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-white mb-6 text-balance"
                >
                    Master your thesis with <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-sciscribe-gold">expert assistance.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl text-lg md:text-xl text-white/70 font-light mb-10 text-balance"
                >
                    Struggling with your dissertation or thesis? Apollo pairs you with elite academic strategists to guide your research, writing, and defense preparation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link
                        href="https://apollo.sciscribesolutions.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-black bg-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
                    >
                        <span>Explore Apollo Services</span>
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
