"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Microscope, FileCheck, ClipboardList, BarChart, FileText } from "lucide-react";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function ServicesPage() {
  const { logCtaClick } = useAnalytics();

  const services = [
    {
      icon: <FileText className="w-12 h-12 stroke-[1] text-white/40 mb-8" />,
      title: "Scientific Editing",
      description: "Professional editing of research papers, theses, and dissertations by subject matter experts with PhDs.",
      details: "Our scientific editing service includes comprehensive language editing, structural improvements, citation formatting, and discipline-specific terminology refinement. We ensure your manuscript meets the highest standards of clarity and scientific precision."
    },
    {
      icon: <BookOpen className="w-12 h-12 stroke-[1] text-white/40 mb-8" />,
      title: "Journal Submission Support",
      description: "End-to-end assistance with manuscript preparation, formatting, and submission to target journals.",
      details: "We help you navigate the complex journal submission process by providing journal selection guidance, formatting according to specific journal guidelines, cover letter writing, and support with online submission systems."
    },
    {
      icon: <Microscope className="w-12 h-12 stroke-[1] text-white/40 mb-8" />,
      title: "Research Consultancy",
      description: "Expert guidance on research design, methodology, and analysis to strengthen your study.",
      details: "Our experienced research consultants provide critical feedback on your research design, suggest methodological improvements, recommend appropriate analytical approaches, and help you interpret your findings within the context of current literature."
    },
    {
      icon: <FileCheck className="w-12 h-12 stroke-[1] text-white/40 mb-8" />,
      title: "Clinical Study Writing",
      description: "Specialized writing and editing for clinical trials, case reports, and medical manuscripts.",
      details: "Our medical writing experts assist with drafting clinical trial protocols, patient consent forms, case reports, and clinical research manuscripts. We ensure compliance with reporting guidelines (CONSORT, STROBE, PRISMA) and medical journal requirements."
    },
    {
      icon: <ClipboardList className="w-12 h-12 stroke-[1] text-white/40 mb-8" />,
      title: "Systematic Review Assistance",
      description: "Comprehensive support for literature searches, data extraction, and synthesis of evidence.",
      details: "We help you plan and execute systematic reviews according to PRISMA guidelines, assisting with search strategy formulation, study selection, quality assessment, data extraction, meta-analysis planning, and manuscript preparation."
    },
    {
      icon: <BarChart className="w-12 h-12 stroke-[1] text-white/40 mb-8" />,
      title: "Statistical Support",
      description: "Data analysis, interpretation, and visualization to strengthen your research findings.",
      details: "Our statisticians provide consultation on study design, sample size calculation, data management, statistical analysis, interpretation of results, and creation of publication-ready tables and figures that effectively communicate your findings."
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-transparent text-white font-sans overflow-hidden">

      {/* Hero Header */}
      <section className="relative w-full pt-48 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
              Core Competencies
            </span>
            <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-white select-none">
              Services & <br />
              <span className="italic text-white/60">Capabilities.</span>
            </h1>
            <p className="mt-12 text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed text-balance">
              End-to-end research solutions you can trust — exceptional quality engineered for peer-reviewed excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Fluid Services List */}
      <section className="relative w-full py-24 pb-48">

        {/* Subtle connecting vertical line on massive screens */}
        <div className="hidden 2xl:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 z-0" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">

          <div className="flex flex-col gap-y-32 md:gap-y-56">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={["w-full flex flex-col items-center gap-12 md:gap-24", isEven ? "md:flex-row" : "md:flex-row-reverse"].join(" ")}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >

                  {/* Left/Right Text Content */}
                  <div className={["w-full md:w-1/2 flex flex-col justify-center", isEven ? "items-start md:pr-12" : "items-start md:pl-12"].join(" ")}>
                    <div className="mb-6">
                      {service.icon}
                    </div>
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="text-3xl font-mono text-white/60 italic">0{index + 1}</span>
                      <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-white leading-tight">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <p className="text-base text-white/80 leading-loose max-w-lg">
                      {service.details}
                    </p>
                  </div>

                  {/* Elegant Numerals Visual */}
                  <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div className="flex flex-col items-center group">
                      <div className="w-px h-16 md:h-32 bg-gradient-to-b from-transparent via-white/40 to-transparent mb-6 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                      <span className="font-serif text-8xl md:text-[10rem] text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] select-none transition-all duration-700 group-hover:scale-105">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-px h-16 md:h-32 bg-gradient-to-b from-transparent via-white/40 to-transparent mt-6 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-48 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 leading-tight">
            Need a <span className="italic text-white/60">Custom</span> Solution?
          </h2>
          <p className="text-xl text-white/50 font-light mb-16 max-w-2xl leading-relaxed text-balance">
            Every research project possesses unique structural requirements. Connect with our experts to engineer a protocol tailored exclusively to your manuscript.
          </p>

          <Link
            href="/contact"
            onClick={() => logCtaClick({ cta_id: 'services_footer_contact' })}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
          >
            <span className="flex items-center gap-4">
              Initiate Request
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
            </span>
          </Link>
        </div>
      </section>

    </main>
  );
}
