import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ContactSectionSummerOfferProps {
  prefillCode?: string;
  hideInfoPanel?: boolean;
  disabled?: boolean;
  headline?: string;
  subtext?: string;
}

const ContactSectionSummerOffer: React.FC<ContactSectionSummerOfferProps> = ({
  prefillCode = "",
  hideInfoPanel = false,
  disabled = false,
  headline = "Contact Us",
  subtext = "Have questions about our services? We're here to help."
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    code: prefillCode || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

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
    // Simulate async submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setFormData({ name: "", email: "", message: "", code: prefillCode || "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-10">
      <h2 className="text-2xl font-bold mb-2 text-center">{headline}</h2>
      <p className="text-center mb-6 text-muted-foreground">{subtext}</p>
      {!hideInfoPanel && (
        <div className="mb-6 text-center text-xs text-muted-foreground">
          {/* Add info panel content here if needed */}
          For all inquiries, we respond within 24 hours.
        </div>
      )}
      <form
        className="space-y-5 max-w-lg mx-auto bg-white dark:bg-card p-8 rounded-xl shadow-md"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          type="hidden"
          name="code"
          value={formData.code}
        />
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">Name</label>
          <input
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/60"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/60"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="message">Message</label>
          <textarea
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/60"
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full btn-premium rounded-lg py-2 font-semibold text-white bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber shadow-lg hover:from-sciscribe-amber hover:to-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/60 disabled:opacity-60"
          disabled={disabled || isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
        {isSuccess && (
          <div className="text-green-600 text-center mt-2">Thank you! We'll be in touch soon.</div>
        )}
      </form>
    </section>
  );
};

export default ContactSectionSummerOffer;
