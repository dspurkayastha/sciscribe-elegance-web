import { Metadata } from 'next';
import { getPostBySlug, mockPosts } from '@/lib/mock-blog';
import { notFound } from 'next/navigation';
import BlogPostContent from './BlogPostContent';

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found | SciScribe Solutions',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: `${post.title} | SciScribe Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
        },
    };
}

export function generateStaticParams() {
    return mockPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: Props) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
}
