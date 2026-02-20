export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    coverImage: string;
    tags: string[];
    readingTime: string;
}

export const mockPosts: BlogPost[] = [
    {
        id: "1",
        slug: "navigating-peer-review-process",
        title: "Navigating the Peer Review Process: A Comprehensive Guide for Early Career Researchers",
        excerpt: "Understand the nuances of academic peer review, from responding to Reviewer 2 to structuring your rebuttal letter for maximum success.",
        content: `
# Introduction to Peer Review
The peer review process is the cornerstone of academic publishing. While it can often feel daunting, understanding the expectations of editors and reviewers can significantly improve your chances of acceptance.

## The Role of Reviewer 2
We've all heard the jokes about "Reviewer 2," but critical feedback is essential for refining your research. Instead of viewing harsh comments as a personal attack, consider them as an opportunity to clarify your methodology and strengthen your arguments.

### How to Structure a Response Letter
1. **Be Polite and Professional**: Always thank the reviewers for their time.
2. **Address Every Point**: Do not skip any comments. If you disagree, provide evidence-based reasons.
3. **Make the Changes Easy to Find**: Reference specific line numbers and highlight modifications in your revised manuscript.

At SciScribe Solutions, our developmental editing team can help you craft compelling response letters that reviewers appreciate.
    `,
        date: "April 15, 2025",
        author: {
            name: "Dr. Sarah Jenkins",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
            role: "Senior Scientific Editor"
        },
        coverImage: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=1200&h=600",
        tags: ["Publishing", "Peer Review", "Early Career"],
        readingTime: "5 min read"
    },
    {
        id: "2",
        slug: "grant-writing-strategies",
        title: "Winning Strategies for High-Impact Research Grants",
        excerpt: "Learn how to structure your proposal narrative to capture the attention of grant review panels and secure funding for your lab.",
        content: `
# The Anatomy of a Successful Grant
Writing a grant is fundamentally different from writing a research paper. While papers focus on what you've *done*, grants must convince reviewers of what you *will do* and why it matters right now.

## Aligning with the Funder's Mission
Before you write a single word, read the RFA (Request for Applications) thoroughly. Your proposal must directly address the specific goals of the funding agency.

### The Importance of Preliminary Data
Review panels need to know that your proposed experiments are feasible. Strong preliminary data mitigates risk and demonstrates your technical capability. 

If you're struggling to organize your grant narrative, our grant review specialists can provide critical feedback before your deadline.
    `,
        date: "April 02, 2025",
        author: {
            name: "Prof. Michael Chen",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
            role: "Grant Consultant"
        },
        coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cdf4?auto=format&fit=crop&q=80&w=1200&h=600",
        tags: ["Grant Writing", "Funding", "Research"],
        readingTime: "7 min read"
    },
    {
        id: "3",
        slug: "effective-data-visualization",
        title: "The Art of Data Visualization in Scientific Papers",
        excerpt: "Transform complex datasets into intuitive, high-quality figures that editors and reviewers will love.",
        content: `
# Why Figures Matter
In many scientific disciplines, the figures are the most critical part of a manuscript. Many editors will scan the abstract and immediately jump to the figures before deciding whether to send a paper out for review.

## Common Mistakes in Data Viz
1. **Poor Contrast**: Using colors that aren't colorblind-friendly.
2. **Clutter**: Putting too many panels into a single figure.
3. **Inconsistent Formatting**: Using different fonts and sizes across multiple figures.

### Tools of the Trade
While Excel and standard statistical software are great for analysis, producing publication-quality figures often requires specialized tools like Adobe Illustrator, GraphPad Prism, or R (ggplot2).

Our formatting team ensures all your figures meet the exact DPI and stylistic requirements of your target journal.
    `,
        date: "March 20, 2025",
        author: {
            name: "Elena Rodriguez",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
            role: "Lead Formatting Specialist"
        },
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600",
        tags: ["Data Viz", "Figures", "Formatting"],
        readingTime: "4 min read"
    },
    {
        id: "4",
        slug: "ai-in-scientific-writing",
        title: "Ethical Use of AI in Scientific Writing",
        excerpt: "How to leverage Large Language Models (LLMs) to improve your drafting process without violating academic integrity policies.",
        content: `
# AI: Tool or Author?
The rapid advancement of AI tools like ChatGPT has disrupted academic publishing. While these tools can be highly effective for brainstorming and initial drafting, they present significant ethical challenges.

## Journal Policies on AI
Major publishers (Elsevier, Springer Nature, Wiley) have updated their guidelines regarding AI. The consensus is clear: AI cannot be listed as an author, and its use must be explicitly declared in the manuscript's methodology or acknowledgments section.

### Best Practices for Researchers
- Use AI for language smoothing and grammar checks.
- Do not use AI to generate data or interpret results.
- Always review and verify AI-generated citations, as "hallucinations" are common.

At SciScribe Solutions, our human editors provide the nuanced, subject-matter expertise that AI simply cannot replicate, ensuring your manuscript's scientific integrity remains pristine.
    `,
        date: "March 05, 2025",
        author: {
            name: "Dr. James Wilson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
            role: "Ethics & Policy Coordinator"
        },
        coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200&h=600",
        tags: ["AI", "Ethics", "Writing Tips"],
        readingTime: "6 min read"
    }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return mockPosts.find(post => post.slug === slug);
}
