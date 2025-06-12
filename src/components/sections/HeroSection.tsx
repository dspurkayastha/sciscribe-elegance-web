import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
import { ParticleGlow } from "@/components/ui/ParticleGlow";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ConsultationOverlay } from "./ConsultationOverlay";
import { useAnalytics } from "@/hooks/useAnalytics";
import useResponsiveImage from "@/hooks/useResponsiveImage";

// Separate component for the hero background image to optimize rendering
const HeroBackgroundImage = () => {
  // Use client-side only window measurement to avoid SSR issues
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    // Set initial width only after component mounts (client-side)
    setWindowWidth(window.innerWidth);
    
    // Function to update window width using requestAnimationFrame for performance
    const handleResize = () => {
      // Use RAF to avoid excessive updates during resize
      requestAnimationFrame(() => {
        setWindowWidth(window.innerWidth);
      });
    };
    
    // Add event listener with passive option for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Select appropriate image based on screen width
  const getBackgroundImage = useMemo(() => {
    // Default image for SSR or before client measurement
    if (windowWidth === 0) {
      return '/images/hero-banner.webp';
    }
    
    if (windowWidth <= 480) {
      return '/images/responsive/hero-banner-small.webp';
    } else if (windowWidth <= 768) {
      return '/images/responsive/hero-banner-mobile.webp';
    } else {
      return '/images/hero-banner.webp';
    }
  }, [windowWidth]);

  return (
    <div 
      className="absolute inset-0 bg-cover bg-center" 
      style={{ 
        backgroundImage: `url('${getBackgroundImage}')`,
        willChange: "transform",
        contain: "paint"
      }} 
    />
  );
};

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const { logCtaClick } = useAnalytics();
  
  const benefits = [
    "3x Faster Turnaround Times",
    "100% Native English Editors",
    "Publication-Ready Deliverables",
    "Lowest in segment prices"
  ];
  
  // Rotate through benefits every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [benefits.length]);
  
  useEffect(() => {
    // Use requestAnimationFrame for better scroll performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - Math.min(scrollY / 500, 1);
      const scale = 1 + scrollY * 0.0003;
      const translateY = scrollY * 0.5;
      
      if (heroRef.current) {
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-visible md:h-screen md:overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Hero background image - optimized with responsive images */}
        <HeroBackgroundImage />
        
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_70%,rgba(140,85,247,0.08)_0%,transparent_60%)]" />
      </div>

      {/* Floating Decorative Elements (only on left side) */}
      <div aria-hidden="true" className="select-none hidden sm:block">
        <motion.div 
          className="absolute left-[10%] top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -20, 0],
            opacity: [0.4, 0.7, 0.4] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute left-[15%] bottom-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            x: [0, -15, 0], 
            y: [0, 15, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>

      {/* Content - Left aligned */}
      <div 
        ref={heroRef}
        className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center px-6 text-left"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl lg:max-w-2xl pt-16 sm:pt-0"
        >
          {/* Badge - hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8 hidden sm:inline-flex items-center rounded-full border border-primary/20 bg-background/80 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur"
          >
            <span className="mr-1 flex h-2 w-2 rounded-full bg-primary"></span>
            Redefining Scientific Communication
          </motion.div>
          
          {/* Main Title */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="block">Elevate Your</span> 
            <span className="block">Research.</span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Perfect Your Manuscript.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-10 max-w-lg text-lg text-foreground/90 md:text-xl"
          >
            Expert editing, advanced statistics, and publication support—
            delivered with speed, clarity, and guaranteed results.
          </motion.p>



          {/* Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-full flex flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            {/* 1. Get a Free Consult */}
            <div className="relative group w-full sm:w-auto rounded-lg overflow-hidden">
              {/* particle glow (hidden on mobile) */}
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-lg hidden sm:block">
                <ParticleGlow
                  particleColor="rgba(94, 234, 212, 0.8)"
                  particleCount={20}
                  speedRange={[0.1, 0.3]}
                  sizeRange={[1, 3]}
                  glowSizeMultiplier={4}
                />
              </div>
              <div className="hidden sm:block absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-sciscribe-teal/40 via-sciscribe-blue/50 to-sciscribe-teal/40 blur opacity-70 group-hover:opacity-90 transition-all duration-300 sm:animate-pulse" />
              <Button
                onClick={() => {
                  setIsConsultationOpen(true);
                  // Track CTA click
                  logCtaClick({
                    cta_id: 'hero_consultation_button',
                    cta_text: 'Get a Free Consult',
                    cta_location: 'hero_section'
                  });
                }}
                variant="default"
                size="lg"
                className="relative px-6 py-6 text-base font-medium text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-[1.02] z-10 bg-gradient-to-r from-sciscribe-teal to-sciscribe-blue"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <MessageCircleMore className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>Get a Free Consult<sup>*</sup></span>
                </div>
                <Sparkles className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>

            {/* 2. View Pricing */}
            <div className="relative group w-full sm:w-auto rounded-lg overflow-hidden">
              <div className="hidden sm:block absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-sciscribe-gold/30 to-amber-300/30 blur opacity-70 group-hover:opacity-90 transition-all duration-300" />
              <Button
                asChild
                size="lg"
                className="relative px-6 py-6 text-base font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] z-10 bg-gradient-to-br from-sciscribe-gold to-amber-300 dark:to-amber-300"
              >
                <Link 
                  to="/pricing" 
                  className="flex items-center justify-center no-underline"
                  onClick={() => {
                    logCtaClick({
                      cta_id: 'hero_pricing_button',
                      cta_text: 'View Pricing',
                      cta_location: 'hero_section'
                    });
                  }}>
                  <span>View Pricing</span>
                </Link>
              </Button>
            </div>

            {/* 3. Get Started Today */}
            <div className="relative group w-full sm:w-auto rounded-lg overflow-hidden">
              <div className="hidden sm:block absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-sciscribe-teal/40 via-sciscribe-blue/50 to-sciscribe-teal/40 blur opacity-70 group-hover:opacity-90 transition-all duration-300" />
              <Button
                asChild
                size="lg"
                className="relative px-6 py-6 text-base font-medium text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] z-10 bg-gradient-to-br from-sciscribe-teal to-sciscribe-blue"
              >
                <Link 
                  to="/contact" 
                  className="flex items-center justify-center gap-2 no-underline"
                  onClick={() => {
                    logCtaClick({
                      cta_id: 'hero_free_review_button',
                      cta_text: 'Get a Free Review',
                      cta_location: 'hero_section'
                    });
                  }}>
                  <span>Get a Free Review<sup>**</sup></span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Microtype text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-4 text-xs text-muted-foreground flex flex-row justify-center sm:justify-start space-x-6 font-mono italic tracking-wide"
        >
          <span>* No commitments</span>
          <span>** No hidden charges</span>
        </motion.div>
      </div>

      {/* Animated benefits text (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-24 left-[47%] z-10 text-center">
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBenefitIndex}
              initial={{ x: 40, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -40, opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15,
                duration: 0.6 
              }}
              className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              {benefits[currentBenefitIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator (hidden on mobile) - positioned below middle button */}
      <motion.div
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" className="flex flex-col items-center text-foreground/60 hover:text-foreground">
          <span className="mb-2 text-sm">Scroll to explore</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </motion.div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      
      {/* Subtle vignette overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.15)_100%)] mix-blend-multiply" />
      
      {/* Consultation Overlay */}
      <ConsultationOverlay 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;