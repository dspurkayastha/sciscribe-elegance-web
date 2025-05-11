
import { FileText, FileCheck, FileSearch, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      title: "Scientific Editing",
      description:
        "Comprehensive language editing, structural improvement, and clarity enhancement for research manuscripts.",
      icon: <FileText size={28} className="text-sciscribe-blue" />,
    },
    {
      title: "Journal Submission Support",
      description:
        "Formatting assistance, cover letter creation, and response to reviewers to maximize publication success.",
      icon: <FileCheck size={28} className="text-sciscribe-blue" />,
    },
    {
      title: "Research Manuscript Assistance",
      description:
        "Expert guidance on manuscript structure, data presentation, and narrative development.",
      icon: <FileSearch size={28} className="text-sciscribe-blue" />,
    },
    {
      title: "Clinical Article Writing",
      description:
        "Specialized editing and writing support for clinical trials, medical case reports, and health research.",
      icon: <BarChart2 size={28} className="text-sciscribe-blue" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-sciscribe-light/70 dark:bg-sciscribe-navy/10">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold text-foreground">Our Services</h2>
          <p className="mb-12 text-lg text-foreground/80">
            We offer comprehensive support throughout your publication journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
            key={index}
            className={`
              relative flex flex-col h-full rounded-xl
              border border-sciscribe-blue/20 dark:border-sciscribe-blue/10
              bg-white/70 dark:bg-sciscribe-navy/60
              backdrop-blur-xl shadow-[0_4px_18px_-3px_rgba(14,165,233,0.14)]
              transition-transform duration-300 hover:scale-105 hover:shadow-xl
              overflow-hidden glassmorphism
              p-6
            `}
            style={{ zIndex: 1 }}
            whileHover={{ scale: 1.045 }}
            transition={{ type: "spring", stiffness: 440, damping: 24 }}
          >
            <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-sciscribe-blue/20 to-transparent blur-xl pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 h-16 w-16 rounded-full bg-gradient-to-br from-sciscribe-gold/20 to-transparent blur-xl pointer-events-none" />
          
            {/* Content Wrapper */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="mb-4 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/80 dark:bg-sciscribe-navy/50 border border-sciscribe-mist/30 dark:border-white/10 shadow">
                    {service.icon}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold text-sciscribe-blue text-center">{service.title}</h3>
                <p className="text-sciscribe-navy/90 dark:text-white/80 text-center">{service.description}</p>
              </div>
          
              <div className="mt-6 flex justify-center">
                <Link to="/services">
                <Button
                  variant="ghost"
                  className="text-sciscribe-gold hover:bg-transparent hover:text-sciscribe-gold/80 font-medium"
                >
                  Learn more →
                </Button>
              </Link>
              </div>
            </div>
          </motion.div>          
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

