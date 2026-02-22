"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ConsultationOverlay } from "./ConsultationOverlay";
import { useAnalytics } from "@/hooks/useAnalytics";

const HeroSection = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { logCtaClick } = useAnalytics();

  return (
    <section className="relative w-full pt-[15vh] pb-32 flex flex-col items-center bg-transparent text-white overflow-hidden">

      {/* Editorial Content */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col items-center">

        {/* Eyebrow - Centered to the screen container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 w-full text-center"
        >
          <span className="text-xs tracking-[0.3em] font-mono text-white/70 uppercase drop-shadow-md">
            Premium Medical & Scientific Writing Services
          </span>
        </motion.div>

        <motion.h1
          className="flex flex-col items-start leading-[0.85] font-serif tracking-tighter text-white mb-16 select-none drop-shadow-2xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="text-[6vw] md:text-[4.5vw] font-light tracking-wide text-white/90 mb-2 pl-1 md:pl-2">
            Elevate your
          </span>
          <span className="text-[14vw] md:text-[12vw] italic text-white mb-6 self-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Research.
          </span>
          <span className="text-[6vw] md:text-[4.5vw] font-light tracking-wide text-white/90 mb-2 mt-4 md:mt-2 pl-1 md:pl-2">
            Perfect your
          </span>
          <span className="text-[14vw] md:text-[12vw] text-white self-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Manuscript.
          </span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-6 text-balance drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          Expert editing, advanced statistics, and publication support — delivered with speed, clarity, and guaranteed results.
        </motion.p>

        <motion.p
          className="max-w-xl text-sm md:text-base font-mono tracking-widest uppercase text-white/50 mb-16 text-balance drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          For PhD Candidates, Medical Professionals, & Principal Investigators.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Primary Action - Restored clean style but brightened for visibility over fluid */}
          <button
            onClick={() => {
              setIsConsultationOpen(true);
              logCtaClick({
                cta_id: 'hero_consultation_button',
                cta_text: 'Get a Free Consult',
                cta_location: 'hero_section'
              });
            }}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500 overflow-hidden w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-4">
              Get a Free Consult
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </button>

          {/* Secondary Action */}
          <Link
            href="/contact"
            onClick={() => {
              logCtaClick({
                cta_id: 'hero_free_review_button',
                cta_text: 'Get a Free Review',
                cta_location: 'hero_section'
              });
            }}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-white border border-white/30 hover:border-white transition-colors duration-500 w-full sm:w-auto bg-black/20 backdrop-blur-sm"
          >
            <span className="relative z-10 flex items-center gap-4 text-white group-hover:text-white transition-colors">
              Get a Free Review
            </span>
          </Link>

          {/* Tertiary Action */}
          <Link
            href="/pricing"
            onClick={() => {
              logCtaClick({
                cta_id: 'hero_pricing_button',
                cta_text: 'View Pricing',
                cta_location: 'hero_section'
              });
            }}
            className="group relative inline-flex items-center justify-center px-6 py-5 text-sm tracking-widest uppercase font-mono text-white hover:text-white transition-colors duration-500 w-full sm:w-auto border-b border-transparent hover:border-white/50 drop-shadow-md"
          >
            Pricing
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex gap-8 text-xs font-mono tracking-widest text-white/70 uppercase drop-shadow-md"
        >
          <span>* No commitments</span>
          <span>** No hidden charges</span>
        </motion.div>
      </div>

      {/* Trust / Stats Banner - IN FLOW to prevent overlap */}
      <motion.div
        className="relative w-full max-w-6xl mx-auto border-y border-white/10 bg-black/20 backdrop-blur-sm py-8 mt-24 hidden md:block z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="px-6 flex justify-between items-center text-center divide-x divide-white/10">
          <div className="flex-1 px-4">
            <span className="block text-3xl font-serif text-white mb-2">500+</span>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">Manuscripts</span>
          </div>
          <div className="flex-1 px-4">
            <span className="block text-3xl font-serif text-white mb-2">98%</span>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">Acceptance</span>
          </div>
          <div className="flex-1 px-4">
            <span className="block text-3xl font-serif text-white mb-2">50+</span>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">PhD Experts</span>
          </div>
          <div className="flex-1 px-4">
            <span className="block text-3xl font-serif text-white mb-2">100%</span>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/50">Secure</span>
          </div>
        </div>
      </motion.div>

      {/* Elegant scroll indicator */}
      <motion.div
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] font-mono text-white/70 uppercase writing-vertical-rl rotate-180 drop-shadow-md">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/70" />
        </motion.div>
      </motion.div>

      <ConsultationOverlay
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </section>
  );
};

export default HeroSection;