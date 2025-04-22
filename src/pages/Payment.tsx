
import { motion } from "framer-motion";
import { CreditCard, Shield, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Seo from "@/components/ui/Seo";

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

const Payment = () => {
  // In a real implementation, this would redirect to Razorpay
  const handlePayment = () => {
    window.open("https://razorpay.com", "_blank");
  };

  return (
    <>
      <Seo
        title="Payment | SciScribe Solutions"
        description="Make a secure payment for your SciScribe Solutions project via our trusted Razorpay gateway. Read about payment security, invoice process, and frequently asked questions."
      />
      <InteractiveBackground />
      <Navbar />
      <main className="pt-20">
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center mb-12"
            >
              <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Secure Your <span className="text-primary">Payment</span> with Confidence
              </motion.h1>
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Complete your payment securely to access our professional editing services
              </motion.p>
            </motion.div>
            
            {/* Payment Process Section */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="premium-card mb-12"
            >
              <motion.h2 
                variants={itemVariants} 
                className="text-2xl font-bold mb-6 text-sciscribe-navy dark:text-white"
              >
                How Our Payment Process Works
              </motion.h2>
              
              <motion.div variants={itemVariants}>
                <p className="mb-4">
                  At SciScribe Solutions, we ensure full clarity and convenience in all payment matters.
                </p>
                <p className="mb-4">
                  Once your project details and services are finalized, our team will send you a detailed invoice along with a secure payment link via email.
                </p>
                <p className="mb-4">
                  If you have already received an invoice and payment link, you can complete your transaction easily through the button below.
                </p>
                <p className="mb-4">
                  If you have not yet received an invoice, please use the second button to request assistance.
                </p>
                <p className="mb-4">
                  We appreciate your trust and look forward to working together!
                </p>
              </motion.div>
            </motion.div>
            
            {/* Payment Buttons */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-8 mb-16"
            >
              <div className="premium-card flex flex-col items-center text-center p-8">
                <h3 className="text-xl font-bold mb-4">Ready to Pay?</h3>
                <p className="mb-6 text-muted-foreground">
                  Complete your secure transaction with our payment gateway partner
                </p>
                <Button 
                  onClick={handlePayment} 
                  className="btn-premium px-8 py-6 text-lg w-full"
                >
                  <CreditCard className="mr-2 h-5 w-5" /> Pay Securely
                </Button>
                <p className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                  <Shield className="mr-1 h-4 w-4" /> Secure payment powered by Razorpay
                </p>
              </div>
              
              <div className="premium-card flex flex-col items-center text-center p-8">
                <h3 className="text-xl font-bold mb-4">Haven't received your invoice yet?</h3>
                <p className="mb-6 text-muted-foreground">
                  Need assistance with payment or want to inquire about your invoice
                </p>
                <Link to="/contact" className="w-full">
                  <Button 
                    variant="outline"
                    className="btn-secondary-premium px-8 py-6 text-lg w-full"
                  >
                    Contact Us for Invoice
                  </Button>
                </Link>
                <p className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                  <HelpCircle className="mr-1 h-4 w-4" /> Our team will respond promptly
                </p>
              </div>
            </motion.div>
        
            {/* FAQ Section */}
            <section className="bg-secondary/30 dark:bg-secondary/10 py-16 rounded-xl">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Payment FAQs</h2>
                
                <div className="max-w-3xl mx-auto">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg font-medium">
                        What payment methods do you accept?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We accept all major credit and debit cards (Visa, Mastercard, American Express, Rupay), UPI payments, net banking, and wallet payments through our secure payment gateway, Razorpay.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-lg font-medium">
                        How does the invoice and payment process work?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        After discussing your project requirements, we'll send you a personalized quote. Once approved, you'll receive an invoice with a secure payment link. Simply follow the link to complete your payment through our secure gateway.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-lg font-medium">
                        Is my payment information secure?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Absolutely. We use Razorpay, a PCI DSS compliant payment gateway that employs industry-standard encryption protocols to ensure your payment information is always secure. We never store your full credit card details on our servers.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-lg font-medium">
                        Do you offer any discounts for bulk orders?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, we offer special discounts for bulk orders and educational institutions. Please contact us directly at support@sciscribesolutions.com to discuss your specific requirements and we'll create a custom package for you.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-lg font-medium">
                        What is your refund policy?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We strive for 100% customer satisfaction. If you're not completely satisfied with our services, please let us know within 7 days of delivery and we'll work to address your concerns. For more details, please check our <Link to="/refund" className="text-primary hover:underline">Refund Policy</Link>.
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-lg font-medium">
                        Will I receive an invoice for my payment?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, an electronic invoice will be sent to your registered email address immediately after your payment is processed. You can also access your invoices anytime by contacting our support team.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-8">
                    <p className="text-center">Still have questions about payment? <Link to="/contact" className="text-primary hover:underline font-medium">Contact our support team <ArrowRight className="inline ml-1 h-4 w-4" /></Link></p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Payment;
