"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/mock-blog";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from 'react-markdown';

interface BlogPostContentProps {
    post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const { toast } = useToast();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Link Transmitted",
            description: "Ready for distribution.",
        });
    };

    return (
        <main className="flex flex-col relative w-full overflow-hidden z-10 pt-32 md:pt-48 pb-24 min-h-screen">
            <article className="container mx-auto px-6 md:px-12 max-w-5xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Back Link */}
                    <Link href="/blog" className="inline-block text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-16 md:mb-24">
                        [ Return to Index ]
                    </Link>

                    {/* Massive Header */}
                    <div className="mb-16 md:mb-24">
                        <div className="flex gap-4 mb-8">
                            {post.tags.map(tag => (
                                <span key={tag} className="text-xs font-mono uppercase tracking-widest text-white/40 border border-white/20 px-3 py-1 rounded-none">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-[10vw] md:text-[6vw] font-serif leading-[0.9] tracking-tighter text-white mb-8">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed text-balance">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Meta Data Block */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-y border-white/20 py-8 mb-16 gap-8">
                        <div className="flex items-center gap-6 text-white">
                            <Image src={post.author.avatar} alt={post.author.name} width={56} height={56} className="rounded-none grayscale contrast-125" />
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl">{post.author.name}</span>
                                <span className="text-xs font-mono uppercase tracking-widest text-white/40">{post.author.role}</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:text-right gap-2">
                            <span className="text-xs font-mono uppercase tracking-widest text-white/40">Published</span>
                            <span className="font-serif text-xl text-white">{post.date}</span>
                            <span className="text-xs font-mono tracking-widest text-white/30 hidden md:block">Volume: {post.readingTime}</span>
                        </div>
                    </div>

                    {/* Full Bleed Image */}
                    <div className="relative w-full aspect-[21/9] overflow-hidden mb-24 border border-white/10">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover grayscale contrast-125 opacity-80"
                            priority
                        />
                    </div>

                    {/* Reading Formatting */}
                    <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-serif prose-headings:font-normal prose-h2:text-4xl prose-h3:text-3xl prose-p:font-light prose-p:text-white/80 prose-p:leading-relaxed prose-a:text-white prose-a:underline prose-a:decoration-white/30 hover:prose-a:decoration-white prose-ol:font-light prose-ul:font-light max-w-3xl mx-auto">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    {/* Footer Utility */}
                    <div className="max-w-3xl mx-auto mt-32 border-t border-white/20 pt-16 flex justify-between items-center">
                        <button onClick={handleCopyLink} className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors">
                            <Copy className="w-5 h-5 transition-transform group-hover:scale-110" />
                            <span className="text-xs font-mono uppercase tracking-widest">Copy Origin Link</span>
                        </button>

                        <Link href="/contact" className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white border border-white/20 hover:border-white px-6 py-3 transition-colors">
                            Consult Author
                        </Link>
                    </div>

                </motion.div>
            </article>
        </main>
    );
}
