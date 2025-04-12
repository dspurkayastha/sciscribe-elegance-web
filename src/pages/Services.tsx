
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { FileText, BookOpen, Microscope, FileCheck, ClipboardList, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: <FileText className="h-10 w-10 text-sciscribe-blue" />,
      title: "Scientific Editing",
      description: "Professional editing of research papers, theses, and dissertations by subject matter experts with PhDs.",
      details: "Our scientific editing service includes comprehensive language editing, structural improvements, citation formatting, and discipline-specific terminology refinement. We ensure your manuscript meets the highest standards of clarity and scientific precision."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-sciscribe-blue" />,
      title: "Journal Submission Support",
      description: "End-to-end assistance with manuscript preparation, formatting, and submission to target journals.",
      details: "We help you navigate the complex journal submission process by providing journal selection guidance, formatting according to specific journal guidelines, cover letter writing, and support with online submission systems."
    },
    {
      icon: <Microscope className="h-10 w-10 text-sciscribe-blue" />,
      title: "Research Consultancy",
      description: "Expert guidance on research design, methodology, and analysis to strengthen your study.",
      details: "Our experienced research consultants provide critical feedback on your research design, suggest methodological improvements, recommend appropriate analytical approaches, and help you interpret your findings within the context of current literature."
    },
    {
      icon: <FileCheck className="h-10 w-10 text-sciscribe-blue" />,
      title: "Clinical Study Writing",
      description: "Specialized writing and editing for clinical trials, case reports, and medical manuscripts.",
      details: "Our medical writing experts assist with drafting clinical trial protocols, patient consent forms, case reports, and clinical research manuscripts. We ensure compliance with reporting guidelines (CONSORT, STROBE, PRISMA) and medical journal requirements."
    },
    {
      icon: <ClipboardList className="h-10 w-10 text-sciscribe-blue" />,
      title: "Systematic Review Assistance",
      description: "Comprehensive support for literature searches, data extraction, and synthesis of evidence.",
      details: "We help you plan and execute systematic reviews according to PRISMA guidelines, assisting with search strategy formulation, study selection, quality assessment, data extraction, meta-analysis planning, and manuscript preparation."
    },
    {
      icon: <BarChart className="h-10 w-10 text-sciscribe-blue" />,
      title: "Statistical Support",
      description: "Data analysis, interpretation, and visualization to strengthen your research findings.",
      details: "Our statisticians provide consultation on study design, sample size calculation, data management, statistical analysis, interpretation of results, and creation of publication-ready tables and figures that effectively communicate your findings."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    hover: { y: -10, transition: { duration: 0.3 } }
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
              Our Services
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 dark:text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Comprehensive solutions to elevate your research from concept to publication
            </motion.p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="premium-card-hover overflow-hidden h-[280px] rounded-xl"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="p-6 h-full flex flex-col">
                  {/* Card Front (Always Visible) */}
                  <div className="card-content">
                    <div className="mb-4 p-3 inline-block rounded-full bg-gradient-to-br from-white/5 to-white/20 dark:from-sciscribe-navy/30 dark:to-sciscribe-navy/50 border border-sciscribe-mist/30 dark:border-white/10 shadow-sm">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                  </div>
                  
                  {/* Card Reveal (Show on Hover) */}
                  <div className="card-reveal absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white dark:from-sciscribe-navy/95 via-white/95 dark:via-sciscribe-navy/90 to-white/80 dark:to-sciscribe-navy/70">
                    <p className="mb-4 text-sm">{service.details}</p>
                    <Link to="/contact" className="inline-block">
                      <Button className="btn-premium">
                        Inquire Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-teal/10 dark:from-sciscribe-blue/20 dark:to-sciscribe-teal/20 py-16">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="mb-8">
                We understand that every research project is unique. Contact us to discuss your specific needs and how we can tailor our services to support your research goals.
              </p>
              <Link to="/contact">
                <Button className="btn-premium pulse-btn shadow-lg">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
