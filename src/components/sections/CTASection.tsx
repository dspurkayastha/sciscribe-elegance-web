import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useAnalytics } from "@/hooks/useAnalytics";

const CTASection: React.FC = () => {
  const { logCtaClick } = useAnalytics();
  
  // SciScribe color scheme for the wavy background
  const sciscribeColors = [
    "#0ea5e9", // sciscribe-blue
    "#14b8a6", // sciscribe-teal
    "#0284c7", // darker blue
    "#0d9488", // darker teal
    "#f59e0b", // sciscribe-amber
  ];

  return (
    <section className="relative overflow-hidden">
      <WavyBackground 
        colors={sciscribeColors}
        waveWidth={50}
        backgroundFill="#020817" // dark background color
        blur={15}
        speed="slow"
        waveOpacity={0.3}
        containerClassName="h-auto py-24 relative"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ready to elevate your research?
              </motion.h3>
              <motion.p 
                className="text-muted-foreground mb-8 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Join the researchers who have transformed their academic publications with SciScribe
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10,
                  duration: 0.5, 
                  delay: 0.2
                }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal hover:from-sciscribe-teal hover:to-sciscribe-blue text-white px-8 py-6 text-lg shadow-lg transition-all duration-300"
                >
                  <Link 
                    to="/contact"
                    onClick={() => {
                      logCtaClick({
                        cta_id: 'cta_section_get_started',
                        cta_text: 'Get Started Today',
                        cta_location: 'cta_section'
                      });
                    }}
                  >
                    Get Started Today
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </WavyBackground>
    </section>
  );
};

export default CTASection;
