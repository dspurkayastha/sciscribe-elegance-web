import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ContactSection from "./ContactSection";
import ContactSectionSummerOffer from "./ContactSectionSummerOffer";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDebounce } from "@/hooks/use-debounce";

// Countdown timer hook
const OFFER_DEADLINE = new Date("2025-07-31T23:59:59+05:30").getTime();
function useCountdown(deadline: number) {
  const [timeLeft, setTimeLeft] = React.useState(deadline - Date.now());
  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(deadline - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline, timeLeft]);
  if (timeLeft <= 0) return null;
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function getQueryParam(search: string, key: string): string | null {
  const params = new URLSearchParams(search);
  return params.get(key);
}

const glassCard =
  "relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg rounded-3xl shadow-xl border border-sciscribe-gold/20 dark:border-sciscribe-gold/30 p-8 md:p-12 max-w-2xl mx-auto animate-fade-in";

const SummerOfferSection: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const code = getQueryParam(location.search, "code") || "ADQR2025";
  const countdown = useCountdown(OFFER_DEADLINE);
  const debouncedCountdown = useDebounce(countdown, 1000);
  const offerExpired = !countdown;
  
  // Update glass card styles for mobile
  const glassCard = `relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg rounded-3xl shadow-xl 
    border border-sciscribe-gold/20 dark:border-sciscribe-gold/30 
    ${isMobile ? 'p-6 mx-4' : 'p-8 md:p-12'} 
    max-w-2xl w-full mx-auto animate-fade-in`;

  // Memoize countdown rendering to prevent unnecessary re-renders
  const renderCountdown = useMemo(() => {
    if (!countdown) return null;
    
    if (isMobile) {
      return (
        <Badge variant="default" className="text-sm px-3 py-1.5 rounded-full animate-glow">
          {countdown.days > 0 && `${countdown.days}d `}
          {countdown.hours}h {countdown.minutes}m
        </Badge>
      );
    }
    
    return (
      <Badge variant="default" className="text-lg px-4 py-2 rounded-full animate-glow">
        {countdown.days > 0 && `${countdown.days}d `}
        {countdown.hours}h {countdown.minutes}m {countdown.seconds}s left
      </Badge>
    );
  }, [countdown, isMobile]);

  return (
    <section className="relative z-10 py-16 md:py-24 flex items-center justify-center min-h-[80vh]">
      {/* Glow/Glassmorphism Effects */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-br from-sciscribe-gold/40 to-sciscribe-amber/30 blur-3xl opacity-60 -z-20" />
      <div className="absolute bottom-0 right-0 w-96 h-56 rounded-full bg-gradient-to-tr from-sciscribe-blue/30 to-sciscribe-gold/20 blur-3xl opacity-50 -z-20" />

      <motion.div
        className={glassCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-4 items-center text-center mb-4 md:mb-6">
          <motion.h1
            className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber bg-clip-text text-transparent`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Summer 2025 Exclusive Offer
          </motion.h1>
          
          <motion.p
            className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-foreground/80`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Claim your special discount by submitting the form below. Limited time only!
          </motion.p>
          
          <div className="flex flex-col items-center gap-2">
            {offerExpired ? (
              <Badge variant="destructive" className={`${isMobile ? 'text-sm px-3 py-1' : 'text-lg px-4 py-2'} rounded-full animate-pulse`}>
                Offer Expired
              </Badge>
            ) : (
              renderCountdown
            )}
          </div>
        </div>
        
        <ContactSectionSummerOffer
          prefillCode={code}
          hideInfoPanel={isMobile} // Hide on mobile to save space
          disabled={offerExpired}
          headline={isMobile ? "Claim Your Offer" : "Claim Your Summer Discount"}
          subtext="Submit your details and our team will reach out with your exclusive offer. Hurry, spots are limited!"
        />
      </motion.div>
    </section>
  );
};

export default SummerOfferSection;
