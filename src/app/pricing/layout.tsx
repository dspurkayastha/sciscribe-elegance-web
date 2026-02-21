import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing & Packages",
    description: "Transparent pricing for scientific editing, medical writing, and publication support. From Research Launchpad to Complete Publication packages.",
    openGraph: {
        title: "Pricing & Packages | SciScribe Solutions",
        description: "Transparent pricing for scientific editing, medical writing, and publication support services.",
        url: "https://www.sciscribesolutions.com/pricing",
    },
    alternates: {
        canonical: "https://www.sciscribesolutions.com/pricing",
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
