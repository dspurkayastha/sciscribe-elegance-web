import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Pay",
    description: "Payment instructions for SciScribe Solutions — accepted methods, invoice process, payment FAQs, and refund policy.",
    openGraph: {
        title: "Payment Information | SciScribe Solutions",
        description: "Learn how to complete your payment for scientific editing services.",
        url: "https://www.sciscribesolutions.com/pricing/payment",
    },
    alternates: { canonical: "https://www.sciscribesolutions.com/pricing/payment" },
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
    return children;
}
