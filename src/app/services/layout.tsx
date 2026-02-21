import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Scientific Writing & Editing Services",
    description: "Professional scientific editing, medical writing, manuscript preparation, and publication support services by subject-matter experts with PhDs.",
    openGraph: {
        title: "Scientific Writing & Editing Services | SciScribe Solutions",
        description: "Professional scientific editing, medical writing, manuscript preparation, and publication support services.",
        url: "https://www.sciscribesolutions.com/services",
    },
    alternates: {
        canonical: "https://www.sciscribesolutions.com/services",
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
