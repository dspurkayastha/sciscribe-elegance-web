import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
import { ParticleGlow } from "@/components/ui/ParticleGlow";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ConsultationOverlay } from "./ConsultationOverlay";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  
  useEffect(() => {
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
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Modern Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Modern abstract background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(140,85,247,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(40deg,rgba(20,210,190,0.05)_0%,rgba(59,130,246,0.05)_30%,rgba(140,85,247,0.05)_70%)]" />
        <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgNTAgQzE3IDE1IDEwIDAgMTAgMCBMNDAgMCBDNDAgMCA1MCAxNSAzMCA1MFoiIGZpbGw9InJnYmEoMjAsIDIxMCwgMTkwLCAwLjAzKSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwgMzAsIDMwKSI+PC9wYXRoPgo8cGF0aCBkPSJNMzAgNTAgQzE3IDE1IDEwIDAgMTAgMCBMNDAgMCBDNDAgMCA1MCAxNSAzMCA1MFoiIGZpbGw9InJnYmEoMTQwLCA4NSwgMjQ3LCAwLjAzKSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwLCAzMCwgMzApIj48L3BhdGg+CjxwYXRoIGQ9Ik0zMCA1MCBDMTcgMTUgMTAgMCAxMCAwIEw0MCAwIEM0MCAwIDUwIDE1IDMwIDUwWiIgZmlsbD0icmdiYSgyMCwgMjEwLCAxOTAsIDAuMDMpIiB0cmFuc2Zvcm09InJvdGF0ZSgyNDAsIDMwLCAzMCkiPjwvcGF0aD4KPC9zdmc+')]" />
      </div>

      {/* Floating Decorative Elements */}
      <div aria-hidden="true" className="select-none">
        <motion.div 
          className="absolute left-[10%] top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute right-[15%] top-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>

      {/* Content */}
      <div 
        ref={heroRef}
        className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mx-auto mb-8 inline-flex items-center rounded-full border border-primary/20 bg-background/80 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur"
          >
            <span className="mr-1 flex h-2 w-2 rounded-full bg-primary"></span>
            Redefining Scientific Communication
          </motion.div>
          
          {/* Main Title */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            <span className="block">Elevate Your Research.</span> 
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Perfect Your Manuscript.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 md:text-xl"
          >
            Expert scientific editing, publication support, and research consultancy
            that transforms your work into compelling scientific narratives.
          </motion.p>

          {/* Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            {/* 1. Get a Free Consult */}
            <div className="relative group w-full sm:w-auto rounded-lg overflow-hidden">
              {/* particle glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-lg">
                <ParticleGlow
                  particleColor="rgba(94, 234, 212, 0.8)"
                  particleCount={20}
                  speedRange={[0.1, 0.3]}
                  sizeRange={[1, 3]}
                  glowSizeMultiplier={4}
                />
              </div>
              <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-sciscribe-teal/40 via-sciscribe-blue/50 to-sciscribe-teal/40 blur opacity-70 group-hover:opacity-90 transition-all duration-300 animate-pulse" />
              <Button
                onClick={() => setIsConsultationOpen(true)}
                variant="default"
                size="lg"
                className="relative px-6 py-6 text-base font-medium text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:scale-[1.02] z-10 bg-gradient-to-r from-sciscribe-teal to-sciscribe-blue"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <MessageCircleMore className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>Get a Free Consult !!</span>
                </div>
                <Sparkles className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </div>

            {/* 2. View Pricing */}
            <div className="relative group w-full sm:w-auto rounded-lg overflow-hidden">
              <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-sciscribe-gold/30 to-amber-300/30 blur opacity-70 group-hover:opacity-90 transition-all duration-300" />
              <Button
                asChild
                size="lg"
                className="relative px-6 py-6 text-base font-medium overflow-hidden transition-all duration-300 hover:scale-[1.02] z-10 bg-gradient-to-br from-sciscribe-gold to-amber-300 dark:to-amber-300"
              >
                <Link to="/pricing" className="flex items-center justify-center no-underline">
                  <span>View Pricing</span>
                </Link>
              </Button>
            </div>

            {/* 3. Get Started Today */}
            <div className="relative group w-full sm:w-auto rounded-lg overflow-hidden">
              <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-sciscribe-teal/40 via-sciscribe-blue/50 to-sciscribe-teal/40 blur opacity-70 group-hover:opacity-90 transition-all duration-300" />
              <Button
                asChild
                size="lg"
                className="relative px-6 py-6 text-base font-medium text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] z-10 bg-gradient-to-br from-sciscribe-teal to-sciscribe-blue"
              >
                <Link to="/services" className="flex items-center justify-center gap-2 no-underline">
                  <span>Get Started Today</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
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
      
      {/* Consultation Overlay */}
      <ConsultationOverlay 
        isOpen={isConsultationOpen} 
        onClose={() => setIsConsultationOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;
