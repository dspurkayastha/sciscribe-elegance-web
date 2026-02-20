import { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
    title: "Terms of Service | SciScribe Solutions",
    description: "Read our terms of service, engagement policies, and client agreements.",
};

export default function TermsPage() {
    return <TermsContent />;
}
