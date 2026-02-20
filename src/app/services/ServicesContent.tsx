"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ServicesContent = () => {
  const capabilities = [
    {
      num: "01",
      title: "Scientific Editing",
      desc: "Comprehensive language and structural refinement engineered for high-impact journals. We eliminate ambiguity and elevate your manuscript to native-level fluency.",
    },
    {
      num: "02",
      title: "Journal Submission Strategy",
      desc: "Navigating the labyrinth of peer review. We handle journal targeting, stringent formatting adherence, and authoritative cover letter architecture.",
    },
    {
      num: "03",
      title: "Research Architecture",
      desc: "Rigorous evaluation of methodology, statistical analysis frameworks, and study design before you begin the writing process.",
    },
    {
      num: "04",
      title: "Clinical Study Documentation",
      desc: "Precision documentation for clinical trials and case reports, ensuring uncompromising adherence to CONSORT, STROBE, and PRISMA guidelines.",
    },
    {
      num: "05",
      title: "Systematic Review Synthesis",
      desc: "From exhaustive search strategy formulation to rigorous meta-analysis planning, we assist in synthesizing the highest level of evidence.",
    },
    {
      num: "06",
      title: "Data Visualization & Statistics",
      desc: "Transforming dense statistical outputs into intuitive, compelling visual narratives that command reviewer attention.",
    }
  ];

  return (
    <main className="flex flex-col relative w-full overflow-hidden z-10 pt-32 md:pt-48 pb-24">
      <div className="container mx-auto px-6 md:px-12">

        {/* Massive Page Header */}
        <motion.div
          className="mb-32 md:mb-48 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.9] tracking-tighter text-white">
            Capabilities <br />
            <span className="italic text-white/50">& Expertise.</span>
          </h1>
        </motion.div>

        {/* Dense Typographic Index */}
        <div className="border-t border-white/20">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="group flex flex-col md:flex-row items-baseline justify-between py-12 md:py-20 border-b border-white/10 hover:border-white transition-colors duration-500 w-full relative">

                {/* Number & Massive Title */}
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 w-full md:w-1/2">
                  <span className="text-sm font-mono text-white/30 group-hover:text-white transition-colors duration-500">
                    {item.num}
                  </span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight group-hover:italic group-hover:pl-4 transition-all duration-700 ease-[0.16,1,0.3,1]">
                    {item.title}
                  </h2>
                </div>

                {/* Description (Fades in on desktop, static on mobile) */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex flex-col justify-end">
                  <p className="text-sm md:text-base font-light text-white/70 max-w-md md:opacity-40 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out md:ml-auto leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Section CTA */}
        <motion.div
          className="mt-32 md:mt-48 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-12">
            Require a specialized approach?
          </h2>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-12 py-6 text-sm tracking-widest uppercase font-mono text-white border border-white/20 hover:border-white/60 transition-colors duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              Initiate Dialogue
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-white/5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </Link>
        </motion.div>

      </div>
    </main>
  );
};

export default ServicesContent;
