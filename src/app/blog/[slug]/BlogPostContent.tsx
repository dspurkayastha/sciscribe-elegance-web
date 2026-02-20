"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { BlogPost } from "@/lib/mock-blog";
import { Calendar, Clock, ChevronLeft, Share2, Twitter, Linkedin, Copy } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from 'react-markdown';

interface BlogPostContentProps {
    post: BlogPost;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function BlogPostContent({ post }: BlogPostContentProps) {
    const { toast } = useToast();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Link copied to clipboard",
            description: "You can now share this article.",
        });
    };

    return (
        <div className="bg-background min-h-screen">
            <Navbar />

            <main className="pt-32 pb-24">
                <article className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Back Button */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                                <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                                Back to Blog
                            </Link>
                        </motion.div>

                        {/* Header */}
                        <motion.header variants={itemVariants} className="mb-12">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border/50">
                                <div className="flex items-center gap-4">
                                    <Image src={post.author.avatar} alt={post.author.name} width={48} height={48} className="rounded-full shadow-sm" />
                                    <div>
                                        <p className="font-semibold">{post.author.name}</p>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                            <span className="hidden sm:inline">•</span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> {post.readingTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">Share:</span>
                                    <button onClick={handleCopyLink} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all text-muted-foreground" aria-label="Copy Link">
                                        <Copy size={18} />
                                    </button>
                                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=URL`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all text-muted-foreground" aria-label="Share on Twitter">
                                        <Twitter size={18} />
                                    </a>
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=URL`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all text-muted-foreground" aria-label="Share on LinkedIn">
                                        <Linkedin size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.header>

                        {/* Cover Image */}
                        <motion.div variants={itemVariants} className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-lg border border-border/30">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Content */}
                        <motion.div variants={itemVariants} className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl max-w-none">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </motion.div>

                        {/* Footer CTA */}
                        <motion.div variants={itemVariants} className="mt-20 p-8 md:p-12 bg-card border border-border/50 rounded-3xl text-center shadow-sm">
                            <h3 className="text-2xl font-bold mb-4">Need help with your manuscript?</h3>
                            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                                Our team of expert editors is ready to help you communicate your science with clarity and impact.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/services" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors">
                                    Explore Services
                                </Link>
                                <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent border border-border text-foreground font-medium hover:bg-accent/5 hover:border-accent transition-colors">
                                    Get in Touch
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
