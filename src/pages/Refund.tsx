
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

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

const Refund = () => {
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
              Refund Policy
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              Last Updated: April 12, 2025
            </motion.p>
            
            <motion.div variants={itemVariants} className="bg-primary/10 p-6 rounded-lg mb-8">
              <p className="font-medium">
                At SciScribe Solutions, customer satisfaction is our priority. This Refund Policy outlines the 
                conditions under which we issue refunds for our services.
              </p>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Eligibility for Refunds
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              We provide refunds in the following situations:
            </motion.p>
            
            <motion.ol variants={itemVariants} className="space-y-2 mt-4">
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
            </motion.ol>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Refund Process
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              To request a refund:
            </motion.p>
            
            <motion.ol variants={itemVariants} className="space-y-2 mt-4">
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
            </motion.ol>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Non-Refundable Circumstances
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              Refunds are not provided in the following situations:
            </motion.p>
            
            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
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
            </motion.ul>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Special Consideration
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              In special circumstances not covered by our standard policy, we may consider refund requests 
              on a case-by-case basis. Our decision in these cases will be final.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Revision Policy
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              Before requesting a refund due to quality concerns, we encourage clients to use our revision 
              service:
            </motion.p>
            
            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>
                You can request revisions within 7 days of receiving your edited document.
              </li>
              <li>
                We provide up to two rounds of revisions at no additional cost.
              </li>
              <li>
                Revision requests must be specific and related to the original scope of work.
              </li>
            </motion.ul>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Payment Processing Fees
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              Please note that payment gateway charges (typically 2-3%) are non-refundable even in the case 
              of a full refund, as these are charges imposed by payment processors that we cannot recover.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              Changes to This Policy
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              We reserve the right to modify this Refund Policy at any time. Changes will be effective 
              immediately upon posting on our website. Your continued use of our services after the posting 
              of changes constitutes your acceptance of such changes.
            </motion.p>
            
            <motion.div variants={itemVariants} className="mt-12 p-6 bg-secondary/30 dark:bg-secondary/10 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p>
                If you have any questions about our refund policy or need assistance with a refund request, 
                please don't hesitate to contact our customer support team:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> refunds@sciscribesolutions.com<br />
                <strong>Phone:</strong> +91 12345 67890<br />
                Or visit our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>
              </p>
            </motion.div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Refund;
