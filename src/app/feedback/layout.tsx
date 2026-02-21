import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Feedback",
    description: "Share your experience with SciScribe Solutions. Your feedback helps us improve our scientific editing and publication support services.",
    openGraph: {
        title: "Share Your Feedback | SciScribe Solutions",
        description: "Help us improve — rate your experience with our services.",
        url: "https://www.sciscribesolutions.com/feedback",
    },
    alternates: { canonical: "https://www.sciscribesolutions.com/feedback" },
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
    return children;
}
