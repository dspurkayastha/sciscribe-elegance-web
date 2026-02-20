import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Refund Policy | SciScribe Solutions",
    description: "Review our policies regarding cancellations and refunds for our academic services.",
};

export default function RefundPage() {
    return (
        <main className="flex min-h-screen flex-col bg-transparent text-white font-sans overflow-hidden">
            {/* Editorial Hero */}
            <section className="relative w-full pt-48 pb-20">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <p className="text-xs tracking-[0.3em] font-mono text-white/50 uppercase mb-6">Legal</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-normal text-white leading-[0.95] mb-6">
                        Refund<br />Policy
                    </h1>
                    <div className="w-16 h-px bg-white/20 mb-6" />
                    <p className="text-sm font-mono text-white/40 tracking-wider uppercase">
                        Last Updated — April 12, 2025
                    </p>
                </div>
            </section>

            {/* Content Body */}
            <section className="relative w-full pb-32">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">

                    {/* Preamble Callout */}
                    <div className="border-l-2 border-white/20 pl-6 md:pl-8 mb-20">
                        <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed italic">
                            At SciScribe Solutions, customer satisfaction is our priority. This Refund Policy outlines the conditions under which we issue refunds for our services.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">01</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Eligibility for Refunds</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                We provide refunds in the following situations:
                            </p>
                            <div className="space-y-6">
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Service Not Rendered</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        If we fail to deliver the services you have paid for within the agreed timeframe (plus a reasonable grace period of 2 business days), you are eligible for a full refund.
                                    </p>
                                </div>
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Quality Guarantee</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        If our services fail to meet the quality standards described on our website and we are unable to rectify the issues through our revision process, you may be eligible for a partial or full refund.
                                    </p>
                                </div>
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Duplicate Payment</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        If you accidentally paid for the same service twice, we will refund the duplicate payment in full.
                                    </p>
                                </div>
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Cancellation Before Commencement</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        If you cancel your order before we have begun working on your document, you may be eligible for a refund less a 15% administrative fee.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 2 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">02</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Refund Process</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                To request a refund:
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <span className="text-sm font-mono text-white/30 mt-0.5">1.</span>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        Contact our customer support team at <a href="mailto:refunds@sciscribesolutions.com" className="underline underline-offset-4 text-white/90 hover:text-white transition-colors">refunds@sciscribesolutions.com</a> with your order details and the reason for your refund request.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-sm font-mono text-white/30 mt-0.5">2.</span>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        Our team will review your request within 2 business days and communicate the decision to you.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-sm font-mono text-white/30 mt-0.5">3.</span>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        If your refund is approved, it will be processed within 7 business days through the original payment method when possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 3 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">03</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Non-Refundable Circumstances</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                Refunds are not provided in the following situations:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    After our services have been delivered and you have had the opportunity to review the work and request revisions (beyond the quality guarantee period of 7 days).
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    If you cancel your order after work has begun but before delivery, you will be charged proportionally for the work completed.
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    If the service provided meets the scope and quality standards as described, but does not achieve the results you hoped for (such as journal acceptance).
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    If your request falls outside our revision policy time frame (7 days after delivery).
                                </li>
                            </ul>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 4 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">04</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Special Consideration</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                In special circumstances not covered by our standard policy, we may consider refund requests on a case-by-case basis. Our decision in these cases will be final.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 5 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">05</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Revision Policy</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                Before requesting a refund due to quality concerns, we encourage clients to use our revision service:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    You can request revisions within 7 days of receiving your edited document.
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    We provide up to two rounds of revisions at no additional cost.
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Revision requests must be specific and related to the original scope of work.
                                </li>
                            </ul>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 6 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">06</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Payment Processing Fees</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                Please note that payment gateway charges (typically 2–3%) are non-refundable even in the case of a full refund, as these are charges imposed by payment processors that we cannot recover.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 7 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">07</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Changes to This Policy</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after the posting of changes constitutes your acceptance of such changes.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Contact Card */}
                    <div className="border border-white/10 bg-white/[0.02] p-8 md:p-10">
                        <h3 className="text-3xl font-serif italic text-white/90 mb-4">Need Help?</h3>
                        <p className="text-base font-light text-white/70 leading-relaxed mb-6">
                            If you have any questions about our refund policy or need assistance with a refund request, please don't hesitate to reach out.
                        </p>
                        <div className="space-y-2">
                            <p className="text-base text-white/80 font-light">
                                <span className="text-white/40 font-mono text-sm uppercase tracking-wider mr-4">Email</span>
                                <a href="mailto:contact@sciscribesolutions.com" className="underline underline-offset-4 hover:text-white transition-colors">contact@sciscribesolutions.com</a>
                            </p>
                            <p className="text-base text-white/80 font-light">
                                <span className="text-white/40 font-mono text-sm uppercase tracking-wider mr-4">Phone</span>
                                +91 93955 82679
                            </p>
                            <p className="text-base text-white/80 font-light mt-4">
                                Or visit our <Link href="/contact" className="underline underline-offset-4 text-white hover:text-white/80 transition-colors">Contact Page</Link>
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
