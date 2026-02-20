import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
    title: "Contact Us | SciScribe Solutions",
    description: "Get in touch with our scientific editing and research support team. We're here to help with your academic publication needs.",
};

export default function ContactPage() {
    return <ContactContent />;
}
