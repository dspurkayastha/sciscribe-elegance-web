"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const paymentMethods = [
    { name: "UPI", description: "Google Pay, PhonePe, Paytm, BHIM, or any UPI app" },
    { name: "Bank Transfer (NEFT/RTGS)", description: "Direct bank transfer to our account" },
    { name: "Credit / Debit Card", description: "Visa, Mastercard, Rupay, American Express" },
    { name: "Net Banking", description: "All major Indian banks supported" },
    { name: "International Wire", description: "SWIFT transfer for international clients" },
];

const steps = [
    { title: "Discuss Your Project", description: "Contact us with your requirements via the contact form, WhatsApp, or email." },
    { title: "Receive a Quote", description: "We'll review your manuscript and send a personalized quote within 24 hours." },
    { title: "Approve & Receive Invoice", description: "Once you approve the quote, we'll send a detailed invoice to your email." },
    { title: "Complete Payment", description: "Pay using any of the accepted methods. Share the transaction confirmation with us." },
    { title: "Work Begins", description: "Your project is assigned to a specialist editor and work begins immediately." },
];

const faqs = [
    { q: "What payment methods do you accept?", a: "We accept UPI, bank transfer (NEFT/RTGS), credit and debit cards, net banking, and international wire (SWIFT) transfers." },
    { q: "How does the invoice process work?", a: "After discussing your project requirements, we'll send you a personalized quote. Once approved, you'll receive an invoice with payment details to your email." },
    { q: "Is advance payment required?", a: "Yes, we require full payment before work begins. For large projects (>₹50,000), we offer a 50-50 split — 50% upfront and 50% on delivery." },
    { q: "Do you offer discounts for bulk orders?", a: "Yes, we offer volume discounts for large projects, recurring clients, and educational institutions. Contact us to discuss your specific needs." },
    { q: "What is your refund policy?", a: "We strive for 100% satisfaction. If you're not satisfied, let us know within 7 days of delivery and we'll address your concerns. See our full refund policy for details." },
    { q: "Will I receive a receipt?", a: "Yes, an electronic receipt is sent to your email immediately after payment confirmation. You can also request a GST invoice." },
];

export default function PaymentPage() {
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
                        <Link href="/pricing" className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block hover:text-white/70 transition-colors">
                            ← Back to Pricing
                        </Link>
                        <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-white select-none">
                            How to <br />
                            <span className="italic text-white/60">Pay.</span>
                        </h1>
                        <p className="mt-12 text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed text-balance">
                            Simple, transparent payment process. No hidden fees. Multiple payment methods accepted.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Process Steps — Alternating Layout */}
            <section className="relative w-full py-24 pb-48">
                <div className="hidden 2xl:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 z-0" />
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            Process
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-24">
                            Step by <span className="italic text-white/60">Step.</span>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-y-32 md:gap-y-56">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={step.title}
                                    className={`w-full flex flex-col items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? 'items-start md:pr-12' : 'items-start md:pl-12'}`}>
                                        <div className="flex items-baseline gap-4 mb-6">
                                            <span className="text-3xl font-mono text-white/60 italic">0{index + 1}</span>
                                            <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">{step.title}</h3>
                                        </div>
                                        <p className="text-xl md:text-2xl font-light text-white mb-6 leading-relaxed">{step.description}</p>
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

            {/* Payment Methods */}
            <section className="relative w-full py-24 border-y border-white/10">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            Accepted Methods
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-16">
                            Payment <span className="italic text-white/60">Options.</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paymentMethods.map((m, i) => (
                            <motion.div
                                key={m.name}
                                className="w-full bg-white/[0.02] border border-white/5 p-8 hover:bg-white/[0.05] transition-colors duration-1000"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            >
                                <h3 className="text-xl font-serif text-white mb-2">{m.name}</h3>
                                <p className="text-base text-white/50 font-light leading-relaxed">{m.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="relative w-full py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-8 block">
                            FAQ
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-16">
                            Payment <span className="italic text-white/60">Questions.</span>
                        </h2>
                    </motion.div>

                    <div className="space-y-0">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                className="py-10 border-b border-white/10 first:border-t"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.05 }}
                            >
                                <div className="flex items-baseline gap-6 mb-3">
                                    <span className="text-lg font-mono text-white/30 italic">{String(i + 1).padStart(2, '0')}</span>
                                    <h3 className="text-xl font-serif text-white">{faq.q}</h3>
                                </div>
                                <p className="text-base text-white/60 font-light leading-relaxed pl-12">{faq.a}</p>
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
                        Need an <span className="italic text-white/60">Invoice?</span>
                    </h2>
                    <p className="text-xl text-white/50 font-light mb-16 max-w-2xl leading-relaxed text-balance">
                        Contact us and we&apos;ll respond promptly with your invoice details.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link
                            href="/contact"
                            className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
                        >
                            <span className="flex items-center gap-4">
                                Contact Us
                                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                            </span>
                        </Link>
                        <Link
                            href="/refund"
                            className="group inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-white/50 border border-white/10 hover:bg-white/[0.05] hover:text-white transition-all duration-500"
                        >
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
