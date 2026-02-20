"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PricingContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wordCount: "",
    details: ""
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCustomQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request submitted:", formData);
    setDialogOpen(false);
    setFormData({ name: "", email: "", wordCount: "", details: "" });
    alert("Request Transmitted. An architect will contact you shortly.");
  };

  const tiers = [
    {
      name: "The Insight",
      desc: "Fundamental refinement. Grammar, syntax, and structural clarity ensuring your research speaks without obstruction.",
      price: "$0.02",
      metric: "per word"
    },
    {
      name: "The Enhance",
      desc: "Comprehensive logic and flow optimization. Addressing reviewer critiques with precise, authoritative counter-arguments.",
      price: "$0.04",
      metric: "per word"
    },
    {
      name: "The Complete",
      desc: "The absolute standard. From raw data interpretation to final journal formatting, cover letter architecture, and submission targeting.",
      price: "$0.06",
      metric: "per word"
    }
  ];

  const addons = [
    "Plagiarism Mitigation",
    "Journal Adherence Formatting",
    "Abstract & Cover Letter Assembly",
    "Statistical Data Interpretation",
    "Visual Figure Architecture",
    "Expedited 72-Hour Delivery"
  ];

  return (
    <main className="flex flex-col relative w-full overflow-hidden z-10 pt-32 md:pt-48 pb-24">
      <div className="container mx-auto px-6 md:px-12">

        {/* Massive Page Header */}
        <motion.div
          className="mb-32 md:mb-48 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] md:text-[8vw] font-serif leading-[0.9] tracking-tighter text-white">
            Investment <br />
            <span className="italic text-white/50">& Structure.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl font-light text-white/50 max-w-2xl text-balance">
            Transparent, uncompromising quality. Every tier provides access to PhD-level editorial architects dedicated to elevating your manuscript.
          </p>
        </motion.div>

        {/* Dense Typographic Tiers */}
        <div className="border-t border-white/20 mb-32">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col lg:flex-row items-baseline justify-between py-12 md:py-20 border-b border-white/10 hover:border-white transition-colors duration-500 w-full relative"
            >

              <div className="flex flex-col gap-4 md:w-5/12">
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight group-hover:italic group-hover:pl-4 transition-all duration-700 ease-[0.16,1,0.3,1]">
                  {tier.name}
                </h2>
              </div>

              <div className="md:w-4/12 mt-6 lg:mt-0">
                <p className="text-sm md:text-base font-light text-white/70 max-w-sm leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              <div className="md:w-3/12 mt-8 lg:mt-0 flex flex-col justify-end lg:items-end">
                <span className="text-4xl md:text-6xl font-mono tracking-tighter text-white">{tier.price}</span>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 mt-2">{tier.metric}</span>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Add-ons & Variables */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32 mb-32">
          <div className="w-full md:w-1/2">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[6vw] md:text-[3vw] font-serif leading-[0.9] tracking-tighter text-white"
            >
              Variables <br />
              <span className="italic text-white/50">& Enhancements.</span>
            </motion.h3>
          </div>

          <div className="w-full md:w-1/2">
            <div className="border-t border-white/20">
              {addons.map((addon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="py-6 border-b border-white/10 flex justify-between items-center group cursor-default"
                >
                  <span className="text-lg md:text-xl font-light text-white/80 group-hover:text-white transition-colors">{addon}</span>
                  <span className="text-xs font-mono text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">+ Quote</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <motion.div
          className="text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-12">
            Architecting a novel study?
          </h2>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className="group relative inline-flex items-center justify-center px-12 py-6 text-sm tracking-widest uppercase font-mono text-white border border-white/20 hover:border-white/60 transition-colors duration-500 overflow-hidden">
              <span className="relative z-10 flex items-center gap-4">
                Request Custom Parameter
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
              <div className="absolute inset-0 bg-white/5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl bg-[#0a0a0a] border border-white/10 rounded-none p-8 md:p-12">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-3xl font-serif text-white font-normal">Custom Parameter.</DialogTitle>
                <DialogDescription className="text-white/50 font-light hidden">
                  Request a quote.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCustomQuoteSubmit} className="space-y-8">
                <div className="relative">
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors peer"
                    placeholder="Name"
                  />
                  <label className="absolute left-0 top-3 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/40 peer-valid:font-mono peer-valid:uppercase">Architect Name</label>
                </div>

                <div className="relative">
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors peer"
                    placeholder="Email"
                  />
                  <label className="absolute left-0 top-3 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/40 peer-valid:font-mono peer-valid:uppercase">Transmission Email</label>
                </div>

                <div className="relative">
                  <input
                    type="text" required
                    value={formData.wordCount}
                    onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors peer"
                    placeholder="Word Count"
                  />
                  <label className="absolute left-0 top-3 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/40 peer-valid:font-mono peer-valid:uppercase">Approximate Volume (Words)</label>
                </div>

                <div className="relative">
                  <textarea
                    required rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white text-lg placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors peer resize-none"
                    placeholder="Details"
                  />
                  <label className="absolute left-0 top-3 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:uppercase peer-valid:-top-4 peer-valid:text-xs peer-valid:text-white/40 peer-valid:font-mono peer-valid:uppercase">Study Parameters & Objectives</label>
                </div>

                <button type="submit" className="w-full group relative inline-flex items-center justify-center px-8 py-6 text-sm tracking-widest uppercase font-mono text-black bg-white hover:bg-white/90 transition-colors duration-500 overflow-hidden">
                  <span className="relative z-10">Initialize Sequence</span>
                </button>
              </form>
            </DialogContent>
          </Dialog>

        </motion.div>

      </div>
    </main>
  );
};

export default PricingContent;
