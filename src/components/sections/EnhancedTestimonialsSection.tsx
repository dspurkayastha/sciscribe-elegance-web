"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote: "SciScribe's editing service took my research paper from good to exceptional. Their attention to detail and scientific accuracy was impressive. After working with them, my paper was accepted without any language revisions.",
    name: "Dr. Anand Choudhury",
    title: "Associate Professor, PGIMER Chandigarh | Published in Nature Communications",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
  },
  {
    quote: "The team at SciScribe understood the nuances of my complex immunology research and provided edits that significantly improved clarity without compromising scientific integrity.",
    name: "Dr. Priya Sharma",
    title: "Principal Investigator, AIIMS Delhi | Published in The Lancet",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
  },
  {
    quote: "After three rejections due to language issues, SciScribe's premium editing service helped my paper get accepted in a Q1 journal on the first submission.",
    name: "Prof. Mohan Reddy",
    title: "Research Director, CMC Vellore | Published in Indian Journal of Medical Research",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
  },
  {
    quote: "The manuscript editing service provided by SciScribe was exceptional. They transformed my complex research into a clear, concise paper that was accepted by a top-tier journal.",
    name: "Dr. Rajesh Kumar",
    title: "Head of Cardiology, JIPMER Puducherry | Published in Journal of American College of Cardiology",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
  },
  {
    quote: "I was struggling with the language barrier in my research paper. SciScribe not only corrected the grammar but also enhanced the scientific presentation of my findings.",
    name: "Dr. Lakshmi Nair",
    title: "Associate Professor, KEM Hospital Mumbai | Published in BMJ Open",
    avatarSrc: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/avatar.webp",
  },
];

const EnhancedTestimonialsSection: React.FC = () => {
  return (
    <section className="py-32 md:py-48 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/40 mb-6">
            Endorsements
          </h2>
          <h3 className="text-4xl md:text-7xl font-serif text-white tracking-tight">
            Peer <span className="italic text-white/50">Review.</span>
          </h3>
        </motion.div>

        {/* Animated Testimonials */}
        <div className="border border-white/10 rounded-none bg-black/20 backdrop-blur-sm p-4 md:p-12">
          <AnimatedTestimonials
            testimonials={testimonials}
            autoplay={true}
          />
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonialsSection;
