
import { motion } from "framer-motion";
import { GraduationCap, UserCheck, Lock, Wrench, Clock, FileCheck } from "lucide-react";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Academic Expertise",
      description: "Our editors are subject-matter experts with research backgrounds — not just language correctors. We understand academic rigor and publication standards."
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Personalized Support",
      description: "We don't use templates. Every project is tailored to your goals, research field, and stage of submission — with real human input."
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Ethical & Transparent",
      description: "No hidden charges. No shortcuts. We offer honest pricing, transparent feedback, and maintain 100% confidentiality of your work."
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "End-to-End Services",
      description: "From manuscript editing and plagiarism reduction to thesis formatting and cover letters — all under one roof."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Responsive & Reliable",
      description: "We stay available throughout the process — updating you, answering questions, and delivering on time. Your deadline is our priority."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Confidential & Secure",
      description: "We treat your work with care and respect. Files are stored securely and deleted after delivery unless otherwise requested."
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
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-white to-sciscribe-mist/20 dark:from-sciscribe-navy/90 dark:via-sciscribe-navy/80 dark:to-sciscribe-navy/90">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground">Why Choose Us?</h2>
          <p className="text-lg text-foreground/80">
            What sets SciScribe Solutions apart from other scientific editing services
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center premium-glassmorphism p-6"
            >
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sciscribe-gold/20 to-sciscribe-amber/20 text-sciscribe-gold">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{reason.title}</h3>
              <p className="text-foreground/70">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
