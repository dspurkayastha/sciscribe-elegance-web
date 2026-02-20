import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | SciScribe Solutions",
    description: "Learn how we protect your personal information and securely manage your research data.",
};

export default function PrivacyPage() {
    return (
        <main className="flex min-h-screen flex-col bg-transparent text-white font-sans overflow-hidden">
            {/* Editorial Hero */}
            <section className="relative w-full pt-48 pb-20">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <p className="text-xs tracking-[0.3em] font-mono text-white/50 uppercase mb-6">Legal</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-normal text-white leading-[0.95] mb-6">
                        Privacy<br />Policy
                    </h1>
                    <div className="w-16 h-px bg-white/20 mb-6" />
                    <p className="text-sm font-mono text-white/40 tracking-wider uppercase">
                        Last Updated — June 24, 2025
                    </p>
                </div>
            </section>

            {/* Content Body */}
            <section className="relative w-full pb-32">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">

                    {/* Preamble */}
                    <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed mb-20 max-w-3xl">
                        At SciScribe Solutions (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>

                    {/* Section 1 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">01</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Information We Collect</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                We collect information that you provide directly to us when you:
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Register for an account
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Submit manuscripts or datasets for editing or analysis
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Make a payment for our services
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Contact our customer support
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Subscribe to our newsletter
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Respond to surveys or questionnaires
                                </li>
                            </ul>

                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                The types of information we may collect include:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-white/[0.06] p-5 bg-white/[0.01]">
                                    <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Personal</p>
                                    <p className="text-sm font-light text-white/70">Name, email address, phone number</p>
                                </div>
                                <div className="border border-white/[0.06] p-5 bg-white/[0.01]">
                                    <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Billing</p>
                                    <p className="text-sm font-light text-white/70">Payment method details, billing address</p>
                                </div>
                                <div className="border border-white/[0.06] p-5 bg-white/[0.01]">
                                    <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Academic</p>
                                    <p className="text-sm font-light text-white/70">Institution, research field, publication history</p>
                                </div>
                                <div className="border border-white/[0.06] p-5 bg-white/[0.01]">
                                    <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">Documents</p>
                                    <p className="text-sm font-light text-white/70">Manuscripts, datasets, and documents submitted for editing</p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 2 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">02</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">How We Use Your Information</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Providing, maintaining, and improving our services
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Processing transactions and sending related information
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Responding to your comments, questions, and requests
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Sending you technical notices, updates, and administrative messages
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Communicating with you about products, services, offers, and events
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Monitoring and analyzing trends, usage, and activities
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Detecting, investigating, and preventing fraudulent transactions
                                </li>
                            </ul>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 3 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">03</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Document & Data Security</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                We recognize the sensitive nature of academic and research materials. To protect the confidentiality, integrity, and availability of your submissions, we implement industry-standard security measures:
                            </p>
                            <div className="space-y-6">
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Encryption</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        All data are transmitted over TLS 1.2 or higher and stored using AES-256 encryption at rest.
                                    </p>
                                </div>
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Access Control</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        Only authorized personnel with a demonstrable need have access to your files, governed by signed confidentiality agreements and role-based access control (RBAC).
                                    </p>
                                </div>
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Cloud Infrastructure</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        Documents are processed on AWS & Google Cloud regions that meet ISO 27001, SOC 2 Type II, and GDPR security standards.
                                    </p>
                                </div>
                                <div className="border-l border-white/10 pl-6">
                                    <p className="text-sm font-mono text-white/40 uppercase tracking-wider mb-2">Monitoring</p>
                                    <p className="text-base font-light text-white/70 leading-relaxed">
                                        Continuous real-time alerts and audit logs help us detect and remediate suspicious activity. Annual penetration testing and vulnerability scans are performed by independent security firms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 4 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">04</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Data Retention & Deletion</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-4">
                                We retain your manuscripts, datasets, and related project files only for as long as necessary to deliver our services and comply with legal obligations. Unless you request otherwise, <strong className="text-white/90 font-medium">all project files are automatically deleted 30 days after project completion</strong> from our production systems. Encrypted backups containing your files are purged within 90 days.
                            </p>
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                You may request deletion sooner by emailing us at <a href="mailto:privacy@sciscribesolutions.com" className="underline underline-offset-4 text-white/90 hover:text-white transition-colors">privacy@sciscribesolutions.com</a>. We will honor such requests within 5 business days, subject to applicable legal or regulatory retention requirements.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 5 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">05</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Confidentiality & Staff Obligations</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                All editors, statisticians, and technical staff are bound by strict confidentiality agreements that prohibit unauthorized disclosure of client content. Access to live data is logged and time-boxed, and team members receive mandatory annual training on data protection best practices.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 6 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">06</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Sharing Your Information</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following circumstances:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    To trusted third-party service providers who help us operate our website and deliver services, subject to strict contractual data processing terms.
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    To comply with legal obligations or enforce our agreements.
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    To protect the rights, property, or safety of SciScribe Solutions, our customers, or others.
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    In connection with any merger, sale of company assets, financing, or acquisition.
                                </li>
                            </ul>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 7 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">07</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Your Rights & Choices</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                You have certain rights regarding the personal information we hold about you:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Access to your personal information
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Correction of inaccurate or incomplete information
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Deletion of your personal information in certain circumstances
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Restriction or objection to our processing of your personal information
                                </li>
                                <li className="flex items-start gap-3 text-base font-light text-white/70">
                                    <span className="text-white/20 mt-1.5 text-xs">●</span>
                                    Data portability to receive your information in a structured, commonly used format
                                </li>
                            </ul>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 8 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">08</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Cookies & Tracking</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We use cookies and similar tracking technologies to collect information about your browsing activities over time and across different websites. You can control cookies through your browser settings and other tools.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 9 */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">09</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Changes to This Policy</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be effective immediately upon posting on this page, and the date of the latest revision will be indicated at the top.
                            </p>
                        </div>
                    </article>

                    <div className="w-full h-px bg-white/[0.06] mb-16" />

                    {/* Section 10 — Contact */}
                    <article className="mb-16">
                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-sm font-mono text-white/30 tracking-wider">10</span>
                            <h2 className="text-2xl md:text-3xl font-serif text-white font-normal">Contact Us</h2>
                        </div>
                        <div className="pl-10 md:pl-12">
                            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed mb-6">
                                If you have any questions or concerns about our Privacy Policy, please contact us at:
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
