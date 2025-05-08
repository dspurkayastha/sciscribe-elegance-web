
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

const Terms = () => {
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
              Terms and Conditions
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              Last Updated: April 12, 2025
            </motion.p>
            
            <motion.p variants={itemVariants}>
              Welcome to SciScribe Solutions. These Terms and Conditions govern your use of our website 
              and services. By accessing or using our services, you agree to be bound by these Terms.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              1. Services Description
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              SciScribe Solutions provides academic editing, proofreading, and publication support services 
              for researchers, academics, and professionals. Our services are offered on an online-only basis, 
              and we do not provide physical delivery of any materials or products.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              2. User Accounts
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              To access certain services, you may be required to create an account. You are responsible for 
              maintaining the confidentiality of your account credentials and for all activities that occur 
              under your account. You agree to notify us immediately of any unauthorized use of your account.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              3. Service Orders and Delivery
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              By placing an order for our services, you agree to:
            </motion.p>
            
            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>Provide accurate and complete information about your project</li>
              <li>Pay the agreed-upon fees for the services</li>
              <li>Cooperate with reasonable requests for clarification during the editing process</li>
            </motion.ul>
            
            <motion.p variants={itemVariants} className="mt-4">
              We will make our best efforts to deliver services within the estimated timeframe. However, exact 
              delivery times may vary depending on the complexity of the project, the volume of work, and other 
              factors. Any delivery timeframes provided are estimates and not guaranteed delivery dates.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              4. Payment Terms
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              Payment for our services is required in advance or as specified in your service agreement. We 
              accept payments through our secure payment gateway. All prices are listed in Indian Rupees (₹) 
              unless otherwise specified and are inclusive of applicable taxes.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              5. Ownership and Copyright
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              You retain ownership of all original content and materials you submit to us. By submitting content 
              for editing, you represent that you have the right to do so and that the content does not infringe 
              on any third-party rights.
            </motion.p>
            
            <motion.p variants={itemVariants} className="mt-4">
              We do not claim ownership of your content. However, you grant us a limited license to use your 
              content for the purpose of providing our services.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              6. Confidentiality
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              We understand the sensitive nature of academic and research manuscripts. All documents submitted to 
              SciScribe Solutions are treated with strict confidentiality. We will not share, distribute, or 
              publish your content without your explicit permission, except as required to provide our services.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              7. Satisfaction Guarantee and Revisions
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              We strive to provide high-quality services. If you are not satisfied with our work, you may request 
              revisions within 7 days of delivery. We will make reasonable efforts to address your concerns and 
              make necessary revisions at no additional cost, provided that the revision requests are within the 
              scope of the original order.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              8. Limitation of Liability
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              To the maximum extent permitted by law, SciScribe Solutions shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible 
              losses resulting from:
            </motion.p>
            
            <motion.ul variants={itemVariants} className="space-y-2 mt-4">
              <li>Your use or inability to use our services</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any errors or omissions in our services</li>
              <li>Any interruption or cessation of transmission to or from our services</li>
            </motion.ul>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              9. Intellectual Property Rights
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              The SciScribe Solutions website and its contents, features, and functionality, including but not 
              limited to text, graphics, logos, icons, images, audio clips, and software, are owned by SciScribe 
              Solutions and are protected by copyright, trademark, and other intellectual property laws.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              10. Termination
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              We may terminate or suspend your access to our services immediately, without prior notice or 
              liability, for any reason whatsoever, including without limitation if you breach these Terms 
              and Conditions.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              11. Changes to Terms
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              We reserve the right to modify or replace these Terms at any time. The most current version will 
              be posted on our website with the effective date.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              12. Governing Law
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              These Terms shall be governed by and construed in accordance with the laws of India, without 
              regard to its conflict of law provisions.
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mt-8 mb-4">
              13. Contact Us
            </motion.h2>
            
            <motion.p variants={itemVariants}>
              If you have any questions about these Terms, please contact us at:
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

export default Terms;
