"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  avatarSrc?: string;
  avatarColor?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  return (
    <div className={cn("mx-auto max-w-sm px-4 py-6 font-sans antialiased md:max-w-3xl md:px-8 lg:px-12", className)}>
      <div className="relative flex flex-col items-center">
        {/* Stacked cards container */}
        <div className="relative w-full max-w-lg h-[400px] mx-auto">
          {/* Background stacked cards */}
          <div className="absolute top-2 left-2 right-2 bottom-0 bg-card/20 rounded-lg shadow-sm"></div>
          <div className="absolute top-1 left-1 right-1 bottom-0 bg-card/40 rounded-lg shadow-sm"></div>
          
          {/* Main card with content */}
          <div className="relative h-full w-full bg-card rounded-lg shadow-lg border border-border/30 overflow-hidden">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === active && (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 p-8 flex flex-col"
                  >
                    {/* Big quotation mark - upper right corner */}
                    <div className="absolute top-6 right-6 text-muted-foreground/20">
                      <Quote size={64} strokeWidth={1} className="transform scale-x-[-1] rotate-180" />
                    </div>
                    
                    {/* Quote content */}
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent pr-2 pt-8">
                      <p className="text-lg leading-relaxed text-foreground">
                        {testimonial.quote}
                      </p>
                    </div>
                    
                    {/* Author info */}
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <h4 className="text-sm font-medium text-foreground">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-teal/10 hover:from-sciscribe-blue/20 hover:to-sciscribe-teal/20 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sciscribe-blue/10 to-sciscribe-teal/10 hover:from-sciscribe-blue/20 hover:to-sciscribe-teal/20 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5 text-foreground transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
