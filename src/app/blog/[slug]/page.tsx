import { getPostBySlug } from '@/lib/mock-blog';
import BlogPostContent from './BlogPostContent';
import BlogJsonLd from '@/components/seo/BlogJsonLd';
import { notFound } from 'next/navigation';
import { mockPosts } from '@/lib/mock-blog';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static parameters for all known blog posts
export function generateStaticParams() {
    return mockPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata dynamically based on the post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | SciScribe Solutions',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: `${post.title} | SciScribe Solutions Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
        },
        alternates: {
            canonical: `https://www.sciscribesolutions.com/blog/${slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <BlogJsonLd
                title={post.title}
                description={post.excerpt}
                datePublished={post.date}
                authorName={post.author.name}
                authorRole={post.author.role}
                coverImage={post.coverImage}
                slug={post.slug}
                tags={post.tags}
            />
            <BlogPostContent post={post} />
        </>
    );
}

