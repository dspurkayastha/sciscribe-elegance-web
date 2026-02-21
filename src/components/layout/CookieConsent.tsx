"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setAnalyticsConsent, getAnalyticsConsent, COOKIE_CONSENT_KEY } from "@/utils/analyticsConsent";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if user hasn't made a choice yet
        const hasChosen = typeof window !== "undefined" && localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!hasChosen) {
            // Small delay so it doesn't flash on load
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setAnalyticsConsent(true);
        setIsVisible(false);
        // Reload gtag if it's already loaded
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                analytics_storage: "granted",
            });
        }
    };

    const handleDecline = () => {
        setAnalyticsConsent(false);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-6 right-6 z-[60] w-[340px] bg-[#0a0a12] border border-white/[0.08] shadow-2xl shadow-black/50 p-6"
                >
                    {/* Header */}
                    <p className="text-xs tracking-[0.3em] font-mono text-white/40 uppercase mb-3">
                        Privacy
                    </p>
                    <h3 className="text-lg font-serif text-white font-normal leading-snug mb-3">
                        We value your <em className="italic">privacy</em>
                    </h3>

                    {/* Body */}
                    <p className="text-sm font-light text-white/50 leading-relaxed mb-6">
                        We use cookies to understand how you interact with our site and improve your experience.
                        No personal data is sold.{" "}
                        <a href="/privacy" className="text-white/60 underline underline-offset-2 decoration-white/20 hover:text-white/80 transition-colors">
                            Privacy Policy
                        </a>
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleAccept}
                            className="flex-1 py-2.5 border border-white/20 bg-white/[0.06] text-white/90 hover:bg-white/[0.12] hover:border-white/30 transition-all text-xs font-mono uppercase tracking-wider"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleDecline}
                            className="flex-1 py-2.5 border border-white/[0.06] bg-transparent text-white/40 hover:text-white/60 hover:border-white/10 transition-all text-xs font-mono uppercase tracking-wider"
                        >
                            Decline
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
