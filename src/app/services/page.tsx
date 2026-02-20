import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
    title: "Our Services | Scientific Editing & Publication Support",
    description: "Professional scientific editing, journal submission support, research consultancy, and publication services for researchers and academics.",
};

export default function ServicesPage() {
    return <ServicesContent />;
}
