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
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { Linkedin, Twitter } from "lucide-react";
import LightningSeparator from "@/components/ui/lightningseparator";

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
              className="premium-card hover:border-sciscribe-gold/50 transition-all duration-500 flex flex-col shadow-lg border border-sciscribe-gold/10"
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
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Grammar & spelling corrections</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Basic language improvements</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Punctuation & formatting fixes</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Technical terminology consistency</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>3 weeks delivery</span></li>
              </ul>
              <div className="mt-auto">
                <Link to="/payment" className="w-full"><Button className="w-full btn-premium">Choose Plan</Button></Link>
              </div>
            </motion.div>
            {/* Enhance Package */}
            <motion.div 
              className="premium-card border-2 border-sciscribe-blue/50 relative flex flex-col shadow-xl scale-105 z-10"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 right-0 -mt-4 flex justify-center z-20">
                {/* Glow & Particle Effect Background */}
                <span className="relative inline-block">
                  {/* Particle Glow Background */}
                  <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
                    {/* Amber Glow */}
                    <span className="absolute w-[150%] h-[250%] rounded-full bg-gradient-to-br from-sciscribe-amber/30 to-sciscribe-gold/20 blur-2xl opacity-70 animate-pulse" style={{ top: '-60%', left: '-10%' }} />
                    {/* Particles */}
                    {[...Array(8)].map((_, i) => (
                      <span
                        key={i}
                        className="absolute rounded-full bg-sciscribe-amber/60 opacity-70 blur-md animate-particle"
                        style={{
                          width: `${10 + Math.random() * 10}px`,
                          height: `${10 + Math.random() * 10}px`,
                          left: `${10 + Math.random() * 80}%`,
                          top: `${10 + Math.random() * 80}%`,
                          animationDelay: `${i * 0.25}s`,
                          animationDuration: `${1.5 + Math.random()}s`,
                        }}
                      />
                    ))}
                  </span>
                  <span className="bg-gradient-to-r from-sciscribe-amber/80 to-sciscribe-gold/90 text-sciscribe-amber-900 text-xs font-bold uppercase py-1 px-4 rounded-full shadow-lg ring-2 ring-sciscribe-amber/40 backdrop-blur-sm drop-shadow-md relative">
                    Most Popular
                  </span>
                </span>
              </div>
              <div className="mb-6 mt-8">
                <h3 className="text-xl font-bold mb-2">Impact Package</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹10,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($120)</span>
                </div>
                <p className="text-sm text-muted-foreground">Comprehensive editing with structural improvements</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" /><span>Everything in Insight Package</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" /><span>Advanced language enhancement</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" /><span>Structure & flow improvements</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" /><span>Scientific clarity optimization</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" /><span>References formatting</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-blue mr-2 mt-0.5" /><span>2 weeks delivery</span></li>
              </ul>
              <div className="mt-auto">
                <Link to="/payment" className="w-full"><Button className="w-full bg-sciscribe-blue hover:bg-sciscribe-blue/80 btn-premium">Choose Plan</Button></Link>
              </div>
            </motion.div>
            {/* Complete Package */}
            <motion.div 
              className="premium-card hover:border-sciscribe-gold/50 transition-all duration-500 flex flex-col shadow-lg border border-sciscribe-gold/10"
              variants={itemVariants}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Enhance Package</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">₹15,000</span>
                  <span className="text-lg text-muted-foreground ml-1 mb-1">($180)</span>
                </div>
                <p className="text-sm text-muted-foreground">Full-service editing and journal submission support</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Everything in Impact Package</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Standard Statistical Analysis</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Standard Plots and Graphs</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Journal formatting & Cover letter writing</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span><TooltipProvider><Tooltip><TooltipTrigger className="flex items-center underline decoration-dotted underline-offset-2">Reviewer response support<HelpCircle className="h-3 w-3 ml-1" /></TooltipTrigger><TooltipContent><p className="max-w-xs">Assistance with responding to reviewer comments and manuscript revisions after initial submission.</p></TooltipContent></Tooltip></TooltipProvider></span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Journal selection guidance</span></li>
                <li className="flex items-start"><Check className="h-5 w-5 text-sciscribe-gold mr-2 mt-0.5" /><span>Priority 7-day delivery</span></li>
              </ul>
              <div className="mt-auto">
                <Link to="/payment" className="w-full"><Button className="w-full btn-premium">Choose Plan</Button></Link>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Comparison Table */}
        <section className="section-container py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Compare Our Packages</h2>
            <div className="overflow-x-auto rounded-xl shadow-lg ring-1 ring-sciscribe-blue/10">
              <Table className="bg-white dark:bg-sciscribe-navy/70 border border-sciscribe-blue/10 text-base">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-gold/10 sticky top-0 z-10">
                    <TableHead className="py-4 px-6 text-left text-lg font-semibold text-sciscribe-blue">Feature / Service</TableHead>
                    <TableHead className="py-4 px-6 text-center text-lg font-semibold">Insight Package<br/><span className='font-normal'>(₹5,000+)</span></TableHead>
                    <TableHead className="py-4 px-6 text-center text-lg font-semibold">Impact Package<br/><span className='font-normal'>(₹10,000+)</span></TableHead>
                    <TableHead className="py-4 px-6 text-center text-lg font-semibold">Enhance Package<br/><span className='font-normal'>(₹15,000+)</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ideal For</TableCell>
                    <TableCell className="text-center">Light corrections & cleanup</TableCell>
                    <TableCell className="text-center">Structural improvement & stylistic polishing</TableCell>
                    <TableCell className="text-center">Final-stage submission, Journal-ready</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Grammar & Spell Check</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Basic Language Correction & Readability</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Formatting to General Academic Structure</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Citation Alignment (APA/MLA/Vancouver)</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Paragraph Restructuring</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tone, Style, and Transition Refinement</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bibliography Cleanup</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Advanced Statistical Analysis</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Individualised Plots and Graphs</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Editorial Feedback & Comments</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Revision Cycles Included</TableCell>
                    <TableCell className="text-center">1 revision</TableCell>
                    <TableCell className="text-center">2 revisions (15-day window)</TableCell>
                    <TableCell className="text-center">3 revisions (15-day window)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Priority Support</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fast-Track Delivery (48–72 hrs)</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">Optional (Add-On)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Editing Certificate</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">❌</TableCell>
                    <TableCell className="text-center">✅</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
        <LightningSeparator />
        {/* Service Comparison Section */}
        <section className="section-container py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2 bg-gradient-to-r from-sciscribe-blue/70 to-sciscribe-gold/70 bg-clip-text text-transparent drop-shadow-md">
              Why Choose SciScribe Over the Rest?
            </h2>
            <p className="mb-10 text-center text-lg text-sciscribe-navy/90 dark:text-white/80 max-w-3xl mx-auto">
              <span className="font-semibold text-sciscribe-gold">See how SciScribe Solutions outshines the competition.</span> Our expert team, transparent pricing, and premium features set us apart from generic editing providers. We deliver <span className="font-semibold text-sciscribe-blue">real academic impact</span>—not just corrections. Compare below and discover why leading researchers trust us to elevate their work.
            </p>
            <div className="overflow-x-auto rounded-xl shadow ring-1 ring-sciscribe-blue/10">
              <Table className="min-w-[900px] bg-white dark:bg-sciscribe-navy/70 border border-sciscribe-blue/10 text-base">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-gold/10 sticky top-0 z-10">
                    <TableHead className="py-4 px-6 text-left text-base font-semibold text-sciscribe-blue">Service</TableHead>
                    <TableHead className="py-4 px-6 text-center text-base font-semibold">Manuscript Editing</TableHead>
                    <TableHead className="py-4 px-6 text-center text-base font-semibold">Statistical Analysis</TableHead>
                    <TableHead className="py-4 px-6 text-center text-base font-semibold">Figure Creation</TableHead>
                    <TableHead className="py-4 px-6 text-center text-base font-semibold">Journal Submission</TableHead>
                    <TableHead className="py-4 px-6 text-center text-base font-semibold">AI Assistance</TableHead>
                    <TableHead className="py-4 px-6 text-center text-base font-semibold">Pricing</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Editage */}
                  <TableRow className="hover:bg-sciscribe-blue/5 transition">
                    <TableCell className="font-semibold">Editage</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-yellow-500 font-medium">Limited</TableCell>
                    <TableCell className="text-center">$$$$</TableCell>
                  </TableRow>
                  {/* Enago */}
                  <TableRow className="hover:bg-sciscribe-blue/5 transition">
                    <TableCell className="font-semibold">Enago</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-red-500 font-medium">No</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-red-500 font-medium">No</TableCell>
                    <TableCell className="text-center">$$$</TableCell>
                  </TableRow>
                  {/* Wordvice */}
                  <TableRow className="hover:bg-sciscribe-blue/5 transition">
                    <TableCell className="font-semibold">Wordvice</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-yellow-500 font-medium">Basic/None</TableCell>
                    <TableCell className="text-center text-red-500 font-medium">No</TableCell>
                    <TableCell className="text-center text-yellow-500 font-medium">Limited</TableCell>
                    <TableCell className="text-center text-red-500 font-medium">No</TableCell>
                    <TableCell className="text-center">$$</TableCell>
                  </TableRow>
                  {/* AJE */}
                  <TableRow className="hover:bg-sciscribe-blue/5 transition">
                    <TableCell className="font-semibold">AJE <span className="text-xs text-muted-foreground">(Research Square)</span></TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-red-500 font-medium">No</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-red-500 font-medium">No</TableCell>
                    <TableCell className="text-center">$$$</TableCell>
                  </TableRow>
                  {/* Pubrica */}
                  <TableRow className="hover:bg-sciscribe-blue/5 transition">
                    <TableCell className="font-semibold">Pubrica</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Yes</TableCell>
                    <TableCell className="text-center text-red-500 font-medium">No</TableCell>
                    <TableCell className="text-center">$$$</TableCell>
                  </TableRow>
                  {/* SciScribe Solutions */}
                  <TableRow className="hover:bg-sciscribe-blue/10 bg-gradient-to-r from-sciscribe-gold/10 via-sciscribe-gold/0 to-sciscribe-blue/5 border-2 border-sciscribe-gold/50 transition">
                    <TableCell className="font-semibold">SciScribe Solutions</TableCell>
                    <TableCell className="text-center text-green-700 font-semibold">Yes</TableCell>
                    <TableCell className="text-center text-green-700 font-semibold">Yes</TableCell>
                    <TableCell className="text-center text-green-700 font-semibold">Yes</TableCell>
                    <TableCell className="text-center text-green-700 font-semibold">Yes</TableCell>
                    <TableCell className="text-center text-blue-600 font-semibold">In Progress</TableCell>
                    <TableCell className="text-center font-semibold">$$</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Add-on Services */}
        <section className="bg-white/50 dark:bg-sciscribe-navy/30 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Add-On Services</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Plagiarism Check & Reduction */}
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(180, 120, 32, 0.18)" }}
                whileTap={{ scale: 0.98 }}
                className="group premium-card flex flex-col border-2 border-transparent hover:border-sciscribe-gold/60 bg-white/90 dark:bg-sciscribe-navy/80 hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sciscribe-gold/10 to-sciscribe-amber/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Search className="h-6 w-6 text-sciscribe-gold group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-sciscribe-gold transition-colors">Plagiarism Check & Reduction</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 group-hover:text-sciscribe-gold/80 transition-colors">
                  Thorough similarity checks with precise rewriting suggestions to ensure originality without compromising scientific clarity.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="group-hover:bg-sciscribe-gold group-hover:text-white transition-colors">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>

              {/* Journal Formatting */}
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(180, 120, 32, 0.18)" }}
                whileTap={{ scale: 0.98 }}
                className="group premium-card flex flex-col border-2 border-transparent hover:border-sciscribe-gold/60 bg-white/90 dark:bg-sciscribe-navy/80 hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sciscribe-gold/10 to-sciscribe-amber/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-sciscribe-gold group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-sciscribe-gold transition-colors">Journal Formatting</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 group-hover:text-sciscribe-gold/80 transition-colors">
                  We format your manuscript to match your target journal's specifications—citations, layout, figures, and all.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="group-hover:bg-sciscribe-gold group-hover:text-white transition-colors">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Cover Letter & Abstract Editing */}
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(180, 120, 32, 0.18)" }}
                whileTap={{ scale: 0.98 }}
                className="group premium-card flex flex-col border-2 border-transparent hover:border-sciscribe-gold/60 bg-white/90 dark:bg-sciscribe-navy/80 hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sciscribe-gold/10 to-sciscribe-amber/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-sciscribe-gold group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-sciscribe-gold transition-colors">Cover Letter & Abstract Editing</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 group-hover:text-sciscribe-gold/80 transition-colors">
                  Polished, impactful abstracts and cover letters tailored for clarity, tone, and submission success.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="group-hover:bg-sciscribe-gold group-hover:text-white transition-colors">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Statistical Analysis */}
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(180, 120, 32, 0.18)" }}
                whileTap={{ scale: 0.98 }}
                className="group premium-card flex flex-col border-2 border-transparent hover:border-sciscribe-gold/60 bg-white/90 dark:bg-sciscribe-navy/80 hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sciscribe-gold/10 to-sciscribe-amber/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <BarChart4 className="h-6 w-6 text-sciscribe-gold group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-sciscribe-gold transition-colors">Statistical Analysis</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 group-hover:text-sciscribe-gold/80 transition-colors">
                  Accurate, publication-ready analysis—from basic stats to advanced models—delivered with full methodological transparency.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="group-hover:bg-sciscribe-gold group-hover:text-white transition-colors">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Scientific Figures & Diagrams */}
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(180, 120, 32, 0.18)" }}
                whileTap={{ scale: 0.98 }}
                className="group premium-card flex flex-col border-2 border-transparent hover:border-sciscribe-gold/60 bg-white/90 dark:bg-sciscribe-navy/80 hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sciscribe-gold/10 to-sciscribe-amber/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6 text-sciscribe-gold group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-sciscribe-gold transition-colors">Scientific Figures & Diagrams</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 group-hover:text-sciscribe-gold/80 transition-colors">
                  Clean, professional visuals including data figures, flowcharts, and study diagrams built to meet publication standards.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="group-hover:bg-sciscribe-gold group-hover:text-white transition-colors">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
              
              {/* Fast-Track Delivery */}
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(180, 120, 32, 0.18)" }}
                whileTap={{ scale: 0.98 }}
                className="group premium-card flex flex-col border-2 border-transparent hover:border-sciscribe-gold/60 bg-white/90 dark:bg-sciscribe-navy/80 hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sciscribe-gold/10 to-sciscribe-amber/10 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Clock className="h-6 w-6 text-sciscribe-gold group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-sciscribe-gold transition-colors">Fast-Track Delivery</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4 group-hover:text-sciscribe-gold/80 transition-colors">
                  Priority editing or formatting delivered within 3 – 5 business days—ideal for urgent submissions.
                </p>
                <div className="flex items-center justify-end mt-auto">
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="group-hover:bg-sciscribe-gold group-hover:text-white transition-colors">Add to Order</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Add-on pricing note */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground italic">
                Add-on service prices are customized based on your specific requirements. Please <Link to="/contact" className="underline text-sciscribe-gold hover:text-sciscribe-amber">contact us</Link> for a detailed quote.
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

        {/* TESTIMONIALS SECTION */}
        <LightningSeparator />
        <section className="section-container pt-10">
          <TestimonialsSection />
        </section>

        {/* Custom Quote */}
        <section className="relative bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-teal/10 dark:from-sciscribe-blue/20 dark:to-sciscribe-teal/20 pt-0 pb-18 overflow-visible">
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              className="max-w-2xl mx-auto rounded-xl shadow-xl px-8 py-10 backdrop-blur-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-sciscribe-navy dark:text-white">Need a Custom Quote?</h2>
              <p className="mb-8 text-base text-muted-foreground">
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
                      <Button type="submit" className="bg-sciscribe-gold hover:bg-sciscribe-gold/80">
                        Submit Request
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
            {/* Decorative gold glow behind the card for visual pop */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] z-0" aria-hidden>
              <div className="w-full h-full bg-gradient-radial from-sciscribe-gold/25 via-sciscribe-gold/8 to-transparent rounded-3xl blur-[88px] opacity-70" />
            </div>
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
        <LightningSeparator />
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

        {/* SOCIALS CALL-TO-ACTION SECTION */}
        <section className="section-container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sciscribe-navy dark:text-white">
              Connect With Us
            </h2>
            <p className="mb-8 text-lg text-sciscribe-navy/80 dark:text-white/80">
              Follow SciScribe Solutions for updates, insights, and academic tips.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://linkedin.com/company/sciscribesolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-white/10 p-4 transition-colors hover:bg-sciscribe-gold/80 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-7 w-7 text-sciscribe-navy group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com/sciscribesoln"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-white/10 p-4 transition-colors hover:bg-sciscribe-gold/80 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold"
                aria-label="Twitter"
              >
                <Twitter className="h-7 w-7 text-sciscribe-navy group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com/sciscribesolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-white/10 p-4 transition-colors hover:bg-sciscribe-gold/80 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold"
                aria-label="Instagram"
              >
                <svg className="h-7 w-7 text-sciscribe-navy group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      
      <style>
        {`
:global(@keyframes particle) {
  0% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-8px) scale(1.1); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 0.7; }
}
.animate-particle { animation: particle 2s infinite ease-in-out; }
.glint {
  background: radial-gradient(ellipse 30% 100% at 50% 50%, rgba(255, 230, 120, 0.95) 0%, rgba(255, 230, 120, 0.6) 30%, rgba(255, 230, 120, 0.15) 70%, rgba(255, 230, 120, 0) 100%);
  filter: blur(2.5px);
  opacity: 0.92;
  transition: opacity 0.7s, filter 0.7s;
  pointer-events: none;
  z-index: 20;
}
.dark .glint {
  background: radial-gradient(ellipse 30% 100% at 50% 50%, rgba(255, 230, 120, 0.85) 0%, rgba(255, 230, 120, 0.4) 30%, rgba(255, 230, 120, 0.12) 70%, rgba(255, 230, 120, 0) 100%);
}
@media (max-width: 600px) {
  .my-10 { margin-top: 1.5rem !important; margin-bottom: 1.5rem !important; }
}
`}
      </style>
    </div>
  );
};

export default Pricing;
