
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "SciScribe's editing service took my research paper from good to exceptional. Their nuanced feedback not only improved clarity but elevated the scientific narrative. My paper was accepted by my first-choice journal.",
      author: "Dr. Eliana Chen",
      position: "Associate Professor, Stanford University"
    },
    {
      id: 2,
      quote: "We contracted SciScribe for journal selection, formatting, and submission services. Their expertise saved us weeks of time and frustration. Our manuscript was accepted with only minor revisions.",
      author: "Dr. Marcus Walker",
      position: "Lead Researcher, Global Health Institute"
    },
    {
      id: 3,
      quote: "The attention to detail in their statistical analysis service is exceptional. SciScribe helped strengthen my methodology section and visualize complex datasets in accessible ways.",
      author: "Dr. Sarah Okoye",
      position: "Clinical Researcher, University of Toronto"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Modern animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sciscribe-light/80 to-white/90 dark:from-sciscribe-navy/30 dark:to-sciscribe-navy/10"></div>
        <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
        
        {/* Animated blob gradient in the background */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-teal/10 dark:from-sciscribe-blue/15 dark:to-sciscribe-teal/15 mix-blend-multiply dark:mix-blend-soft-light blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-sciscribe-gold/10 to-sciscribe-amber/10 dark:from-sciscribe-gold/15 dark:to-sciscribe-amber/15 mix-blend-multiply dark:mix-blend-soft-light blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-sciscribe-navy dark:text-white">Client Testimonials</h2>
          <p className="max-w-2xl mx-auto text-lg text-sciscribe-navy/80 dark:text-white/80">
            Hear what researchers and academics have to say about their experience with our services
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="premium-glassmorphism p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <div className="absolute -top-4 -left-4 text-6xl font-serif text-sciscribe-blue opacity-20">"</div>
              <div className="relative z-10">
                <p className="text-lg italic mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-sciscribe-navy/70 dark:text-white/70">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/feedback">
            <Button variant="outline" className="border-sciscribe-blue/30 hover:bg-sciscribe-blue/10 text-sciscribe-blue dark:border-sciscribe-blue/50 dark:hover:bg-sciscribe-blue/20">
              Leave Feedback
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
