import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Award, CheckCircle, Heart, Target } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import LightningSeparator from "@/components/ui/lightningseparator";
import EnhancedJourneyTimeline from "@/components/sections/EnhancedJourneyTimeline";
import AboutSection from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import RouterAwareSeo from "@/components/ui/RouterAwareSeo";

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
      <RouterAwareSeo
        title="About SciScribe Solutions | Our Team & Values"
        description="Learn about SciScribe Solutions, our expert team, mission, vision, and core values that drive our commitment to excellence in scientific editing and research support."
        trackPageView={true}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About SciScribe Solutions",
          "description": "Learn about SciScribe Solutions, our expert team, mission, vision, and core values that drive our commitment to excellence in scientific editing and research support.",
          "publisher": {
            "@type": "Organization",
            "name": "SciScribe Solutions",
            "foundingDate": "2018",
            "foundingLocation": "Kolkata, India",
            "description": "SciScribe Solutions provides professional scientific editing, manuscript preparation, and research support services to help researchers publish their work effectively.",
            "slogan": "Elevating Research Through Expert Editing",
            "member": [
              {
                "@type": "Person",
                "name": "Dr. Ananya Sharma",
                "jobTitle": "Founder & Chief Editor",
                "description": "PhD in Molecular Biology with over 15 years of research and editing experience"
              },
              {
                "@type": "Person",
                "name": "Dr. Rajiv Mehta",
                "jobTitle": "Senior Scientific Editor",
                "description": "PhD in Biochemistry with expertise in medical and life sciences editing"
              }
            ]
          }
        }}
      />
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
              At SciScribe Solutions, we transform your complex research into compelling, publication-ready content. Whether you're preparing a manuscript, thesis, or grant proposal, our expert team of scientists, editors, and illustrators ensure your work is clear, accurate, and impactful—ready to make its mark in the scientific world.
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

        <CoreValuesSection />
        <LightningSeparator />
        <TeamSection />

        {/* Our Socials Section */}
        <div className="relative my-16">
          <LightningSeparator />
          <section className="bg-white/70 dark:bg-sciscribe-navy/40 py-10 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-sciscribe-blue">Our Socials</h2>
            <p className="text-center text-base md:text-lg mb-6 text-gray-700 dark:text-white/80">
              Follow Us on social media for exclusive offers, expert tips, and the latest updates in scientific editing and research support.
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
        </div>

        <LightningSeparator />
        
        {/* Enhanced Company Journey Timeline */}
        <EnhancedJourneyTimeline />
      </main>
      <Footer />
    </div>
  );
};

export default About;
