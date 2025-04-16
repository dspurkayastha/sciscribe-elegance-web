
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden py-20">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-20"></div>
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-sciscribe-blue/10 blur-3xl"></div>
      <div className="absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-sciscribe-gold/10 blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-sciscribe-navy dark:text-white">About SciScribe Solutions</h2>
          <motion.p 
            className="mb-12 text-lg text-sciscribe-navy/80 dark:text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            At SciScribe Solutions, we transform your complex research into compelling, publication-ready content. Whether you're preparing a manuscript, thesis, or grant proposal, our expert team of scientists, editors, and illustrators ensure your work is clear, accurate, and impactful—ready to make its mark in the scientific world.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Mission Section */}
          <motion.div 
            className="premium-card overflow-hidden border-sciscribe-blue/20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-sciscribe-blue/30 to-transparent blur-xl"></div>
              <h3 className="mb-4 text-2xl font-bold text-sciscribe-blue">Mission</h3>
              <p className="text-sciscribe-navy/80 dark:text-white/80">
                To provide high-quality scientific writing, editing, visualization, and data support services tailored to the needs of academics, students, and research institutions—ensuring ethical, accurate, and impactful research dissemination.
              </p>
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div 
            className="premium-card overflow-hidden border-sciscribe-gold/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-sciscribe-gold/30 to-transparent blur-xl"></div>
              <h3 className="mb-4 text-2xl font-bold text-sciscribe-gold">Vision</h3>
              <p className="text-sciscribe-navy/80 dark:text-white/80">
                To become a global leader in scientific communication—empowering researchers to share their discoveries with confidence, credibility, and clarity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
