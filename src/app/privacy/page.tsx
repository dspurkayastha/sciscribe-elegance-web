import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
    title: "Privacy Policy | SciScribe Solutions",
    description: "Learn how we protect your personal information and securely manage your research data.",
};

export default function PrivacyPage() {
    return <PrivacyContent />;
}
