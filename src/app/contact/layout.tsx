import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with SciScribe Solutions for medical writing, scientific editing, and publication support. Request a free quote or schedule a consultation.",
    openGraph: {
        title: "Contact Us | SciScribe Solutions",
        description: "Request a free quote or schedule a consultation for scientific writing and editing services.",
        url: "https://www.sciscribesolutions.com/contact",
    },
    alternates: {
        canonical: "https://www.sciscribesolutions.com/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
