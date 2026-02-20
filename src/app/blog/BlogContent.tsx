"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { BlogPost } from "@/lib/mock-blog";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Image from "next/image";

interface BlogContentProps {
    posts: BlogPost[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function BlogContent({ posts }: BlogContentProps) {
    const featuredPost = posts[0];
    const regularPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <InteractiveBackground />
            <Navbar />

            <main className="flex-grow pt-32 pb-24 relative z-10 w-full">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="w-full"
                    >
                        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                                Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/80">Resources</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                Expert advice on scientific writing, publication strategies, and the peer review process from our seasoned editors.
                            </p>
                        </motion.div>

                        {/* Featured Post */}
                        {featuredPost && (
                            <motion.div variants={itemVariants} className="mb-20">
                                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                                    <div className="grid md:grid-cols-2 gap-8 items-center bg-card/30 backdrop-blur-md rounded-3xl border border-border/50 overflow-hidden hover:bg-card/40 transition-all duration-500 shadow-apple hover:shadow-apple-hover">
                                        <div className="relative h-64 md:h-full min-h-[400px] overflow-hidden">
                                            <Image
                                                src={featuredPost.coverImage}
                                                alt={featuredPost.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="p-8 md:p-12 pl-4 md:pl-0">
                                            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {featuredPost.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readingTime}</span>
                                            </div>
                                            <div className="flex gap-2 mb-6">
                                                {featuredPost.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-muted-foreground mb-8 line-clamp-3 text-lg">
                                                {featuredPost.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Image src={featuredPost.author.avatar} alt={featuredPost.author.name} width={40} height={40} className="rounded-full" />
                                                    <div>
                                                        <p className="text-sm font-medium">{featuredPost.author.name}</p>
                                                        <p className="text-xs text-muted-foreground">{featuredPost.author.role}</p>
                                                    </div>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )}

                        {/* Recent Posts Grid */}
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold">Recent Articles</h3>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regularPosts.map((post) => (
                                    <motion.div key={post.id} variants={itemVariants} whileHover={{ y: -5 }}>
                                        <Link href={`/blog/${post.slug}`} className="group block h-full">
                                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
                                                <div className="relative h-48 overflow-hidden">
                                                    <Image
                                                        src={post.coverImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                                <div className="p-6 flex-grow flex flex-col">
                                                    <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                                                        <span>{post.date}</span>
                                                        <span>•</span>
                                                        <span>{post.readingTime}</span>
                                                    </div>
                                                    <h4 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                                                        {post.title}
                                                    </h4>
                                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-auto">
                                                        <Image src={post.author.avatar} alt={post.author.name} width={24} height={24} className="rounded-full" />
                                                        <span className="text-sm font-medium text-muted-foreground">{post.author.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>

            <Footer className="relative z-10" />
        </div>
    );
}
