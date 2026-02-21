"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        category: "Medical Research",
        title: "Oncology Clinical Trial Manuscript",
        description: "Comprehensive editing and statistical verification of a multi-center clinical trial manuscript for a Q1 oncology journal.",
        outcome: "Accepted in first submission cycle — European Journal of Cancer",
        services: ["Scientific Editing", "Statistical Review", "Journal Formatting"],
    },
    {
        category: "Biomedical Sciences",
        title: "Neuroscience PhD Thesis",
        description: "End-to-end formatting, language editing, and plagiarism reduction for a 280-page doctoral thesis on neurodegenerative pathways.",
        outcome: "Thesis defended successfully — awarded distinction",
        services: ["Thesis Editing", "Plagiarism Reduction", "Figures & Diagrams"],
    },
    {
        category: "Public Health",
        title: "Epidemiological Study — COVID-19",
        description: "Rapid turnaround editing and data visualization for a time-sensitive public health study submitted during the pandemic.",
        outcome: "Published within 6 weeks — BMJ Global Health",
        services: ["Fast-Track Editing", "Data Visualization", "Cover Letter"],
    },
    {
        category: "Pharmacology",
        title: "Drug Interaction Systematic Review",
        description: "Structural reorganization and narrative enhancement of a systematic review covering 12 years of drug interaction studies.",
        outcome: "Accepted with minor revisions — Clinical Pharmacology & Therapeutics",
        services: ["Manuscript Restructuring", "Scientific Editing", "Reference Formatting"],
    },
    {
        category: "Social Sciences",
        title: "Educational Psychology Grant Proposal",
        description: "Complete rewrite and alignment of a ₹40 lakh ICSSR grant application, including budget justification and methodology refinement.",
        outcome: "Full funding awarded — first attempt",
        services: ["Grant Writing", "Budget Preparation", "Methodology Review"],
    },
    {
        category: "Environmental Science",
        title: "Climate Change Impact Assessment",
        description: "Multi-disciplinary manuscript covering atmospheric and marine data, requiring specialized figure creation and cross-domain editing.",
        outcome: "Accepted — Nature Climate Change (correspondence)",
        services: ["Scientific Editing", "Data Visualization", "Statistical Analysis"],
    },
];

const testimonials = [
    {
        quote: "The editing team transformed my manuscript from good to exceptional. Their attention to detail and subject expertise made all the difference in getting my paper accepted to a top-tier journal.",
        name: "Dr. M Kishore",
        affiliation: "Resident, Department of Radiation Oncology, IPGMER",
    },
    {
        quote: "As a non-native English speaker, I was struggling to effectively communicate my research. SciScribe Solutions not only fixed language issues but enhanced the scientific narrative while preserving my voice.",
        name: "Dr. Yuki Sato",
        affiliation: "PhD Scholar, Delhi University",
    },
];

export default function PortfolioPage() {
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
                            Selected Work
                        </span>
                        <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-white select-none">
                            Our <br />
                            <span className="italic text-white/60">Portfolio.</span>
                        </h1>
                        <p className="mt-12 text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed text-balance">
                            From clinical manuscripts to grant proposals — selected projects that showcase our expertise across disciplines.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="relative w-full py-24 border-y border-white/10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                        {[
                            { value: "500+", label: "Projects Completed" },
                            { value: "95%", label: "Publication Success" },
                            { value: "25+", label: "States Served" },
                            { value: "12k+", label: "Citations Generated" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            >
                                <p className="text-5xl md:text-7xl font-light tracking-tight text-white mb-2">{stat.value}</p>
                                <p className="text-xs font-mono text-white/50 uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects — Alternating Layout */}
            <section className="relative w-full py-24 pb-48">
                <div className="hidden 2xl:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 z-0" />
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="flex flex-col gap-y-32 md:gap-y-56">
                        {projects.map((project, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={project.title}
                                    className={`w-full flex flex-col items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'items-start md:pr-12' : 'items-start md:pl-12'}`}>
                                        <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/50 mb-4 block">{project.category}</span>
                                        <div className="flex items-baseline gap-4 mb-6">
                                            <span className="text-3xl font-mono text-white/60 italic">0{index + 1}</span>
                                            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">{project.title}</h2>
                                        </div>
                                        <p className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">{project.description}</p>
                                        <p className="text-base text-white/80 leading-loose max-w-lg border-l-2 border-white/40 pl-6 py-2 mb-6">
                                            <span className="text-white/50 font-mono text-xs uppercase tracking-wider block mb-1">Outcome</span>
                                            {project.outcome}
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {project.services.map(s => (
                                                <span key={s} className="text-xs font-mono text-white/50 border border-white/10 px-4 py-2 uppercase tracking-wider">{s}</span>
                                            ))}
                                        </div>
                                    </div>

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

            {/* Testimonials */}
            <section className="relative w-full py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            Client Voices
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-16">
                            What They <span className="italic text-white/60">Say.</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.name}
                                className="w-full md:w-1/2"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.2 }}
                            >
                                <div className="w-full bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden hover:bg-white/[0.05] transition-colors duration-1000">
                                    <span className="absolute top-6 left-8 font-serif text-7xl text-white/10 select-none">&ldquo;</span>
                                    <p className="text-xl font-light text-white/90 leading-relaxed italic mb-8 pt-8">{t.quote}</p>
                                    <div>
                                        <h3 className="text-lg font-serif text-white">{t.name}</h3>
                                        <p className="text-sm font-mono text-white/50 uppercase tracking-wider mt-1">{t.affiliation}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full py-48 border-t border-white/10 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 leading-tight">
                        Start Your <span className="italic text-white/60">Project.</span>
                    </h2>
                    <p className="text-xl text-white/50 font-light mb-16 max-w-2xl leading-relaxed text-balance">
                        Ready to transform your manuscript? Let&apos;s discuss how our team can support your research.
                    </p>
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
                    >
                        <span className="flex items-center gap-4">
                            Get Started
                            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                        </span>
                    </Link>
                </div>
            </section>

        </main>
    );
}
