
import { motion } from "framer-motion";
import { Search, FileText, BarChart2, BookOpen, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";

const AddOnServicesSection = () => {
  const { logCtaClick } = useAnalytics();
  const services = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Plagiarism Check & Reduction",
      description: "Thorough similarity checks with precise rewriting suggestions to ensure originality without compromising scientific clarity."
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Journal Formatting",
      description: "We format your manuscript to match your target journal's specifications—citations, layout, figures, and all."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Cover Letter & Abstract Editing",
      description: "Polished, impactful abstracts and cover letters tailored for clarity, tone, and submission success."
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Statistical Analysis",
      description: "Accurate, publication-ready analysis—from basic stats to advanced models—delivered with full methodological transparency."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Scientific Figures & Diagrams",
      description: "Clean, professional visuals including data figures, flowcharts, and study diagrams built to meet publication standards."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast-Track Delivery",
      description: "Priority editing or formatting delivered within 3-5 business days—ideal for urgent submissions."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-sciscribe-light/50 dark:bg-sciscribe-navy/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold dark:text-white text-sciscribe-navy">Add-On Services</h2>
          <p className="text-lg dark:text-white/80 text-sciscribe-navy/80">
            Enhance your research output with precision. These specialized services can be requested on 
            their own, bundled together, or added to any of our main packages. Choose what works best 
            for your project—customization is key to what we do.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-sciscribe-navy/30 p-6 rounded-xl border border-sciscribe-mist/50 dark:border-white/5 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex mb-4">
                <div className="mr-4 p-2 rounded-md bg-sciscribe-teal/10 text-sciscribe-teal dark:bg-sciscribe-teal/20">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-sciscribe-navy dark:text-white">{service.title}</h3>
              </div>
              <p className="mb-5 text-sciscribe-navy/80 dark:text-white/70">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 rounded-xl bg-white/80 dark:bg-sciscribe-navy/30 backdrop-blur-sm shadow-lg border border-sciscribe-mist/30 dark:border-white/10">
            <h3 className="text-xl font-bold mb-3">Cannot find what you're looking for?</h3>
            <p className="mb-5 max-w-2xl">
              We understand that every research project is unique. If you need a service that's not listed here, feel free to reach out. 
              Our team would be happy to discuss your specific requirements and tailor a solution that fits your goals.
              <strong> Customization is key to what we do.</strong>
            </p>
            <Link 
              to="/contact"
              onClick={() => {
                logCtaClick({
                  cta_id: 'addon_services_contact_button',
                  cta_text: 'Contact Us',
                  cta_location: 'addon_services_section'
                });
              }}
            >
              <Button className="btn-premium">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddOnServicesSection;
