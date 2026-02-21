import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about SciScribe Solutions — our mission, vision, expert team, and commitment to elevating scientific research through premium editing and publication support.",
    openGraph: {
        title: "About SciScribe Solutions | Our Team & Mission",
        description: "Discover the team and values behind SciScribe Solutions.",
        url: "https://www.sciscribesolutions.com/about",
    },
    alternates: { canonical: "https://www.sciscribesolutions.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
