"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/lib/mock-blog";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown, { Components } from 'react-markdown';

interface BlogPostContentProps {
    post: BlogPost;
}

/* ── Custom component map for ReactMarkdown ── */
const markdownComponents: Components = {
    h1: ({ children }) => (
        <h1 className="text-3xl md:text-5xl font-serif font-normal text-white leading-tight mt-20 mb-8">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <>
            <div className="w-full h-px bg-white/[0.06] mt-16 mb-12" />
            <h2 className="text-2xl md:text-3xl font-serif font-normal text-white leading-snug mb-6">
                {children}
            </h2>
        </>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl md:text-2xl font-serif italic text-white/90 leading-snug mt-10 mb-4">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="text-base md:text-lg font-light text-white/70 leading-[1.85] mb-6">
            {children}
        </p>
    ),
    strong: ({ children }) => (
        <strong className="font-medium text-white/90">{children}</strong>
    ),
    em: ({ children }) => (
        <em className="italic font-serif text-white/80">{children}</em>
    ),
    ul: ({ children }) => (
        <ul className="space-y-3 my-6 pl-1">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="space-y-3 my-6 pl-1 counter-reset-item">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="flex items-start gap-3 text-base font-light text-white/70 leading-relaxed">
            <span className="text-white/20 mt-1.5 text-xs select-none shrink-0">●</span>
            <span>{children}</span>
        </li>
    ),
    hr: () => (
        <div className="w-12 h-px bg-white/20 my-16 mx-auto" />
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-white/20 pl-6 my-8 italic">
            {children}
        </blockquote>
    ),
    a: ({ href, children }) => (
        <a href={href} className="text-white/90 underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">
            {children}
        </a>
    ),
};

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
                        <div className="flex flex-wrap gap-3 mb-8">
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

                    {/* Article Body — Custom Rendered Markdown */}
                    <div className="max-w-3xl mx-auto">
                        <ReactMarkdown components={markdownComponents}>
                            {post.content}
                        </ReactMarkdown>
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
