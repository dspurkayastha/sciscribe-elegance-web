
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Award, CheckCircle, Heart, Target } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About SciScribe Solutions
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 dark:text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Elevating research through expert editing and consultancy
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-white/50 dark:bg-sciscribe-navy/30 py-16">
          <div className="container mx-auto px-6">
            <motion.div 
              className="grid md:grid-cols-2 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className="premium-card" variants={itemVariants}>
                <div className="mb-4 flex items-center">
                  <Target className="text-sciscribe-blue mr-3" size={28} />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p>
                  At SciScribe Solutions, our mission is to elevate the quality and impact of scientific research by offering premium editing services and consultancy. We believe that great research deserves excellent presentation, and we're committed to helping researchers communicate their findings with clarity, precision, and impact.
                </p>
              </motion.div>

              <motion.div className="premium-card" variants={itemVariants}>
                <div className="mb-4 flex items-center">
                  <Heart className="text-sciscribe-blue mr-3" size={28} />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p>
                  We envision a scientific community where language barriers and presentation challenges no longer impede the sharing of groundbreaking research. Our vision is to become the trusted partner for researchers worldwide, empowering them to share their knowledge effectively and increase the global impact of their scientific contributions.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h2>

            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="integrity" className="border-sciscribe-mist/50 dark:border-white/10">
                  <AccordionTrigger className="hover:bg-white/50 dark:hover:bg-sciscribe-navy/20 hover:no-underline px-4 py-4 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="text-sciscribe-gold mr-3" size={24} />
                      <span className="text-xl font-semibold">Integrity</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3">
                    <p className="ml-9">We maintain the highest standards of honesty and ethical practice. Our edits preserve the author's original meaning and scientific integrity, while enhancing clarity and readability.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="excellence" className="border-sciscribe-mist/50 dark:border-white/10">
                  <AccordionTrigger className="hover:bg-white/50 dark:hover:bg-sciscribe-navy/20 hover:no-underline px-4 py-4 rounded-lg">
                    <div className="flex items-center">
                      <Award className="text-sciscribe-gold mr-3" size={24} />
                      <span className="text-xl font-semibold">Excellence</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3">
                    <p className="ml-9">We are committed to delivering exceptional quality in every project. Our team consists of experienced editors with advanced degrees and specialized knowledge across various scientific disciplines.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="confidentiality" className="border-sciscribe-mist/50 dark:border-white/10">
                  <AccordionTrigger className="hover:bg-white/50 dark:hover:bg-sciscribe-navy/20 hover:no-underline px-4 py-4 rounded-lg">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sciscribe-gold mr-3">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span className="text-xl font-semibold">Confidentiality</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3">
                    <p className="ml-9">We respect the sensitive nature of unpublished research. All manuscripts and communications are treated with strict confidentiality, ensuring your work remains protected until publication.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="precision" className="border-sciscribe-mist/50 dark:border-white/10">
                  <AccordionTrigger className="hover:bg-white/50 dark:hover:bg-sciscribe-navy/20 hover:no-underline px-4 py-4 rounded-lg">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sciscribe-gold mr-3">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                      </svg>
                      <span className="text-xl font-semibold">Precision</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3">
                    <p className="ml-9">Scientific accuracy is paramount. Our editors pay meticulous attention to detail, ensuring terminology, data presentation, and technical language are precise and correctly formatted.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Our Socials Section */}
        <div className="relative my-16">
          <Separator className="my-8" />
          <section className="bg-white/70 dark:bg-sciscribe-navy/40 py-10 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-sciscribe-blue">Our Socials</h2>
            <p className="text-center text-base md:text-lg mb-6 text-gray-700 dark:text-white/80">
              Follow SciScribe Solutions on social media for exclusive offers, expert tips, and the latest updates in scientific editing and research support.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.linkedin.com/company/sciscribe-solutions/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-sciscribe-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576386514296" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-sciscribe-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/sciscribesolutions_ig/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-sciscribe-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </section>
          <Separator className="my-8" />
        </div>

        {/* Company Journey - Timeline (Optional) */}
        <section className="bg-white/50 dark:bg-sciscribe-navy/30 py-16">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Journey
            </motion.h2>

            <div className="max-w-3xl mx-auto relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-sciscribe-gold via-sciscribe-blue to-sciscribe-purple"></div>
              
              {/* Timeline Items */}
              <div className="space-y-16">
                <motion.div 
                  className="relative grid grid-cols-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="col-span-2 text-right pr-8">
                    <h3 className="font-bold text-xl">2018</h3>
                    <p className="text-sm mt-1">Foundation</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-sciscribe-gold relative top-1 z-10"></div>
                  </div>
                  <div className="col-span-2 pl-8">
                    <p className="premium-glassmorphism p-4 rounded-lg">SciScribe Solutions was founded with a mission to support researchers in communicating their findings effectively.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative grid grid-cols-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="col-span-2 text-right pr-8">
                    <p className="premium-glassmorphism p-4 rounded-lg">Expanded our team and services to include specialized statistical support and clinical writing.</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-sciscribe-blue relative top-1 z-10"></div>
                  </div>
                  <div className="col-span-2 pl-8">
                    <h3 className="font-bold text-xl">2020</h3>
                    <p className="text-sm mt-1">Growth & Expansion</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative grid grid-cols-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="col-span-2 text-right pr-8">
                    <h3 className="font-bold text-xl">2022</h3>
                    <p className="text-sm mt-1">International Recognition</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-sciscribe-purple relative top-1 z-10"></div>
                  </div>
                  <div className="col-span-2 pl-8">
                    <p className="premium-glassmorphism p-4 rounded-lg">Reached milestone of supporting researchers across 20+ countries, with clients published in leading scientific journals.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative grid grid-cols-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="col-span-2 text-right pr-8">
                    <p className="premium-glassmorphism p-4 rounded-lg">Continuing to innovate with new service offerings and digital solutions to better serve the global scientific community.</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-sciscribe-gold relative top-1 z-10"></div>
                  </div>
                  <div className="col-span-2 pl-8">
                    <h3 className="font-bold text-xl">Today</h3>
                    <p className="text-sm mt-1">Innovation & Excellence</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
