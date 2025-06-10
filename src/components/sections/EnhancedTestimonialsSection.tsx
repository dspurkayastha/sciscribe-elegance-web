import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote: "SciScribe's editing service took my research paper from good to exceptional. Their attention to detail and scientific accuracy was impressive. After working with them, my paper was accepted without any language revisions.",
    name: "Dr. Anand Choudhury",
    title: "Associate Professor, PGIMER Chandigarh | Published in Nature Communications",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
    avatarColor: "from-blue-500 to-cyan-400"
  },
  {
    quote: "The team at SciScribe understood the nuances of my complex immunology research and provided edits that significantly improved clarity without compromising scientific integrity.",
    name: "Dr. Priya Sharma",
    title: "Principal Investigator, AIIMS Delhi | Published in The Lancet",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
    avatarColor: "from-purple-500 to-pink-400"
  },
  {
    quote: "After three rejections due to language issues, SciScribe's premium editing service helped my paper get accepted in a Q1 journal on the first submission.",
    name: "Prof. Mohan Reddy",
    title: "Research Director, CMC Vellore | Published in Indian Journal of Medical Research",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
    avatarColor: "from-amber-500 to-orange-400"
  },
  {
    quote: "The manuscript editing service provided by SciScribe was exceptional. They transformed my complex research into a clear, concise paper that was accepted by a top-tier journal.",
    name: "Dr. Rajesh Kumar",
    title: "Head of Cardiology, JIPMER Puducherry | Published in Journal of American College of Cardiology",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
    avatarColor: "from-green-500 to-emerald-400"
  },
  {
    quote: "I was struggling with the language barrier in my research paper. SciScribe not only corrected the grammar but also enhanced the scientific presentation of my findings.",
    name: "Dr. Lakshmi Nair",
    title: "Associate Professor, KEM Hospital Mumbai | Published in BMJ Open",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
    avatarColor: "from-red-500 to-rose-400"
  },
];

const EnhancedTestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95 -z-10" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-sciscribe-blue/3 to-transparent blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.1, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sciscribe-teal/5 to-transparent blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.2, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="mb-4 bg-gradient-to-r from-sciscribe-blue/3 to-sciscribe-teal/3 border-sciscribe-blue/10 backdrop-blur-sm"
          >
            Client Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto text-lg">
            Discover how SciScribe has helped researchers worldwide achieve publication success.
          </p>
        </motion.div>

        {/* Animated Testimonials */}
        <AnimatedTestimonials 
          testimonials={testimonials}
          autoplay={true}
          className="py-2"
        />
      </div>
    </section>
  );
};

export default EnhancedTestimonialsSection;
