import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | SciScribe Solutions",
    description: "Read our terms of service, engagement policies, and client agreements.",
};

export default function TermsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-transparent text-white font-sans overflow-hidden">
            {/* Editorial Hero */}
            <section className="relative w-full pt-48 pb-20">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <p className="text-xs tracking-[0.3em] font-mono text-white/50 uppercase mb-6">Legal</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-normal text-white leading-[0.95] mb-6">
                        Terms &<br />Conditions
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

                    {/* Preamble */}
                    <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed mb-20 max-w-3xl">
                        Welcome to SciScribe Solutions. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
                    </p>

                    {/* Section 1 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">01</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Services Description</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                SciScribe Solutions provides academic editing, proofreading, and publication support services for researchers, academics, and professionals. Our services are offered on an online-only basis, and we do not provide physical delivery of any materials or products.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 2 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">02</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">User Accounts</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                To access certain services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 3 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">03</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Service Orders & Delivery</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                By placing an order for our services, you agree to:
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Provide accurate and complete information about your project
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Pay the agreed-upon fees for the services
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Cooperate with reasonable requests for clarification during the editing process
                                </li>
                            </ul>
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We will make our best efforts to deliver services within the estimated timeframe. However, exact delivery times may vary depending on the complexity of the project, the volume of work, and other factors. Any delivery timeframes provided are estimates and not guaranteed delivery dates.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 4 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">04</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Payment Terms</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                Payment for our services is required in advance or as specified in your service agreement. We accept payments through our secure payment gateway. All prices are listed in Indian Rupees (₹) unless otherwise specified and are inclusive of applicable taxes.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 5 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">05</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Ownership & Copyright</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-4">
                                You retain ownership of all original content and materials you submit to us. By submitting content for editing, you represent that you have the right to do so and that the content does not infringe on any third-party rights.
                            </p>
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We do not claim ownership of your content. However, you grant us a limited license to use your content for the purpose of providing our services.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 6 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">06</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Confidentiality</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We understand the sensitive nature of academic and research manuscripts. All documents submitted to SciScribe Solutions are treated with strict confidentiality. We will not share, distribute, or publish your content without your explicit permission, except as required to provide our services.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 7 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">07</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Satisfaction Guarantee & Revisions</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We strive to provide high-quality services. If you are not satisfied with our work, you may request revisions within 7 days of delivery. We will make reasonable efforts to address your concerns and make necessary revisions at no additional cost, provided that the revision requests are within the scope of the original order.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 8 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">08</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Limitation of Liability</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                To the maximum extent permitted by law, SciScribe Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Your use or inability to use our services
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Any unauthorized access to or use of our servers and/or any personal information stored therein
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Any errors or omissions in our services
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Any interruption or cessation of transmission to or from our services
                                </li>
                            </ul>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 9 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">09</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Intellectual Property</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                The SciScribe Solutions website and its contents, features, and functionality, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are owned by SciScribe Solutions and are protected by copyright, trademark, and other intellectual property laws.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 10 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">10</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Termination</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 11 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">11</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Changes to Terms</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. The most current version will be posted on our website with the effective date.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 12 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">12</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Governing Law</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 13 — Contact */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">13</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Contact Us</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <div className="border border-white/10 bg-white/[0.02] p-6 md:p-8 space-y-2">
                                <p className="text-base text-white/80 font-light">
                                    <span className="text-white/40 font-mono text-sm uppercase tracking-wider mr-4">Email</span>
                                    <a href="mailto:contact@sciscribesolutions.com" className="underline underline-offset-4 hover:text-white transition-colors">contact@sciscribesolutions.com</a>
                                </p>
                                <p className="text-base text-white/80 font-light">
                                    <span className="text-white/40 font-mono text-sm uppercase tracking-wider mr-4">Phone</span>
                                    +91 93955 82679
                                </p>
                            </div>
                        </div>
                    </article>

                </div>
            </section>
        </main>
    );
}
