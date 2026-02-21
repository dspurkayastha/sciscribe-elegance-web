"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { motion } from "framer-motion";
import { submitToFirestore } from "@/lib/firestore";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { logFormSubmitted } = useAnalytics();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitToFirestore("quick_contacts", formData);

      toast({
        title: "Message Sent.",
        description: "We will respond shortly."
      });

      logFormSubmitted({
        form_id: 'contact_quick',
        form_name: 'Quick Contact Form',
        success: true
      });

      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-32 md:py-48 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Received.</h2>
          <p className="text-white/50 font-light mb-12">An architect will be in touch shortly.</p>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-white hover:text-white/60 font-mono text-sm uppercase tracking-widest transition-colors"
          >
            ← Return
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 md:py-48 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32">

          {/* Massive Typographic Header */}
          <div className="w-full md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[8vw] md:text-[5vw] font-serif leading-[0.9] tracking-tighter text-white"
            >
              Initiate <br />
              <span className="italic text-white/50">Dialogue.</span>
            </motion.h2>

            <div className="mt-16 space-y-8 text-sm font-mono text-white/40 tracking-widest uppercase">
              <div>
                <p className="mb-2 text-white/20">Direct Line</p>
                <p className="text-white hover:text-white/70 transition-colors">contact@sciscribesolutions.com</p>
              </div>
              <div>
                <p className="mb-2 text-white/20">Location</p>
                <p className="text-white">Hazra Road, Kolkata</p>
              </div>
            </div>
          </div>

          {/* Stark Input Form */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <form onSubmit={handleSubmit} className="space-y-12">

              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-4 text-white text-lg placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors peer"
                  placeholder="Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/40 peer-valid:font-mono peer-valid:tracking-widest peer-valid:uppercase"
                >
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-4 text-white text-lg placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors peer"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/40 peer-valid:font-mono peer-valid:tracking-widest peer-valid:uppercase"
                >
                  Your Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-4 text-white text-lg placeholder:text-transparent focus:outline-none focus:ring-0 focus:border-white transition-colors peer resize-none"
                  placeholder="Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-white peer-focus:font-mono peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/40 peer-valid:font-mono peer-valid:tracking-widest peer-valid:uppercase"
                >
                  Project Details
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center w-full px-8 py-6 text-sm tracking-widest uppercase font-mono text-white border border-white/20 hover:border-white/60 transition-colors duration-500 overflow-hidden disabled:opacity-50"
              >
                <span className="relative z-10">
                  {isSubmitting ? "Transmitting..." : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-white/5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
