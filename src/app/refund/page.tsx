import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Refund Policy | SciScribe Solutions",
    description: "Review our policies regarding cancellations and refunds for our academic services.",
};

export default function RefundPage() {
    return (
        <main className="flex min-h-screen flex-col bg-transparent text-white font-sans overflow-hidden py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="prose prose-invert prose-lg md:prose-xl max-w-none font-light text-white/80 prose-headings:font-serif prose-headings:font-normal prose-headings:text-white prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/80">

                    <h1 className="text-4xl md:text-6xl mb-8">Refund Policy</h1>
                    <p className="text-white/50 text-base mb-16 uppercase tracking-widest font-mono">Last Updated: April 12, 2025</p>

                    <div className="p-8 border border-white/10 bg-white/[0.02] mb-12">
                        <p className="my-0 font-medium text-white/90">
                            At SciScribe Solutions, customer satisfaction is our priority. This Refund Policy outlines the conditions under which we issue refunds for our services.
                        </p>
                    </div>

                    <h2>Eligibility for Refunds</h2>
                    <p>We provide refunds in the following situations:</p>
                    <ol>
                        <li><strong>Service Not Rendered:</strong> If we fail to deliver the services you have paid for within the agreed timeframe (plus a reasonable grace period of 2 business days), you are eligible for a full refund.</li>
                        <li><strong>Quality Guarantee:</strong> If our services fail to meet the quality standards described on our website and we are unable to rectify the issues through our revision process, you may be eligible for a partial or full refund.</li>
                        <li><strong>Duplicate Payment:</strong> If you accidentally paid for the same service twice, we will refund the duplicate payment in full.</li>
                        <li><strong>Cancellation Before Service Commencement:</strong> If you cancel your order before we have begun working on your document, you may be eligible for a refund less a 15% administrative fee.</li>
                    </ol>

                    <h2>Refund Process</h2>
                    <p>To request a refund:</p>
                    <ol>
                        <li>Contact our customer support team at <a href="mailto:refunds@sciscribesolutions.com">refunds@sciscribesolutions.com</a> with your order details and the reason for your refund request.</li>
                        <li>Our team will review your request within 2 business days and communicate the decision to you.</li>
                        <li>If your refund is approved, it will be processed within 7 business days through the original payment method when possible.</li>
                    </ol>

                    <h2>Non-Refundable Circumstances</h2>
                    <p>Refunds are not provided in the following situations:</p>
                    <ul>
                        <li>After our services have been delivered and you have had the opportunity to review the work and request revisions (beyond the quality guarantee period of 7 days).</li>
                        <li>If you cancel your order after work has begun but before delivery, you will be charged proportionally for the work completed.</li>
                        <li>If the service provided meets the scope and quality standards as described, but does not achieve the results you hoped for (such as journal acceptance).</li>
                        <li>If your request falls outside our revision policy time frame (7 days after delivery).</li>
                    </ul>

                    <h2>Special Consideration</h2>
                    <p>In special circumstances not covered by our standard policy, we may consider refund requests on a case-by-case basis. Our decision in these cases will be final.</p>

                    <h2>Revision Policy</h2>
                    <p>Before requesting a refund due to quality concerns, we encourage clients to use our revision service:</p>
                    <ul>
                        <li>You can request revisions within 7 days of receiving your edited document.</li>
                        <li>We provide up to two rounds of revisions at no additional cost.</li>
                        <li>Revision requests must be specific and related to the original scope of work.</li>
                    </ul>

                    <h2>Payment Processing Fees</h2>
                    <p>Please note that payment gateway charges (typically 2-3%) are non-refundable even in the case of a full refund, as these are charges imposed by payment processors that we cannot recover.</p>

                    <h2>Changes to This Policy</h2>
                    <p>We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after the posting of changes constitutes your acceptance of such changes.</p>

                    <div className="mt-16 p-8 border border-white/10 bg-white/[0.02]">
                        <h3 className="mt-0 text-3xl italic text-white/90">Need Help?</h3>
                        <p className="mb-0">
                            If you have any questions about our refund policy or need assistance with a refund request, please don't hesitate to contact our customer support team:
                        </p>
                        <p className="mt-4 mb-0">
                            <strong>Email:</strong> <a href="mailto:contact@sciscribesolutions.com">contact@sciscribesolutions.com</a><br />
                            <strong>Phone:</strong> +91 93955 82679<br />
                            Or visit our <Link href="/contact" className="underline underline-offset-4 text-white hover:text-white/80">Contact Page</Link>
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
