"use client";

import { motion } from "framer-motion";
import { Target, Heart, Lightbulb, Shield, Users, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const values = [
    { icon: <Shield className="w-12 h-12 stroke-[1] text-white/40 mb-8" />, title: "Academic Integrity", description: "We uphold the highest ethical standards. Every edit preserves your original voice while enhancing clarity and impact." },
    { icon: <Lightbulb className="w-12 h-12 stroke-[1] text-white/40 mb-8" />, title: "Scientific Rigor", description: "Our PhD-qualified editors bring deep domain expertise to ensure methodological and factual accuracy." },
    { icon: <Users className="w-12 h-12 stroke-[1] text-white/40 mb-8" />, title: "Collaborative Partnership", description: "We work alongside researchers, not above them — treating every manuscript as a shared mission." },
    { icon: <Zap className="w-12 h-12 stroke-[1] text-white/40 mb-8" />, title: "Excellence in Execution", description: "Fast turnarounds without sacrificing quality. We meet deadlines because your publication timeline matters." },
];

const team = [
    { name: "Dr. Ananya Sharma", role: "Founder & Chief Editor", bio: "PhD in Molecular Biology. 15+ years of research and editing experience across life sciences and biomedical journals." },
    { name: "Dr. Rajiv Mehta", role: "Senior Scientific Editor", bio: "PhD in Biochemistry. Specialist in medical and life sciences editing with 200+ manuscripts reviewed." },
];

const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sciscribe-solutions/?viewAsMember=true" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61576386514296" },
    { label: "Instagram", href: "https://www.instagram.com/sciscribesolutions_ig/" },
];

export default function AboutPage() {
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
                            About
                        </span>
                        <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-white select-none">
                            Elevating Research<br />
                            <span className="italic text-white/60">Through Expert Editing.</span>
                        </h1>
                        <p className="mt-12 text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed text-balance">
                            At SciScribe Solutions, we transform complex research into compelling, publication-ready content. Whether you&apos;re preparing a manuscript, thesis, or grant proposal, our expert team ensures your work is clear, accurate, and impactful.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="relative w-full py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

                        {/* Mission */}
                        <motion.div
                            className="w-full md:w-1/2 flex flex-col items-start"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Target className="w-12 h-12 stroke-[1] text-white/40 mb-8" />
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-3xl font-mono text-white/60 italic">01</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">Our Mission</h2>
                            </div>
                            <p className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">
                                Elevating the quality and impact of scientific research worldwide.
                            </p>
                            <p className="text-base text-white/80 leading-loose max-w-lg">
                                To provide high-quality scientific writing, editing, visualization, and data support services tailored to the needs of academics, students, and research institutions — ensuring ethical, accurate, and impactful research dissemination.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            className="w-full md:w-1/2 flex flex-col items-start"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        >
                            <Heart className="w-12 h-12 stroke-[1] text-white/40 mb-8" />
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-3xl font-mono text-white/60 italic">02</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">Our Vision</h2>
                            </div>
                            <p className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">
                                Leading global scientific communication with confidence and clarity.
                            </p>
                            <p className="text-base text-white/80 leading-loose max-w-lg">
                                To become a global leader in scientific communication — empowering researchers to share their discoveries with confidence, credibility, and clarity, free from language barriers or presentation challenges.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="relative w-full py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            Core Principles
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-16">
                            What We <span className="italic text-white/60">Stand For.</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-y-32 md:gap-y-40">
                        {values.map((value, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={value.title}
                                    className={`w-full flex flex-col items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'items-start md:pr-12' : 'items-start md:pl-12'}`}>
                                        <div className="mb-6">{value.icon}</div>
                                        <div className="flex items-baseline gap-4 mb-6">
                                            <span className="text-3xl font-mono text-white/60 italic">0{index + 1}</span>
                                            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">{value.title}</h3>
                                        </div>
                                        <p className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">
                                            {value.description}
                                        </p>
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

            {/* Team */}
            <section className="relative w-full py-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            Our Team
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-16">
                            The Experts Behind <span className="italic text-white/60">Your Work.</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                className="w-full md:w-1/2"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.2 }}
                            >
                                <div className="w-full aspect-[4/5] bg-white/[0.02] border border-white/5 flex flex-col items-start justify-end p-12 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-1000 mb-8">
                                    <span className="absolute top-12 right-12 font-serif text-8xl text-white/5 select-none">{member.name.charAt(0)}</span>
                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">{member.name}</h3>
                                    <p className="text-sm font-mono text-white/50 uppercase tracking-wider">{member.role}</p>
                                </div>
                                <p className="text-base text-white/80 leading-loose">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
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

            {/* Socials */}
            <section className="relative w-full py-24">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                        Stay Connected
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">
                        Follow Our <span className="italic text-white/60">Work.</span>
                    </h2>
                    <div className="flex justify-center gap-6">
                        {socials.map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center px-8 py-5 text-sm tracking-widest uppercase font-mono text-white/50 border border-white/10 hover:bg-white/[0.05] hover:text-white transition-all duration-500">
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full py-48 border-t border-white/10 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 leading-tight">
                        Ready to <span className="italic text-white/60">Collaborate?</span>
                    </h2>
                    <p className="text-xl text-white/50 font-light mb-16 max-w-2xl leading-relaxed text-balance">
                        Let&apos;s discuss how our team can elevate your research to publication-ready quality.
                    </p>
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
                    >
                        <span className="flex items-center gap-4">
                            Work With Us
                            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                        </span>
                    </Link>
                </div>
            </section>

        </main>
    );
}
