
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Check, HelpCircle, FileText, Search, BarChart4, TrendingUp, Clock } from "lucide-react";
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
            {/* Insight Package */}
            <motion.div 
              className="premium-card hover:border-sciscribe-gold/50 transition-all duration-500 flex flex-col"
              variants={itemVariants}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Insight Package</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹5,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($60)</span>
                </div>
                <p className="text-sm text-muted-foreground">For manuscripts in the early draft stage</p>
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
                  <span>Technical term consistency</span>
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
            
            {/* Enhance Package */}
            <motion.div 
              className="premium-card border-sciscribe-blue/30 relative flex flex-col"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 right-0 -mt-4 flex justify-center">
                <span className="bg-sciscribe-blue text-white text-xs font-bold uppercase py-1 px-4 rounded-full">Most Popular</span>
              </div>
              
              <div className="mb-6 mt-4">
                <h3 className="text-xl font-bold mb-2">Enhance Package</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹10,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($120)</span>
                </div>
                <p className="text-sm text-muted-foreground">Comprehensive editing with structural improvements</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" />
                  <span>Everything in Insight Package</span>
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
                  <span>References formatting</span>
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
            
            {/* Complete Package */}
            <motion.div 
              className="premium-card hover:border-sciscribe-gold/50 transition-all duration-500 flex flex-col"
              variants={itemVariants}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Complete Package</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹15,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($180)</span>
                </div>
                <p className="text-sm text-muted-foreground">Full-service editing and journal submission support</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" />
                  <span>Everything in Enhance Package</span>
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

        {/* Add-on Services */}
        <section className="bg-white/50 dark:bg-sciscribe-navy/30 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Add-On Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Plagiarism Check & Reduction */}
              <motion.div 
                className="premium-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sciscribe-light rounded-full flex items-center justify-center mr-4">
                    <Search className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <h3 className="text-lg font-bold">Plagiarism Check & Reduction</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Thorough similarity checks with precise rewriting suggestions to ensure originality without compromising scientific clarity.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>

              {/* Journal Formatting */}
              <motion.div 
                className="premium-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sciscribe-light rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <h3 className="text-lg font-bold">Journal Formatting</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  We format your manuscript to match your target journal's specifications—citations, layout, figures, and all.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Cover Letter & Abstract Editing */}
              <motion.div 
                className="premium-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sciscribe-light rounded-full flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <h3 className="text-lg font-bold">Cover Letter & Abstract Editing</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Polished, impactful abstracts and cover letters tailored for clarity, tone, and submission success.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Statistical Analysis */}
              <motion.div 
                className="premium-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sciscribe-light rounded-full flex items-center justify-center mr-4">
                    <BarChart4 className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <h3 className="text-lg font-bold">Statistical Analysis</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Accurate, publication-ready analysis—from basic stats to advanced models—delivered with full methodological transparency.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Scientific Figures & Diagrams */}
              <motion.div 
                className="premium-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sciscribe-light rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <h3 className="text-lg font-bold">Scientific Figures & Diagrams</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Clean, professional visuals including data figures, flowcharts, and study diagrams built to meet publication standards.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Fast-Track Delivery */}
              <motion.div 
                className="premium-card flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-sciscribe-light rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <h3 className="text-lg font-bold">Fast-Track Delivery</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Priority editing or formatting delivered within 3 – 5 business days—ideal for urgent submissions.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Add-on pricing note */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground italic">
                Add-on service prices are customized based on your specific requirements. Please contact us for a detailed quote.
              </p>
            </div>
            
            {/* "Can't find what you're looking for?" section */}
            <div className="mt-16 max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-bold mb-4">Cannot find what you're looking for?</h3>
              <p className="mb-6 text-muted-foreground">
                We understand that every research project is unique. If you need a service that's not listed here, feel free to reach out. Our team would be happy to discuss your specific requirements and tailor a solution that fits your goals.
              </p>
              <Link to="/contact">
                <Button className="btn-premium">Contact Us</Button>
              </Link>
            </div>
          </div>
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

        {/* Note about pricing variation */}
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-muted-foreground italic">
            Note: The final quote will be based on specific project requirements and may vary from one project to the next.
            Please contact us for a precise quote tailored to your needs.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">How do I determine which package is right for me?</h3>
                <p className="text-muted-foreground">Choose the Insight Package for basic language polishing, Enhance Package for comprehensive improvements, or Complete Package if you need full assistance with journal submission and reviewer responses.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept payments via UPI, bank transfer, and all major credit cards through secure payment gateways. Detailed payment instructions are provided at checkout.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">Do you offer rush services?</h3>
                <p className="text-muted-foreground">Yes, we offer expedited services for urgent projects with our Fast-Track Delivery add-on. This ensures your project gets priority attention while maintaining quality.</p>
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
