import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RouterAwareSeo from "@/components/ui/RouterAwareSeo";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Privacy = () => {
  const { logPageView } = useAnalytics();

  // Track page view when component mounts
  useEffect(() => {
    logPageView("/privacy");
  }, [logPageView]);

  return (
    <>
      <RouterAwareSeo
        title="Privacy Policy | SciScribe Solutions"
        description="Our privacy policy outlines how we collect, use, and protect your personal information when you use our scientific editing and research support services."
        trackPageView={false} // We're manually tracking the page view above
        noindex={false} // Privacy policy should be indexed
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          description:
            "Our privacy policy outlines how we collect, use, and protect your personal information when you use our scientific editing and research support services.",
          dateModified: "2025-06-24",
          publisher: {
            "@type": "Organization",
            name: "SciScribe Solutions",
          },
        }}
      />
      <Navbar />

      <main className="pt-20">
        <section className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-center text-3xl md:text-4xl font-bold mb-8"
            >
              Privacy Policy
            </motion.h1>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              Last Updated: June 24, 2025
            </motion.p>

            <motion.p variants={itemVariants}>
              At SciScribe Solutions ("we", "our", "us"), we take your privacy seriously. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </motion.p>

            {/* ------------------------------------- Information We Collect ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Information We Collect
            </motion.h2>

            <motion.p variants={itemVariants}>
              We collect information that you provide directly to us when you:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>Register for an account</li>
              <li>Submit manuscripts or datasets for editing or analysis</li>
              <li>Make a payment for our services</li>
              <li>Contact our customer support</li>
              <li>Subscribe to our newsletter</li>
              <li>Respond to surveys or questionnaires</li>
            </motion.ul>

            <motion.p variants={itemVariants} className="mt-4">
              The types of information we may collect include:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Billing information (payment method details, billing address)</li>
              <li>Academic information (institution, research field, publication history)</li>
              <li>
                The content of manuscripts, datasets, and documents you submit for editing or
                analysis
              </li>
            </motion.ul>

            {/* ------------------------------------- How We Use Your Information ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              How We Use Your Information
            </motion.h2>

            <motion.p variants={itemVariants}>
              We use the information we collect for various purposes, including:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and sending related information</li>
              <li>Responding to your comments, questions, and requests</li>
              <li>Sending you technical notices, updates, and administrative messages</li>
              <li>Communicating with you about products, services, offers, and events</li>
              <li>Monitoring and analyzing trends, usage, and activities in connection with our services</li>
              <li>Detecting, investigating, and preventing fraudulent transactions and other illegal activities</li>
            </motion.ul>

            {/* ------------------------------------- Document & Data Security ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Document & Data Security
            </motion.h2>

            <motion.p variants={itemVariants}>
              We recognize the sensitive nature of academic and research materials. To
              protect the confidentiality, integrity, and availability of your submissions,
              we implement industry‑standard security measures, including:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>
                <strong>Encryption in transit & at rest:</strong> All data are transmitted over
                TLS 1.2 or higher and stored using AES‑256 encryption.
              </li>
              <li>
                <strong>Role‑based access control (RBAC):</strong> Only authorized personnel with a
                demonstrable need have access to your files, governed by signed
                confidentiality agreements.
              </li>
              <li>
                <strong>Secure cloud infrastructure:</strong> Documents are processed on AWS & Google
                Cloud regions that meet ISO 27001, SOC 2 Type II, and GDPR security
                standards.
              </li>
              <li>
                <strong>Continuous monitoring & logging:</strong> Real‑time alerts and audit logs help us
                detect and remediate suspicious activity.
              </li>
              <li>
                <strong>Annual penetration testing & vulnerability scans</strong> performed by
                independent security firms.
              </li>
            </motion.ul>

            {/* ------------------------------------- Data Retention & Automated Deletion ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Data Retention & Automated Deletion
            </motion.h2>

            <motion.p variants={itemVariants}>
              We retain your manuscripts, datasets, and related project files only for as
              long as necessary to deliver our services and comply with legal obligations.
              Unless you request otherwise, <strong>all project files are automatically deleted 30 days
              after project completion</strong> from our production systems. Encrypted backups
              containing your files are purged within 90 days.
            </motion.p>

            <motion.p variants={itemVariants} className="mt-4">
              You may request deletion sooner by emailing us at
              <a href="mailto:privacy@sciscribesolutions.com"> privacy@sciscribesolutions.com</a>.
              We will honor such requests within 5 business days, subject to applicable
              legal or regulatory retention requirements.
            </motion.p>

            {/* ------------------------------------- Confidentiality & Staff Obligations ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Confidentiality & Staff Obligations
            </motion.h2>

            <motion.p variants={itemVariants}>
              All editors, statisticians, and technical staff are bound by strict
              confidentiality agreements that prohibit unauthorized disclosure of client
              content. Access to live data is logged and time‑boxed, and team members
              receive mandatory annual training on data protection best practices.
            </motion.p>

            {/* ------------------------------------- Sharing Your Information ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Sharing Your Information
            </motion.h2>

            <motion.p variants={itemVariants}>
              We do not sell, trade, or otherwise transfer your personally identifiable
              information to outside parties except in the following circumstances:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>
                To trusted third‑party service providers who help us operate our website and
                deliver services (e.g., secure payment processors, cloud hosting), subject
                to strict contractual data processing terms.
              </li>
              <li>To comply with legal obligations or enforce our agreements</li>
              <li>To protect the rights, property, or safety of SciScribe Solutions, our customers, or others</li>
              <li>
                In connection with, or during negotiations of, any merger, sale of company
                assets, financing, or acquisition
              </li>
            </motion.ul>

            {/* ------------------------------------- Your Rights & Choices ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Your Rights & Choices
            </motion.h2>

            <motion.p variants={itemVariants}>
              You have certain rights regarding the personal information we hold about you:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information in certain circumstances</li>
              <li>Restriction or objection to our processing of your personal information</li>
              <li>Data portability to receive your information in a structured, commonly used format</li>
            </motion.ul>

            {/* ------------------------------------- Cookies & Tracking Technologies ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Cookies & Tracking Technologies
            </motion.h2>

            <motion.p variants={itemVariants}>
              We use cookies and similar tracking technologies to collect information about
              your browsing activities over time and across different websites. You can
              control cookies through your browser settings and other tools.
            </motion.p>

            {/* ------------------------------------- Changes to This Privacy Policy ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Changes to This Privacy Policy
            </motion.h2>

            <motion.p variants={itemVariants}>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for other operational, legal, or regulatory reasons. The updated
              policy will be effective immediately upon posting on this page, and the date
              of the latest revision will be indicated at the top.
            </motion.p>

            {/* ------------------------------------- Contact Us ------------------------------------ */}
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Contact Us
            </motion.h2>

            <motion.p variants={itemVariants}>
              If you have any questions or concerns about our Privacy Policy, please contact
              us at:
            </motion.p>

            <motion.div variants={itemVariants} className="mt-4">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@sciscribesolutions.com">contact@sciscribesolutions.com</a>
              </p>
              <p>
                <strong>Phone:</strong> +919395582679
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Privacy;
