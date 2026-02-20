"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const RefundContent = () => {
  const { logPageView } = useAnalytics();

  useEffect(() => {
    logPageView('/refund');
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
              Refund <br />
              <span className="italic text-white/50">Policy.</span>
            </h1>
            <p className="text-sm font-mono tracking-widest text-white/40">
              Last Updated: April 12, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-serif prose-headings:font-normal prose-h2:text-4xl prose-h2:mt-16 prose-p:font-light prose-p:text-white/80 prose-p:leading-relaxed prose-li:font-light prose-li:text-white/80 prose-strong:text-white max-w-none">

            <p className="lead text-xl text-white font-serif italic mb-12">
              At SciScribe Solutions, customer satisfaction is our priority. This Refund Policy outlines the
              conditions under which we issue refunds for our services.
            </p>

            <h2>Eligibility for Refunds</h2>
            <p>
              We provide refunds in the following situations:
            </p>
            <ol>
              <li>
                <strong>Service Not Rendered:</strong> If we fail to deliver the services you have paid for
                within the agreed timeframe (plus a reasonable grace period of 2 business days), you are
                eligible for a full refund.
              </li>
              <li>
                <strong>Quality Guarantee:</strong> If our services fail to meet the quality standards
                described on our website and we are unable to rectify the issues through our revision process,
                you may be eligible for a partial or full refund.
              </li>
              <li>
                <strong>Duplicate Payment:</strong> If you accidentally paid for the same service twice,
                we will refund the duplicate payment in full.
              </li>
              <li>
                <strong>Cancellation Before Service Commencement:</strong> If you cancel your order before
                we have begun working on your document, you may be eligible for a refund less a 15%
                administrative fee.
              </li>
            </ol>

            <h2>Refund Process</h2>
            <p>
              To request a refund:
            </p>
            <ol>
              <li>
                Contact our customer support team at refunds@sciscribesolutions.com with your order details
                and the reason for your refund request.
              </li>
              <li>
                Our team will review your request within 2 business days and communicate the decision to you.
              </li>
              <li>
                If your refund is approved, it will be processed within 7 business days through the original
                payment method when possible.
              </li>
            </ol>

            <h2>Non-Refundable Circumstances</h2>
            <p>
              Refunds are not provided in the following situations:
            </p>
            <ul>
              <li>
                After our services have been delivered and you have had the opportunity to review the work
                and request revisions (beyond the quality guarantee period of 7 days).
              </li>
              <li>
                If you cancel your order after work has begun but before delivery, you will be charged
                proportionally for the work completed.
              </li>
              <li>
                If the service provided meets the scope and quality standards as described, but does not
                achieve the results you hoped for (such as journal acceptance).
              </li>
              <li>
                If your request falls outside our revision policy time frame (7 days after delivery).
              </li>
            </ul>

            <h2>Special Consideration</h2>
            <p>
              In special circumstances not covered by our standard policy, we may consider refund requests
              on a case-by-case basis. Our decision in these cases will be final.
            </p>

            <h2>Revision Policy</h2>
            <p>
              Before requesting a refund due to quality concerns, we encourage clients to use our revision
              service:
            </p>
            <ul>
              <li>
                You can request revisions within 7 days of receiving your edited document.
              </li>
              <li>
                We provide up to two rounds of revisions at no additional cost.
              </li>
              <li>
                Revision requests must be specific and related to the original scope of work.
              </li>
            </ul>

            <h2>Payment Processing Fees</h2>
            <p>
              Please note that payment gateway charges (typically 2-3%) are non-refundable even in the case
              of a full refund, as these are charges imposed by payment processors that we cannot recover.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We reserve the right to modify this Refund Policy at any time. Changes will be effective
              immediately upon posting on our website. Your continued use of our services after the posting
              of changes constitutes your acceptance of such changes.
            </p>

            {/* Assistance Block */}
            <div className="mt-16 border border-white/20 p-8 font-mono text-sm max-w-lg">
              <p className="font-serif text-2xl text-white mb-4 normal-case">Need Assistance?</p>
              <p className="text-white/60 mb-8 font-serif italic text-lg line-clamp-3">
                If you have any questions about our refund policy or need assistance with a request,
                please verify your protocols and contact us:
              </p>
              <p className="mb-2 uppercase tracking-widest text-white/50">Transmission Corridors</p>
              <p className="text-white">Email: contact@sciscribesolutions.com</p>
              <p className="text-white">Phone: +91 93955 82679</p>
              <div className="mt-8 pt-6 border-t border-white/10">
                <Link href="/contact" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  [ Access Contact Portal ]
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </article>
    </main>
  );
};

export default RefundContent;
