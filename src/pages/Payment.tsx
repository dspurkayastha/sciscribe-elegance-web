
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, CreditCard, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // In a real implementation, this would include package information from your payment gateway
  const handlePayment = () => {
    if (!selectedPlan) return;
    
    // In a real-world scenario, this would redirect to Razorpay or open Razorpay modal
    window.open("https://razorpay.com", "_blank");
  };

  return (
    <>
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
                Secure <span className="text-primary">Payment</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Complete your payment securely to access our professional editing services
              </motion.p>
            </motion.div>
            
            {/* Payment Selection */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {/* Starter Edit */}
              <motion.div 
                variants={itemVariants}
                className={`premium-card p-6 cursor-pointer ${selectedPlan === 'starter' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedPlan('starter')}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Starter Edit</h3>
                  {selectedPlan === 'starter' && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">₹4,500</span>
                  <span className="text-muted-foreground"> / manuscript</span>
                </div>
                <p className="text-muted-foreground mt-2">Basic language polishing for early drafts</p>
              </motion.div>
              
              {/* Premium Edit */}
              <motion.div 
                variants={itemVariants}
                className={`premium-card p-6 cursor-pointer ${selectedPlan === 'premium' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedPlan('premium')}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Premium Edit</h3>
                  {selectedPlan === 'premium' && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">₹8,900</span>
                  <span className="text-muted-foreground"> / manuscript</span>
                </div>
                <p className="text-muted-foreground mt-2">In-depth content and language improvement</p>
              </motion.div>
              
              {/* Publication Package */}
              <motion.div 
                variants={itemVariants}
                className={`premium-card p-6 cursor-pointer ${selectedPlan === 'publication' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedPlan('publication')}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Publication Package</h3>
                  {selectedPlan === 'publication' && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">₹14,900</span>
                  <span className="text-muted-foreground"> / manuscript</span>
                </div>
                <p className="text-muted-foreground mt-2">Full publication support including journal formatting</p>
              </motion.div>
            </motion.div>
            
            {/* Payment Button */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 text-center"
            >
              <Button 
                onClick={handlePayment} 
                disabled={!selectedPlan}
                className="btn-premium px-8 py-6 text-lg"
              >
                <CreditCard className="mr-2 h-5 w-5" /> Proceed to Payment
              </Button>
              <p className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
                <Shield className="mr-1 h-4 w-4" /> Secure payment powered by Razorpay
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="bg-secondary/30 dark:bg-secondary/10 py-16">
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
                    Is my payment information secure?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Absolutely. We use Razorpay, a PCI DSS compliant payment gateway that employs industry-standard encryption protocols to ensure your payment information is always secure. We never store your full credit card details on our servers.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    Do you offer any discounts for bulk orders?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, we offer special discounts for bulk orders and educational institutions. Please contact us directly at support@sciscribesolutions.com to discuss your specific requirements and we'll create a custom package for you.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">
                    What is your refund policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We strive for 100% customer satisfaction. If you're not completely satisfied with our services, please let us know within 7 days of delivery and we'll work to address your concerns. For more details, please check our <Link to="/refund" className="text-primary hover:underline">Refund Policy</Link>.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-medium">
                    Will I receive an invoice for my payment?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, an electronic invoice will be sent to your registered email address immediately after your payment is processed. You can also access your invoices anytime by contacting our support team.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-lg font-medium">
                    Do you offer payment in installments?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    For large projects and Publication Support packages, we may offer installment payment options. Please contact us directly to discuss this arrangement before placing your order.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="mt-8">
                <p className="text-center">Still have questions about payment? <Link to="/contact" className="text-primary hover:underline font-medium">Contact our support team <ArrowRight className="inline ml-1 h-4 w-4" /></Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Payment;
