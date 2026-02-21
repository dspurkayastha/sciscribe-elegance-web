"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { submitToFirestore } from "@/lib/firestore";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const serviceOptions = [
    "Insight Package", "Enhance Package", "Complete Package",
    "Plagiarism Check", "Journal Formatting", "Statistical Analysis",
    "Scientific Figures", "Other Service",
];

export default function FeedbackPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [service, setService] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [feedback, setFeedback] = useState("");
    const [consent, setConsent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating) {
            toast({ title: "Please select a rating", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);

        try {
            await submitToFirestore("feedback", {
                name,
                email,
                serviceUsed: service,
                rating,
                feedbackText: feedback,
                consentToShow: consent,
            });
            setIsSuccess(true);
            toast({ title: "Feedback submitted", description: "Thank you for helping us improve." });
        } catch {
            toast({ title: "Submission failed", description: "Please try again.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            Feedback
                        </span>
                        <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.85] tracking-tighter text-white select-none">
                            Share Your <br />
                            <span className="italic text-white/60">Experience.</span>
                        </h1>
                        <p className="mt-12 text-xl md:text-2xl font-light text-white/60 max-w-3xl leading-relaxed text-balance">
                            Your feedback helps us improve and serve the scientific community better.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section className="relative w-full py-24 pb-48">
                <div className="container mx-auto px-6 max-w-3xl">

                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full bg-white/[0.02] border border-white/5 p-16 text-center"
                        >
                            <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-6">Thank You.</h2>
                            <p className="text-xl text-white/50 font-light leading-relaxed mb-12">
                                Your feedback is invaluable in our mission to provide the best scientific editing and support services.
                            </p>
                            <Link
                                href="/"
                                className="group relative inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500"
                            >
                                <span className="flex items-center gap-4">
                                    Back to Home
                                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                                </span>
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="space-y-12"
                        >
                            {/* Name + Email Row */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-3 block">Your Name *</label>
                                    <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 focus:border-white/60 focus:ring-0 focus:outline-none transition-colors py-4 text-lg font-light" placeholder="Full name" />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-3 block">Email *</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 focus:border-white/60 focus:ring-0 focus:outline-none transition-colors py-4 text-lg font-light" placeholder="your.email@example.com" />
                                </div>
                            </div>

                            {/* Service */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-3 block">Service Used</label>
                                <select value={service} onChange={e => setService(e.target.value)} className="w-full bg-transparent border-b border-white/20 text-white focus:border-white/60 focus:ring-0 focus:outline-none transition-colors py-4 text-lg font-light appearance-none cursor-pointer">
                                    <option value="" className="bg-black">Select a service</option>
                                    {serviceOptions.map(s => (
                                        <option key={s} value={s} className="bg-black">{s}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-6 block">Rating *</label>
                                <div className="flex gap-4">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`w-16 h-16 border font-serif text-2xl transition-all duration-500 ${rating && star <= rating
                                                    ? "bg-white text-black border-white"
                                                    : "bg-transparent border-white/10 text-white/30 hover:border-white/30"
                                                }`}
                                        >
                                            {star}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Feedback Text */}
                            <div>
                                <label className="text-xs uppercase tracking-[0.3em] font-mono text-white/50 mb-3 block">Your Feedback *</label>
                                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} required rows={6} className="w-full bg-transparent border border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-0 focus:outline-none transition-colors p-6 text-lg font-light resize-none" placeholder="Please share your experience with our services..." />
                            </div>

                            {/* Consent */}
                            <div className="flex items-start gap-4">
                                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1.5 w-5 h-5 bg-transparent border border-white/20 appearance-none checked:bg-white cursor-pointer" />
                                <label className="text-base font-light text-white/60">I agree to receive updates and offers from SciScribe Solutions</label>
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={isSubmitting} className="group relative w-full inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 disabled:opacity-40 transition-colors duration-500">
                                <span className="flex items-center gap-4">
                                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                                    {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />}
                                </span>
                            </button>
                        </motion.form>
                    )}

                </div>
            </section>

        </main>
    );
}
