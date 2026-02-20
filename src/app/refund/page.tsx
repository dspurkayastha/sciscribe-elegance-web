import { Metadata } from "next";
import RefundContent from "./RefundContent";

export const metadata: Metadata = {
    title: "Refund Policy | SciScribe Solutions",
    description: "Review our policies regarding cancellations and refunds for our academic services.",
};

export default function RefundPage() {
    return <RefundContent />;
}
