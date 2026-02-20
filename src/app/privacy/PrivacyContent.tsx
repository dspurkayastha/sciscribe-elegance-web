"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    }
  }
};

const PrivacyContent = () => {
  const { logPageView } = useAnalytics();

  // Track page view when component mounts
  useEffect(() => {
    logPageView('/privacy');
  }, [logPageView]);

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <section className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="prose prose-lg dark:prose-invert max-w-3xl mx-auto"
          >
            <motion.h1 variants={itemVariants} className="text-center text-3xl md:text-4xl font-bold mb-8">
              Privacy Policy
            </motion.h1>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              Last Updated: April 12, 2025
            </motion.p>

            <motion.p variants={itemVariants}>
              At SciScribe Solutions, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
            </motion.p>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Information We Collect
            </motion.h2>

            <motion.p variants={itemVariants}>
              We collect information that you provide directly to us when you:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>Register for an account</li>
              <li>Submit manuscripts for editing</li>
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
              <li>The content of manuscripts and documents you submit for editing</li>
            </motion.ul>

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

            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Confidentiality and Security
            </motion.h2>

            <motion.p variants={itemVariants}>
              We understand the sensitive nature of academic and research manuscripts. All documents submitted
              to SciScribe Solutions are treated with the strictest confidentiality. Our editors and staff are
              bound by confidentiality agreements, and we implement appropriate technical and organizational
              measures to protect your information.
            </motion.p>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Sharing Your Information
            </motion.h2>

            <motion.p variants={itemVariants}>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside
              parties except in the following circumstances:
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>To our third-party service providers who help us operate our website and deliver services (e.g., payment processors)</li>
              <li>To comply with legal obligations or enforce our agreements</li>
              <li>To protect the rights, property, or safety of SciScribe Solutions, our customers, or others</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
            </motion.ul>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Your Rights and Choices
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

            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Cookies and Tracking Technologies
            </motion.h2>

            <motion.p variants={itemVariants}>
              We use cookies and similar tracking technologies to collect information about your browsing
              activities over time and across different websites. You can control cookies through your browser
              settings and other tools.
            </motion.p>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Changes to This Privacy Policy
            </motion.h2>

            <motion.p variants={itemVariants}>
              We may update this Privacy Policy from time to time to reflect changes in our practices or for
              other operational, legal, or regulatory reasons. The updated policy will be effective immediately
              upon posting on this page, and the date of the latest revision will be indicated at the top.
            </motion.p>

            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Contact Us
            </motion.h2>

            <motion.p variants={itemVariants}>
              If you have any questions or concerns about our Privacy Policy, please contact us at:
            </motion.p>

            <motion.div variants={itemVariants} className="mt-4">
              <p><strong>Email:</strong> contact@sciscribesolutions.com</p>
              <p><strong>Phone:</strong> +91 93955 82679</p>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyContent;
