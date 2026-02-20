"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/mock-blog";
import { ArrowUpRight } from "lucide-react";

interface BlogContentProps {
    posts: BlogPost[];
}

export default function BlogContent({ posts }: BlogContentProps) {
    return (
        <main className="flex flex-col relative w-full overflow-hidden z-10 pt-32 md:pt-48 pb-24 min-h-screen">
            <div className="container mx-auto px-6 md:px-12">

                {/* Massive Page Header */}
                <motion.div
                    className="mb-32 md:mb-48 max-w-5xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.9] tracking-tighter text-white">
                        Insights <br />
                        <span className="italic text-white/50">& Resources.</span>
                    </h1>
                    <p className="mt-8 text-lg md:text-xl font-light text-white/50 max-w-2xl text-balance">
                        Peer-reviewed perspectives on academic writing, journal submission, and the unseen friction within modern publishing.
                    </p>
                </motion.div>

                {/* Dense Typographic Index */}
                <div className="border-t border-white/20">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link href={`/blog/${post.slug}`} className="group block w-full">
                                <div className="flex flex-col lg:flex-row items-baseline justify-between py-12 md:py-20 border-b border-white/10 hover:border-white transition-colors duration-500 w-full relative">

                                    {/* Left: Meta */}
                                    <div className="w-full lg:w-2/12 flex gap-4 lg:flex-col mb-4 lg:mb-0">
                                        <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors duration-500">
                                            {post.date}
                                        </span>
                                        <span className="text-xs font-mono tracking-widest text-white/30 hidden lg:block">
                                            {post.readingTime}
                                        </span>
                                    </div>

                                    {/* Middle: Title & Excerpt */}
                                    <div className="w-full lg:w-8/12 flex flex-col gap-4">
                                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight group-hover:italic lg:group-hover:pl-4 transition-all duration-700 ease-[0.16,1,0.3,1] pr-8">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm md:text-base font-light text-white/50 max-w-2xl mt-4 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:pl-4 transition-all duration-700 ease-in-out hidden md:block">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    {/* Right: Action */}
                                    <div className="w-full lg:w-2/12 flex justify-end items-end mt-8 lg:mt-0">
                                        <div className="flex items-center gap-4 text-white/30 group-hover:text-white transition-colors duration-500">
                                            <span className="text-xs font-mono uppercase tracking-widest hidden md:block">Examine</span>
                                            <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    );
}
