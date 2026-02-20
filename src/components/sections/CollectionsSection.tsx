"use client";

import { motion } from "framer-motion";

const CollectionsSection = () => {
    return (
        <section className="relative w-full py-20 text-[#E6D5B8] z-10 px-6 md:px-12 mix-blend-plus-lighter">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

                    {/* Latest Breakthroughs - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col"
                    >
                        <h2 className="text-xl md:text-2xl font-serif tracking-widest mb-6">
                            LATEST <br />
                            BREAKTHROUGHS
                        </h2>
                        <div className="relative w-full aspect-[16/9] md:aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer border border-white/10 bg-black/20 backdrop-blur-md">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                            {/* Fake content for demonstration as per the design mock */}
                            <div className="absolute bottom-6 left-8 right-8 z-20 transition-transform duration-500 group-hover:translate-y-[-10px]">
                                <p className="text-sm md:text-base font-light opacity-80 leading-relaxed max-w-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                                </p>
                                <div className="mt-4 w-12 h-[1px] bg-[#E6D5B8]/50 transition-all duration-500 group-hover:w-24 group-hover:bg-[#E6D5B8]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Curated Collections - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <h2 className="text-xl md:text-2xl font-serif tracking-widest mb-6">
                            CURATED <br />
                            COLLECTIONS
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Collection Card 1 */}
                            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden group cursor-pointer border border-white/10 bg-black/20 backdrop-blur-md flex flex-col justify-end p-6">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-xs font-serif opacity-90 leading-snug">
                                        SciScribe: Award Winning Platform for Elevated
                                        Research & Narrative
                                    </p>
                                </div>
                            </div>

                            {/* Collection Card 2 */}
                            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden group cursor-pointer border border-white/10 bg-black/20 backdrop-blur-md flex flex-col justify-end p-6">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[10px] tracking-widest uppercase opacity-60 mb-2">Editor's Pick</p>
                                    <p className="text-xs font-serif opacity-90 leading-snug">
                                        MEET THE EDITORS<br />
                                        <span className="opacity-50 text-[10px] font-sans">Meet Gordon & Associates</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Minimalist Award Badges (Simulated) */}
                        <div className="mt-12 flex items-center gap-6 opacity-30">
                            <div className="w-12 h-12 rounded-full border border-dashed border-[#E6D5B8]/40 flex items-center justify-center text-[8px] text-center p-1">AWARD 2024</div>
                            <div className="w-12 h-12 rounded-full border border-dashed border-[#E6D5B8]/40 flex items-center justify-center text-[8px] text-center p-1">AWM 2024</div>
                            <div className="w-12 h-12 rounded-full border border-dashed border-[#E6D5B8]/40 flex items-center justify-center text-[8px] text-center p-1">CSS DA</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default CollectionsSection;
