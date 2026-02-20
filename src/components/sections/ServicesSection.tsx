"use client";

import { FileText, FileCheck, FileSearch, BarChart2, Sparkles, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useRef } from "react";

const ServicesSection = () => {
  const { logCtaClick } = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Scientific Writing & Manuscript Development",
      description:
        "Expert manuscript refinement and preparation for academic and research publications.",
      icon: <FileText className="w-8 h-8 opacity-40 mb-8" />,
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
      icon: <BarChart2 className="w-8 h-8 opacity-40 mb-8" />,
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
      icon: <FileCheck className="w-8 h-8 opacity-40 mb-8" />,
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
      icon: <FileSearch className="w-8 h-8 opacity-40 mb-8" />,
      features: [
        "Grammar, syntax, and style correction",
        "Visual polish and structure optimization",
        "Scientific poster design and layout",
        "Personalized guidance and consultation",
        "Professional presentation standards"
      ]
    },
  ];

  return (
    <section id="services" className="py-32 md:py-48 relative w-full bg-transparent text-white" ref={containerRef}>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <motion.div
          className="mb-32 md:mb-56 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
            Expert Services
          </span>
          <h2 className="text-[10vw] md:text-[7vw] font-serif leading-[0.9] tracking-tighter text-white select-none">
            Architecting Your <br />
            <span className="italic text-white/50">Narrative.</span>
          </h2>
          <p className="mt-12 text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed">
            We offer comprehensive support throughout your publication journey, from preliminary manuscript preparation to final journal submission.
          </p>
        </motion.div>

        <div className="flex flex-col w-full relative">
          {/* A persistent line connecting the services on larger screens */}
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0" />

          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="flex flex-col lg:flex-row items-center justify-between w-full py-24 md:py-32 border-t border-white/10 lg:border-none relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Title Side */}
                <div className={`w-full lg:w-5/12 flex flex-col ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:order-last lg:pl-16 lg:text-left'} mb-12 lg:mb-0`}>
                  {isEven ? (
                    <div className="w-full flex justify-end">{service.icon}</div>
                  ) : (
                    <div className="w-full flex justify-start">{service.icon}</div>
                  )}
                  <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight hover:text-white/80 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Center Node (Hidden on Mobile) */}
                <div className="hidden lg:flex w-2/12 justify-center items-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 bg-black flex items-center justify-center text-xs font-mono text-white/40">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-5/12 flex flex-col ${isEven ? 'lg:pl-16' : 'lg:order-first lg:pr-16 items-end lg:text-right'}`}>
                  <p className="text-lg md:text-xl font-light text-white/70 mb-10 text-balance">
                    {service.description}
                  </p>

                  <ul className={`flex flex-col gap-4 ${isEven ? 'items-start' : 'lg:items-end'}`}>
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center group">
                        {isEven && (
                          <span className="mr-4 text-white/30 group-hover:text-white transition-colors">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                        <span className="text-base text-white/90 group-hover:text-white transition-colors border-b border-transparent group-hover:border-white/30 pb-1">
                          {feature}
                        </span>
                        {!isEven && (
                          <span className="ml-4 text-white/30 group-hover:text-white transition-colors lg:block hidden">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                        {/* Mobile right-side sparkle */}
                        {!isEven && (
                          <span className="ml-4 text-white/30 group-hover:text-white transition-colors lg:hidden block">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-12 flex w-full ${isEven ? 'justify-start' : 'justify-start lg:justify-end'}`}>
                    <Link
                      href="/services"
                      onClick={() => {
                        logCtaClick({
                          cta_id: `services_learn_more_${service.title.toLowerCase().replace(/\s+/g, '_')}`,
                          cta_text: 'Learn more',
                          cta_location: 'services_section'
                        });
                      }}
                      className="inline-flex items-center gap-4 text-sm font-mono tracking-widest uppercase text-white/50 hover:text-white transition-colors pb-2 border-b border-white/20 hover:border-white"
                    >
                      Explore specifics
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
