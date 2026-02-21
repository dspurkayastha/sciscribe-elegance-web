import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio",
    description: "Explore our portfolio of scientific editing projects — manuscripts, theses, research papers, and grant proposals transformed into publication-ready work.",
    openGraph: {
        title: "Portfolio | SciScribe Solutions",
        description: "500+ projects across 25+ states with a 95% publication success rate.",
        url: "https://www.sciscribesolutions.com/portfolio",
    },
    alternates: { canonical: "https://www.sciscribesolutions.com/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return children;
}
