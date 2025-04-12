
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Pricing = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCustomQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Quote request submitted:", { name, email, projectDetails, wordCount });
    setDialogOpen(false);
    // Reset form
    setName("");
    setEmail("");
    setProjectDetails("");
    setWordCount("");
    // Show success message (in a real app, you'd use a toast notification)
    alert("Your quote request has been submitted. We'll contact you shortly!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="dark:bg-sciscribe-navy/5 pt-24">
        {/* Hero Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 dark:text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Quality scientific editing and consultancy at competitive rates
            </motion.p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section-container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Starter Edit Package */}
            <motion.div 
              className="premium-card hover:border-sciscribe-gold/50 transition-all duration-500 flex flex-col"
              variants={itemVariants}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Starter Edit</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹5,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($60)</span>
                </div>
                <p className="text-sm text-muted-foreground">For basic language polishing and corrections</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Grammar & spelling corrections</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Basic language improvements</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Punctuation & formatting fixes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>7-day delivery</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Link to="/payment" className="w-full">
                  <Button className="w-full btn-premium">Choose Plan</Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Premium Edit Package */}
            <motion.div 
              className="premium-card border-sciscribe-blue/30 relative flex flex-col"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 right-0 -mt-4 flex justify-center">
                <span className="bg-sciscribe-blue text-white text-xs font-bold uppercase py-1 px-4 rounded-full">Most Popular</span>
              </div>
              
              <div className="mb-6 mt-4">
                <h3 className="text-xl font-bold mb-2">Premium Edit</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹10,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($120)</span>
                </div>
                <p className="text-sm text-muted-foreground">Comprehensive editing with structural improvements</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" />
                  <span>Everything in Starter Edit</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" />
                  <span>Advanced language enhancement</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" />
                  <span>Structure & flow improvements</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" />
                  <span>Scientific clarity optimization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" />
                  <span>Consistency in terminology</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" />
                  <span>5-day delivery</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Link to="/payment" className="w-full">
                  <Button className="w-full bg-sciscribe-blue hover:bg-sciscribe-blue/80 btn-premium">Choose Plan</Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Publication Support Package */}
            <motion.div 
              className="premium-card hover:border-sciscribe-gold/50 transition-all duration-500 flex flex-col"
              variants={itemVariants}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Publication Support</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹15,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($180)</span>
                </div>
                <p className="text-sm text-muted-foreground">Full-service editing and journal submission support</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Everything in Premium Edit</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Cover letter writing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Journal formatting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center underline decoration-dotted underline-offset-2">
                          Reviewer response support
                          <HelpCircle className="h-3 w-3 ml-1" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Assistance with responding to reviewer comments and manuscript revisions after initial submission.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Journal selection guidance</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Priority 5-day delivery</span>
                </li>
              </ul>
              
              <div className="mt-auto">
                <Link to="/payment" className="w-full">
                  <Button className="w-full btn-premium">Choose Plan</Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Custom Quote */}
        <section className="bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-teal/10 dark:from-sciscribe-blue/20 dark:to-sciscribe-teal/20 py-16">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Need a Custom Quote?</h2>
              <p className="mb-8">
                Have a unique project or specific requirements? Let us create a tailored solution just for you.
              </p>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-premium pulse-btn">Request Custom Quote</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request a Custom Quote</DialogTitle>
                    <DialogDescription>
                      Tell us about your project, and we'll get back to you with a tailored price quote.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCustomQuoteSubmit} className="space-y-4 mt-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium block mb-1">
                        Name
                      </label>
                      <Input 
                        id="name"
                        placeholder="Your full name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium block mb-1">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <label htmlFor="wordCount" className="text-sm font-medium block mb-1">
                        Approximate Word Count
                      </label>
                      <Input 
                        id="wordCount" 
                        placeholder="e.g., 5000" 
                        value={wordCount} 
                        onChange={(e) => setWordCount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="projectDetails" className="text-sm font-medium block mb-1">
                        Project Details
                      </label>
                      <Textarea 
                        id="projectDetails" 
                        placeholder="Please describe your project and specific requirements..." 
                        value={projectDetails} 
                        onChange={(e) => setProjectDetails(e.target.value)}
                        rows={4}
                        required 
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button type="submit" className="bg-sciscribe-blue hover:bg-sciscribe-blue/80">
                        Submit Request
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">How do I determine which package is right for me?</h3>
                <p className="text-muted-foreground">Choose the Starter Edit for basic language polishing, Premium Edit for comprehensive improvements, or Publication Support if you need full assistance with journal submission and reviewer responses.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept payments via UPI, bank transfer, and all major credit cards through secure payment gateways. Detailed payment instructions are provided at checkout.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">Do you offer rush services?</h3>
                <p className="text-muted-foreground">Yes, we offer expedited services for urgent projects at an additional fee. Please contact us directly to discuss your timeline requirements.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">Are there any hidden fees?</h3>
                <p className="text-muted-foreground">No, our pricing is transparent with no hidden costs. The price quoted is the final amount you'll pay, with all included services clearly specified.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
