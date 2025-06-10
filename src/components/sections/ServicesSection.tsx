
import { FileText, FileCheck, FileSearch, BarChart2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ServicesSection = () => {
  const services = [
    {
      title: "Scientific Writing & Manuscript Development",
      description:
        "Expert manuscript refinement and preparation for academic and research publications.",
      icon: <FileText size={28} className="text-sciscribe-blue" />,
      highlight: true,
      features: [
        "Structured thesis and dissertation writing",
        "Conference paper drafting and development",
        "Abstract editing and optimization",
        "Academic tone and clarity enhancement",
        "Content organization and narrative flow"
      ]
    },
    {
      title: "Data Analysis & Visual Communication",
      description:
        "Transform complex data into compelling visual narratives that enhance understanding and impact.",
      icon: <BarChart2 size={28} className="text-sciscribe-blue" />,
      features: [
        "Expert statistical analysis and interpretation",
        "High-quality scientific figures and charts",
        "Precision table design and data visualization",
        "Research graphics and scientific illustrations",
        "Visual abstracts and infographics"
      ]
    },
    {
      title: "Publication & Journal Support",
      description:
        "Strategic guidance and hands-on support throughout the entire publication process.",
      icon: <FileCheck size={28} className="text-sciscribe-blue" />,
      features: [
        "Strategic journal targeting and selection",
        "Ethical and technical compliance review",
        "Reviewer response and revision support",
        "Journal formatting and guidelines adherence",
        "Publication process navigation"
      ]
    },
    {
      title: "Language Excellence & Professional Polish",
      description:
        "Elevate your academic writing with expert language refinement and professional presentation.",
      icon: <FileSearch size={28} className="text-sciscribe-blue" />,
      features: [
        "Grammar, syntax, and style correction",
        "Visual polish and structure optimization",
        "Scientific poster design and layout",
        "Personalized guidance and consultation",
        "Professional presentation standards"
      ]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-sciscribe-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-sciscribe-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="mx-auto max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 bg-sciscribe-blue/10 text-sciscribe-blue hover:bg-sciscribe-blue/20 transition-colors">
            Expert Services
          </Badge>
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We offer comprehensive support throughout your publication journey, from manuscript preparation to journal submission
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={cn(
                "premium-glassmorphism flex flex-col h-full rounded-xl overflow-hidden",
                "border border-sciscribe-blue/20 dark:border-sciscribe-blue/10",
                "hover:border-sciscribe-gold/40 hover:shadow-xl hover:ring-2 hover:ring-sciscribe-gold/30 hover:ring-offset-2 hover:ring-offset-background transition-all duration-500"
              )}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              {/* Card header with gradient */}
              <div className="bg-gradient-to-r from-sciscribe-teal/10 to-sciscribe-gold/10 p-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br from-sciscribe-gold/20 to-transparent blur-xl pointer-events-none" />
                
                <div className="mb-3 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/80 dark:bg-sciscribe-navy/50 border border-sciscribe-mist/30 dark:border-white/10 shadow-md">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">
                  {service.title}
                </h3>
              </div>
              
              {/* Card body */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-foreground/80 text-center mb-6">
                  {service.description}
                </p>
                
                {/* Features list */}
                <ul className="space-y-2 mb-6">
                  {service.features?.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="mr-2 text-sciscribe-gold">
                        <Sparkles size={14} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto flex justify-center">
                  <Link to="/services" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-sciscribe-blue/30 hover:bg-sciscribe-blue/10 hover:text-sciscribe-blue group transition-all duration-300"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>          
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

