"use client";

import { motion } from "framer-motion";
import { GraduationCap, UserCheck, Lock, Wrench, Clock, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";

const WhyChooseUsSection = () => {
  const { logCtaClick } = useAnalytics();
  const reasons = [
    {
      icon: <GraduationCap className="w-5 h-5 mb-6 opacity-50" />,
      title: "Academic Expertise",
      description: "Our editors are subject-matter experts with research backgrounds — not just language correctors. We understand academic rigor and publication standards.",
      benefits: ["PhD-level subject expertise", "Research publication experience", "Field-specific knowledge"]
    },
    {
      icon: <UserCheck className="w-5 h-5 mb-6 opacity-50" />,
      title: "Personalized Support",
      description: "We don't use templates. Every project is tailored to your goals, research field, and stage of submission — with real human input.",
      benefits: ["Customized editing approach", "One-on-one consultations", "Targeted feedback"]
    },
    {
      icon: <FileCheck className="w-5 h-5 mb-6 opacity-50" />,
      title: "Transparent Pricing",
      description: "No hidden charges. No shortcuts. We offer honest pricing, transparent feedback, and maintain 100% confidentiality of your work.",
      benefits: ["Clear pricing structure", "Honest Pricing Assessment", "Best Rates in Academia"]
    },
    {
      icon: <Wrench className="w-5 h-5 mb-6 opacity-50" />,
      title: "End-to-End Services",
      description: "From manuscript editing and plagiarism reduction to thesis formatting and cover letters — all under one roof.",
      benefits: ["Comprehensive solutions", "Integrated workflow", "Single point of contact"]
    },
    {
      icon: <Clock className="w-5 h-5 mb-6 opacity-50" />,
      title: "Responsive & Reliable",
      description: "We stay available throughout the process — updating you, answering questions, and delivering on time. Your deadline is our priority.",
      benefits: ["24-hour response time", "On-time delivery guarantee", "Regular progress updates"]
    },
    {
      icon: <Lock className="w-5 h-5 mb-6 opacity-50" />,
      title: "Confidential & Secure",
      description: "We treat your work with care and respect. Files are stored securely and deleted after delivery unless otherwise requested.",
      benefits: ["Secure file handling", "NDA protection available", "Privacy-first approach"]
    }
  ];

  return (
    <section className="py-20 md:py-32 relative w-full overflow-hidden bg-transparent text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-40 max-w-4xl"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/70 mb-8 block">
            Our Difference
          </span>
          <h2 className="text-[10vw] md:text-[6vw] font-serif leading-[0.9] tracking-tighter text-white">
            Why Choose Us?
          </h2>
          <p className="mt-8 text-xl font-light text-white/90 max-w-2xl text-balance">
            What sets SciScribe Solutions apart from other scientific editing services.
          </p>
        </motion.div>

        <div className="flex flex-col gap-y-32 md:gap-y-48 w-full border-t border-white/20 pt-12 md:pt-24 mt-12 md:mt-24">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-24 w-full ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Elegant Typography Mark replacing massive number */}
              <div className="lg:w-1/3 flex flex-col items-start lg:items-center">
                <div className="flex items-baseline gap-6 mb-8 group">
                  <span className="text-6xl md:text-8xl font-serif text-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] select-none transition-colors duration-500 group-hover:text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Body & Bullet Points seamlessly integrated */}
              <div className="lg:w-2/3 flex flex-col justify-center">
                <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-white pb-6 mb-6 border-b border-white/20">
                  {reason.title}
                </h3>
                <p className="text-xl md:text-2xl font-light text-white leading-relaxed mb-12">
                  {reason.description}
                </p>
                <div className="flex flex-col gap-4">
                  {reason.benefits.map((benefit, i) => (
                    <div key={i} className="flex flex-col group">
                      <span className="text-sm uppercase tracking-widest font-mono text-white/70 mb-2">Feature {i + 1}</span>
                      <div className="text-lg text-white font-medium border-l border-white/40 pl-6 py-2 transition-colors duration-500">
                        {benefit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Action */}
        <motion.div
          className="mt-40 md:mt-64 flex flex-col items-center justify-center border-t border-white/10 pt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 text-center">
            Ready to elevate your manuscript?
          </h2>
          <Link
            href="/contact"
            onClick={() => {
              logCtaClick({
                cta_id: 'why_choose_us_get_started',
                cta_text: 'Get Started Today',
                cta_location: 'why_choose_us_section'
              });
            }}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-sm tracking-widest uppercase font-mono text-white border border-white/20 hover:border-white/60 transition-colors duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-6">
              Submit Your Manuscript for a Free Review
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </span>
            <div className="absolute inset-0 bg-white/5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
