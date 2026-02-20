import { Metadata } from "next";
import BlogContent from "./BlogContent";
import { mockPosts } from "@/lib/mock-blog";

export const metadata: Metadata = {
    title: "Blog & Resources | SciScribe Solutions",
    description: "Expert advice on scientific writing, publication strategies, and the peer review process from our seasoned editors.",
};

export default function BlogPage() {
    return <BlogContent posts={mockPosts} />;
}
