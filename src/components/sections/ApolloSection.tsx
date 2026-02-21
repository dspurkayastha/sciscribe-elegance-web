"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";

const features = [
    "AI-Assisted Thesis Drafting",
    "Built-In Statistical Analysis",
    "Automated Citation Management",
    "Expert QA Included — Free",
];

const ApolloSection = () => {
    return (
        <section className="relative w-full py-48 border-t border-white/10 overflow-hidden">

            {/* Subtle radial glow */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">

                    {/* Left — Text Content */}
                    <motion.div
                        className="w-full md:w-3/5 flex flex-col items-start"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            Introducing
                        </span>

                        <h2 className="text-[12vw] md:text-[6vw] font-serif leading-[0.85] tracking-tighter text-white select-none mb-6">
                            Apollo
                        </h2>
                        <p className="text-3xl md:text-4xl font-serif italic text-white/60 leading-tight mb-12">
                            From Synopsis to Submission.
                        </p>

                        <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl leading-relaxed mb-6">
                            Your personal research assistant that never sleeps. Apollo takes you from synopsis to submission — so you can focus on the science, not the formatting.
                        </p>
                        <p className="text-lg font-light text-white/50 max-w-2xl leading-relaxed mb-16">
                            Powered by frontier models fine-tuned for scientific writing, with expert supervision and QA from our editorial team at no additional cost.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <a
                                href="https://apollo.sciscribesolutions.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
                            >
                                <span className="flex items-center gap-4">
                                    Try Apollo
                                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                                </span>
                            </a>
                            <a
                                href="https://apollo.sciscribesolutions.com/#pricing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-white/50 border border-white/10 hover:bg-white/[0.05] hover:text-white transition-all duration-500"
                            >
                                View Apollo Pricing
                            </a>
                        </div>
                    </motion.div>

                    {/* Right — Features Card */}
                    <motion.div
                        className="w-full md:w-2/5 flex items-stretch"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <div className="w-full bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-1000">
                            <GraduationCap className="w-10 h-10 stroke-[1] text-white/30 mb-10" />
                            <h3 className="text-2xl font-serif text-white mb-10">What Apollo Offers</h3>
                            <ul className="space-y-6">
                                {features.map((feat, i) => (
                                    <li key={feat} className="flex items-start group/item">
                                        <span className="mr-8 text-white/40 font-mono text-sm mt-1 transition-colors duration-500 group-hover/item:text-white/80">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-lg text-white/90 font-light group-hover/item:text-white transition-colors duration-500">
                                            {feat}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="absolute bottom-12 right-12 font-serif text-[8rem] text-white/[0.03] select-none leading-none">
                                α
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Disclaimer — Bottom Left */}
            <div className="container mx-auto px-6 max-w-7xl relative z-10 mt-16">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider max-w-xl leading-relaxed">
                    ⚠ AI-generated content must be verified by the responsible authority before submission or publication.
                </p>
            </div>

        </section>
    );
};

export default ApolloSection;
