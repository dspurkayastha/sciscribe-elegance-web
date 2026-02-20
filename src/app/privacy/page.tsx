import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | SciScribe Solutions",
    description: "Learn how we protect your personal information and securely manage your research data.",
};

export default function PrivacyPage() {
    return (
        <main className="flex min-h-screen flex-col bg-transparent text-white font-sans overflow-hidden py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="prose prose-invert prose-lg md:prose-xl max-w-none font-light text-white/80 prose-headings:font-serif prose-headings:font-normal prose-headings:text-white prose-a:text-white prose-a:underline-offset-4 hover:prose-a:text-white/80">

                    <h1 className="text-4xl md:text-6xl mb-8">Privacy Policy</h1>
                    <p className="text-white/50 text-base mb-16 uppercase tracking-widest font-mono">Last Updated: June 24, 2025</p>

                    <p>
                        At SciScribe Solutions ("we", "our", "us"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>

                    <h2>Information We Collect</h2>
                    <p>We collect information that you provide directly to us when you:</p>
                    <ul>
                        <li>Register for an account</li>
                        <li>Submit manuscripts or datasets for editing or analysis</li>
                        <li>Make a payment for our services</li>
                        <li>Contact our customer support</li>
                        <li>Subscribe to our newsletter</li>
                        <li>Respond to surveys or questionnaires</li>
                    </ul>

                    <p>The types of information we may collect include:</p>
                    <ul>
                        <li>Personal identification information (name, email address, phone number)</li>
                        <li>Billing information (payment method details, billing address)</li>
                        <li>Academic information (institution, research field, publication history)</li>
                        <li>The content of manuscripts, datasets, and documents you submit for editing or analysis</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>We use the information we collect for various purposes, including:</p>
                    <ul>
                        <li>Providing, maintaining, and improving our services</li>
                        <li>Processing transactions and sending related information</li>
                        <li>Responding to your comments, questions, and requests</li>
                        <li>Sending you technical notices, updates, and administrative messages</li>
                        <li>Communicating with you about products, services, offers, and events</li>
                        <li>Monitoring and analyzing trends, usage, and activities in connection with our services</li>
                        <li>Detecting, investigating, and preventing fraudulent transactions and other illegal activities</li>
                    </ul>

                    <h2>Document & Data Security</h2>
                    <p>We recognize the sensitive nature of academic and research materials. To protect the confidentiality, integrity, and availability of your submissions, we implement industry‑standard security measures, including:</p>
                    <ul>
                        <li><strong>Encryption in transit & at rest:</strong> All data are transmitted over TLS 1.2 or higher and stored using AES‑256 encryption.</li>
                        <li><strong>Role‑based access control (RBAC):</strong> Only authorized personnel with a demonstrable need have access to your files, governed by signed confidentiality agreements.</li>
                        <li><strong>Secure cloud infrastructure:</strong> Documents are processed on AWS & Google Cloud regions that meet ISO 27001, SOC 2 Type II, and GDPR security standards.</li>
                        <li><strong>Continuous monitoring & logging:</strong> Real‑time alerts and audit logs help us detect and remediate suspicious activity.</li>
                        <li><strong>Annual penetration testing & vulnerability scans</strong> performed by independent security firms.</li>
                    </ul>

                    <h2>Data Retention & Automated Deletion</h2>
                    <p>We retain your manuscripts, datasets, and related project files only for as long as necessary to deliver our services and comply with legal obligations. Unless you request otherwise, <strong>all project files are automatically deleted 30 days after project completion</strong> from our production systems. Encrypted backups containing your files are purged within 90 days.</p>
                    <p>You may request deletion sooner by emailing us at <a href="mailto:privacy@sciscribesolutions.com">privacy@sciscribesolutions.com</a>. We will honor such requests within 5 business days, subject to applicable legal or regulatory retention requirements.</p>

                    <h2>Confidentiality & Staff Obligations</h2>
                    <p>All editors, statisticians, and technical staff are bound by strict confidentiality agreements that prohibit unauthorized disclosure of client content. Access to live data is logged and time‑boxed, and team members receive mandatory annual training on data protection best practices.</p>

                    <h2>Sharing Your Information</h2>
                    <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except in the following circumstances:</p>
                    <ul>
                        <li>To trusted third‑party service providers who help us operate our website and deliver services (e.g., secure payment processors, cloud hosting), subject to strict contractual data processing terms.</li>
                        <li>To comply with legal obligations or enforce our agreements</li>
                        <li>To protect the rights, property, or safety of SciScribe Solutions, our customers, or others</li>
                        <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
                    </ul>

                    <h2>Your Rights & Choices</h2>
                    <p>You have certain rights regarding the personal information we hold about you:</p>
                    <ul>
                        <li>Access to your personal information</li>
                        <li>Correction of inaccurate or incomplete information</li>
                        <li>Deletion of your personal information in certain circumstances</li>
                        <li>Restriction or objection to our processing of your personal information</li>
                        <li>Data portability to receive your information in a structured, commonly used format</li>
                    </ul>

                    <h2>Cookies & Tracking Technologies</h2>
                    <p>We use cookies and similar tracking technologies to collect information about your browsing activities over time and across different websites. You can control cookies through your browser settings and other tools.</p>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be effective immediately upon posting on this page, and the date of the latest revision will be indicated at the top.</p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about our Privacy Policy, please contact us at:</p>
                    <p>
                        <strong>Email:</strong> <a href="mailto:contact@sciscribesolutions.com">contact@sciscribesolutions.com</a><br />
                        <strong>Phone:</strong> +91 9395582679
                    </p>

                </div>
            </div>
        </main>
    );
}
