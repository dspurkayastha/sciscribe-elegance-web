import { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
    title: "Pricing | SciScribe Solutions",
    description: "Transparent pricing for our scientific editing, manuscript preparation, and research support services. Choose the package that fits your needs and budget.",
};

export default function PricingPage() {
    return <PricingContent />;
}
