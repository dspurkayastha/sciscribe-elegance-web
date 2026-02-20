"use client";

import { motion } from "framer-motion";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const TermsContent = () => {
  const { logPageView } = useAnalytics();

  useEffect(() => {
    logPageView('/terms');
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
              Terms & <br />
              <span className="italic text-white/50">Conditions.</span>
            </h1>
            <p className="text-sm font-mono tracking-widest text-white/40">
              Last Updated: April 12, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-serif prose-headings:font-normal prose-h2:text-4xl prose-h2:mt-16 prose-p:font-light prose-p:text-white/80 prose-p:leading-relaxed prose-li:font-light prose-li:text-white/80 max-w-none">

            <p className="lead text-xl text-white">
              Welcome to SciScribe Solutions. These Terms and Conditions govern your use of our website
              and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2>1. Services Description</h2>
            <p>
              SciScribe Solutions provides academic editing, proofreading, and publication support services
              for researchers, academics, and professionals. Our services are offered on an online-only basis,
              and we do not provide physical delivery of any materials or products.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              To access certain services, you may be required to create an account. You are responsible for
              maintaining the confidentiality of your account credentials and for all activities that occur
              under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>3. Service Orders and Delivery</h2>
            <p>
              By placing an order for our services, you agree to:
            </p>
            <ul>
              <li>Provide accurate and complete information about your project.</li>
              <li>Pay the agreed-upon fees for the services.</li>
              <li>Cooperate with reasonable requests for clarification during the editing process.</li>
            </ul>
            <p>
              We will make our best efforts to deliver services within the estimated timeframe. However, exact
              delivery times may vary depending on the complexity of the project, the volume of work, and other
              factors. Any delivery timeframes provided are estimates and not guaranteed delivery dates.
            </p>

            <h2>4. Payment Terms</h2>
            <p>
              Payment for our services is required in advance or as specified in your service agreement. We
              accept payments through our secure payment gateway. All prices are listed in Indian Rupees (₹)
              unless otherwise specified and are inclusive of applicable taxes.
            </p>

            <h2>5. Ownership and Copyright</h2>
            <p>
              You retain ownership of all original content and materials you submit to us. By submitting content
              for editing, you represent that you have the right to do so and that the content does not infringe
              on any third-party rights.
            </p>
            <p>
              We do not claim ownership of your content. However, you grant us a limited license to use your
              content for the purpose of providing our services.
            </p>

            <h2>6. Confidentiality</h2>
            <p>
              We understand the sensitive nature of academic and research manuscripts. All documents submitted to
              SciScribe Solutions are treated with strict confidentiality. We will not share, distribute, or
              publish your content without your explicit permission, except as required to provide our services.
            </p>

            <h2>7. Satisfaction Guarantee and Revisions</h2>
            <p>
              We strive to provide high-quality services. If you are not satisfied with our work, you may request
              revisions within 7 days of delivery. We will make reasonable efforts to address your concerns and
              make necessary revisions at no additional cost, provided that the revision requests are within the
              scope of the original order.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, SciScribe Solutions shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible
              losses resulting from:
            </p>
            <ul>
              <li>Your use or inability to use our services</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any errors or omissions in our services</li>
              <li>Any interruption or cessation of transmission to or from our services</li>
            </ul>

            <h2>9. Intellectual Property Rights</h2>
            <p>
              The SciScribe Solutions website and its contents, features, and functionality, including but not
              limited to text, graphics, logos, icons, images, audio clips, and software, are owned by SciScribe
              Solutions and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your access to our services immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if you breach these Terms
              and Conditions.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. The most current version will
              be posted on our website with the effective date.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without
              regard to its conflict of law provisions.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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

export default TermsContent;
