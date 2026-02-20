"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, UserCheck, Lock, Wrench, Clock, FileCheck, CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/useAnalytics";

const WhyChooseUsSection = () => {
  const { logCtaClick } = useAnalytics();
  const reasons = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Academic Expertise",
      description: "Our editors are subject-matter experts with research backgrounds — not just language correctors. We understand academic rigor and publication standards.",
      benefits: ["PhD-level subject expertise", "Research publication experience", "Field-specific knowledge"]
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Personalized Support",
      description: "We don't use templates. Every project is tailored to your goals, research field, and stage of submission — with real human input.",
      benefits: ["Customized editing approach", "One-on-one consultations", "Targeted feedback"]
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Transparent Pricing",
      description: "No hidden charges. No shortcuts. We offer honest pricing, transparent feedback, and maintain 100% confidentiality of your work.",
      benefits: ["Clear pricing structure", "Honest Pricing Assessment", "Best Rates in Academia"]
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "End-to-End Services",
      description: "From manuscript editing and plagiarism reduction to thesis formatting and cover letters — all under one roof.",
      benefits: ["Comprehensive solutions", "Integrated workflow", "Single point of contact"]
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Responsive & Reliable",
      description: "We stay available throughout the process — updating you, answering questions, and delivering on time. Your deadline is our priority.",
      benefits: ["24-hour response time", "On-time delivery guarantee", "Regular progress updates"]
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Confidential & Secure",
      description: "We treat your work with care and respect. Files are stored securely and deleted after delivery unless otherwise requested.",
      benefits: ["Secure file handling", "NDA protection available", "Privacy-first approach"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-sciscribe-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-sciscribe-gold/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <Badge className="mb-4 bg-sciscribe-gold/10 text-sciscribe-gold hover:bg-sciscribe-gold/20 transition-colors">
            Our Difference
          </Badge>
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">
            Why Choose Us?
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            What sets SciScribe Solutions apart from other scientific editing services
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={cn(
                "premium-glassmorphism flex flex-col h-full rounded-xl overflow-hidden",
                "border border-sciscribe-blue/10 hover:border-sciscribe-gold/30",
                "hover:shadow-xl transition-all duration-500"
              )}
            >
              {/* Card header with gradient */}
              <div className="bg-gradient-to-r from-sciscribe-teal/10 to-sciscribe-gold/10 p-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br from-sciscribe-gold/20 to-transparent blur-xl pointer-events-none" />

                <div className="mb-3 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/80 dark:bg-sciscribe-navy/50 border border-sciscribe-mist/30 dark:border-white/10 shadow-md">
                    {reason.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">
                  {reason.title}
                </h3>
              </div>

              {/* Card body */}
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-foreground/80 mb-6">
                  {reason.description}
                </p>

                {/* Benefits list */}
                <ul className="space-y-2 mb-6">
                  {reason.benefits?.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <div className="mr-2 text-sciscribe-gold">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/contact"
            onClick={() => {
              logCtaClick({
                cta_id: 'why_choose_us_get_started',
                cta_text: 'Get Started Today',
                cta_location: 'why_choose_us_section'
              });
            }}
          >
            <Button
              className="bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal hover:from-sciscribe-blue/90 hover:to-sciscribe-teal/90 text-white group"
              size="lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
