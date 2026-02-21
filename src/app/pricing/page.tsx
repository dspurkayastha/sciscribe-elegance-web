"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function PricingPage() {
    const { logCtaClick } = useAnalytics();

    const tiers = [
        {
            name: "Research Launchpad",
            price: "₹7,500",
            usd: "$90",
            target: "Students & Early Researchers",
            delivery: "1 week delivery",
            features: [
                "Scientific Poster Design",
                "Conference Paper Drafting",
                "Visual Polish & Structure Optimization",
                "Abstract Editing Support",
                "Proofreading & Language Excellence"
            ]
        },
        {
            name: "Thesis Trailblazer",
            price: "₹15,000",
            usd: "$180",
            target: "Thesis & Dissertation Projects",
            delivery: "3 weeks delivery",
            isPopular: true,
            features: [
                "Structured Thesis Writing",
                "Expert Statistical Analysis",
                "High-Quality Visuals",
                "Language & Proofreading Excellence",
                "Manuscript Refinement",
                "Personalized Guidance"
            ]
        },
        {
            name: "Publication Pinnacle",
            price: "₹22,000",
            usd: "$260",
            target: "Journal Submission & Review Prep",
            delivery: "4–5 weeks (Fast-Track Available)",
            features: [
                "Expert Manuscript Refinement",
                "Precision Figure & Table Design",
                "Strategic Journal Targeting & Compliance",
                "Ethical & Technical Compliance Review",
                "Reviewer Response Support",
                "Concierge Submission Service"
            ]
        }
    ];

    const addOns = [
        { name: "Plagiarism Check & Reduction", desc: "Similarity checks & rewriting suggestions for originality." },
        { name: "Journal Formatting", desc: "Citations, layout, & figures matched to target specifications." },
        { name: "Cover Letter & Abstract", desc: "Impactful editing tailored for submission success." },
        { name: "Statistical Analysis", desc: "Accurate, publication-ready analysis with transparency." },
        { name: "Scientific Figures", desc: "Clean, professional data figures and study diagrams." },
        { name: "Fast-Track Delivery", desc: "Priority turnaround within 3–5 business days." }
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
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/70 mb-8 block">
                            Investment Models
                        </span>
                        <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-white select-none">
                            Transparent <br />
                            <span className="italic text-white/80">Pricing.</span>
                        </h1>
                        <p className="mt-12 text-xl md:text-2xl font-light text-white/80 max-w-3xl leading-relaxed text-balance">
                            World-class research solutions engineered for absolute clarity—from initial concept to peer-reviewed publication.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Fluid Pricing Tiers */}
            <section className="relative w-full py-24 pb-48">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col gap-y-32 md:gap-y-56">
                        {tiers.map((tier, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={index}
                                    className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 relative`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >

                                    {/* Left/Right Text Content */}
                                    <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'items-start md:pr-12' : 'items-start md:pl-12'}`}>

                                        {tier.isPopular && (
                                            <span className="text-xs tracking-[0.2em] font-mono text-white uppercase border border-white/40 py-2 px-4 rounded-full mb-8">
                                                Most Popular
                                            </span>
                                        )}

                                        <div className="flex flex-col mb-8">
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-4">
                                                {tier.name}
                                            </h2>
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-5xl md:text-7xl font-light tracking-tight">{tier.price}</span>
                                                <span className="text-2xl text-white/60 font-serif italic">({tier.usd})</span>
                                            </div>
                                        </div>

                                        <p className="text-xl md:text-2xl font-light text-white mb-12 leading-relaxed border-l-2 border-white/40 pl-6 py-2">
                                            Ideal for {tier.target}. <br />
                                            <span className="text-base text-white/70">{tier.delivery}</span>
                                        </p>

                                        <ul className="space-y-6 w-full">
                                            {tier.features.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-start group">
                                                    <span className="mr-8 text-white/40 font-mono text-sm mt-1 transition-colors duration-500 group-hover:text-white/80">
                                                        {(fIndex + 1).toString().padStart(2, '0')}
                                                    </span>
                                                    <span className="text-lg text-white/90 font-light group-hover:text-white transition-colors duration-500">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Asymmetrical Pricing Visual */}
                                    <div className="w-full md:w-1/2 flex items-center justify-center">
                                        <div className="w-full aspect-[4/5] bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group p-12 text-center hover:bg-white/[0.05] transition-colors duration-1000">
                                            <h3 className="text-2xl font-serif mb-8 text-white/50">Secure your tier</h3>
                                            <Link
                                                href="/contact"
                                                onClick={() => logCtaClick({
                                                    cta_id: `pricing_select_${tier.name.toLowerCase().replace(/\s+/g, '_')}`,
                                                    cta_text: 'Select Plan',
                                                    cta_location: 'pricing_tiers'
                                                })}
                                                className="w-full inline-flex items-center justify-center px-8 py-6 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-all duration-500 group-hover:-translate-y-2"
                                            >
                                                Select Plan
                                            </Link>
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Add-Ons Section */}
            <section className="relative w-full py-48 border-t border-white/10">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12">
                        <h2 className="text-5xl md:text-7xl font-serif tracking-tighter leading-tight">
                            Targeted <br />
                            <span className="italic text-white/60">Add-Ons.</span>
                        </h2>
                        <p className="text-lg text-white/50 font-light max-w-sm mt-8 md:mt-0">
                            Customized enhancements tailored to your specific submission requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                        {addOns.map((addon, index) => (
                            <div key={index} className="flex flex-col group">
                                <div className="h-px w-12 bg-white/20 mb-8 group-hover:w-24 group-hover:bg-white transition-all duration-700" />
                                <h3 className="text-2xl font-serif mb-4 group-hover:text-white/80 transition-colors">
                                    {addon.name}
                                </h3>
                                <p className="text-white/50 font-light leading-relaxed mb-8">
                                    {addon.desc}
                                </p>
                                <Link href="/contact" className="mt-auto inline-flex items-center gap-2 text-sm tracking-widest font-mono text-white/40 hover:text-white transition-colors uppercase">
                                    Add to order <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Info */}
            <section className="relative w-full py-24 border-t border-white/10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
                        <motion.div
                            className="w-full md:w-1/2 flex flex-col items-start"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                                Payment
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-6">
                                How to <span className="italic text-white/60">Pay.</span>
                            </h2>
                            <p className="text-xl font-light text-white/60 leading-relaxed mb-12 max-w-lg">
                                We accept UPI, bank transfer, cards, and international wire. View our step-by-step payment process, accepted methods, and FAQs.
                            </p>
                            <Link
                                href="/pricing/payment"
                                className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
                            >
                                <span className="flex items-center gap-4">
                                    View Payment Details
                                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                                </span>
                            </Link>
                        </motion.div>

                        <motion.div
                            className="w-full md:w-1/2 flex items-center justify-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        >
                            <div className="w-full bg-white/[0.02] border border-white/5 p-12 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-1000">
                                <h3 className="text-2xl font-serif text-white mb-8">Quick Overview</h3>
                                <ul className="space-y-6">
                                    {[
                                        { step: "01", text: "Discuss your project & receive a quote" },
                                        { step: "02", text: "Approve & receive your invoice" },
                                        { step: "03", text: "Pay via UPI, card, or bank transfer" },
                                        { step: "04", text: "Work begins immediately" },
                                    ].map(item => (
                                        <li key={item.step} className="flex items-start group/item">
                                            <span className="mr-8 text-white/40 font-mono text-sm mt-1 transition-colors duration-500 group-hover/item:text-white/80">
                                                {item.step}
                                            </span>
                                            <span className="text-lg text-white/90 font-light group-hover/item:text-white transition-colors duration-500">
                                                {item.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Custom Quote Footer */}
            <section className="relative w-full py-40 border-t border-white/10 overflow-hidden bg-white text-black">
                <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8 leading-tight">
                        Require a <br />
                        <span className="italic text-black/60">Custom Scope?</span>
                    </h2>
                    <p className="text-xl text-black/70 font-light mb-16 max-w-2xl leading-relaxed text-balance">
                        Every research project possesses unique structural requirements. Connect with our experts to engineer a protocol tailored exclusively to your manuscript.
                    </p>

                    <Link
                        href="/contact"
                        onClick={() => logCtaClick({
                            cta_id: 'pricing_footer_quote',
                            cta_text: 'Request Custom Quote',
                            cta_location: 'pricing_footer'
                        })}
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-white bg-black hover:bg-black/80 transition-colors duration-500"
                    >
                        <span className="flex items-center gap-4">
                            Request Custom Quote
                            <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                        </span>
                    </Link>
                </div>
            </section>

        </main>
    );
}
