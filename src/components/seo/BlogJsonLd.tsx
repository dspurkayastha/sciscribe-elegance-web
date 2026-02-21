interface BlogJsonLdProps {
    title: string;
    description: string;
    datePublished: string;
    authorName: string;
    authorRole: string;
    coverImage: string;
    slug: string;
    tags: string[];
}

export default function BlogJsonLd({
    title,
    description,
    datePublished,
    authorName,
    authorRole,
    coverImage,
    slug,
    tags,
}: BlogJsonLdProps) {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        image: coverImage,
        datePublished: new Date(datePublished).toISOString(),
        dateModified: new Date(datePublished).toISOString(),
        author: {
            "@type": "Person",
            name: authorName,
            jobTitle: authorRole,
        },
        publisher: {
            "@type": "Organization",
            name: "SciScribe Solutions",
            url: "https://www.sciscribesolutions.com",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.sciscribesolutions.com/blog/${slug}`,
        },
        keywords: tags.join(", "),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(articleSchema),
            }}
        />
    );
}
