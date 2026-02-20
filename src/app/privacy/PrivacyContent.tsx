"use client";

import { motion } from "framer-motion";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const PrivacyContent = () => {
  const { logPageView } = useAnalytics();

  useEffect(() => {
    logPageView('/privacy');
  }, [logPageView]);

  return (
    <main className="flex flex-col relative w-full overflow-hidden z-10 pt-32 md:pt-48 pb-24 min-h-screen">
      <article className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="mb-24 border-b border-white/20 pb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40 mb-8 block">
              Legal Foundation
            </span>
            <h1 className="text-[10vw] md:text-[6vw] font-serif leading-[0.9] tracking-tighter text-white mb-8">
              Privacy <br />
              <span className="italic text-white/50">Policy.</span>
            </h1>
            <p className="text-sm font-mono tracking-widest text-white/40">
              Last Updated: April 12, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-serif prose-headings:font-normal prose-h2:text-4xl prose-h2:mt-16 prose-p:font-light prose-p:text-white/80 prose-p:leading-relaxed prose-li:font-light prose-li:text-white/80 max-w-none">

            <p className="lead text-xl text-white">
              At SciScribe Solutions, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul>
              <li>Register for an account</li>
              <li>Submit manuscripts for editing</li>
              <li>Make a payment for our services</li>
              <li>Contact our customer support</li>
              <li>Subscribe to our newsletter</li>
              <li>Respond to surveys or questionnaires</li>
            </ul>

            <p>
              The types of information we may collect include:
            </p>
            <ul>
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Billing information (payment method details, billing address)</li>
              <li>Academic information (institution, research field, publication history)</li>
              <li>The content of manuscripts and documents you submit for editing</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and sending related information</li>
              <li>Responding to your comments, questions, and requests</li>
              <li>Sending you technical notices, updates, and administrative messages</li>
              <li>Communicating with you about products, services, offers, and events</li>
              <li>Monitoring and analyzing trends, usage, and activities in connection with our services</li>
              <li>Detecting, investigating, and preventing fraudulent transactions and other illegal activities</li>
            </ul>

            <h2>Confidentiality and Security</h2>
            <p>
              We understand the sensitive nature of academic and research manuscripts. All documents submitted
              to SciScribe Solutions are treated with the strictest confidentiality. Our editors and staff are
              bound by confidentiality agreements, and we implement appropriate technical and organizational
              measures to protect your information.
            </p>

            <h2>Sharing Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside
              parties except in the following circumstances:
            </p>
            <ul>
              <li>To our third-party service providers who help us operate our website and deliver services (e.g., payment processors)</li>
              <li>To comply with legal obligations or enforce our agreements</li>
              <li>To protect the rights, property, or safety of SciScribe Solutions, our customers, or others</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
            </ul>

            <h2>Your Rights and Choices</h2>
            <p>
              You have certain rights regarding the personal information we hold about you:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information in certain circumstances</li>
              <li>Restriction or objection to our processing of your personal information</li>
              <li>Data portability to receive your information in a structured, commonly used format</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect information about your browsing
              activities over time and across different websites. You can control cookies through your browser
              settings and other tools.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for
              other operational, legal, or regulatory reasons. The updated policy will be effective immediately
              upon posting on this page, and the date of the latest revision will be indicated at the top.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at:
            </p>
            <div className="mt-8 border border-white/20 p-8 font-mono text-sm max-w-lg">
              <p className="mb-2 uppercase tracking-widest text-white/50">Transmission Protocols</p>
              <p className="text-white">Email: contact@sciscribesolutions.com</p>
              <p className="text-white">Phone: +91 93955 82679</p>
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  );
};

export default PrivacyContent;
