
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a backend service
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold text-sciscribe-navy">Contact Us</h2>
          <p className="mb-12 text-lg text-sciscribe-navy/80">
            Have questions about our services? We're here to help.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="animate-slide-in rounded-lg bg-sciscribe-light p-8">
            <h3 className="mb-6 text-2xl font-bold text-sciscribe-navy">Get in Touch</h3>

            <div className="mb-8 space-y-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sciscribe-navy">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium text-sciscribe-navy">Email</p>
                  <p className="text-sciscribe-navy/70">support@sciscribesolutions.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sciscribe-navy">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium text-sciscribe-navy">Phone</p>
                  <p className="text-sciscribe-navy/70">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sciscribe-navy">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-sciscribe-navy">Location</p>
                  <p className="text-sciscribe-navy/70">Boston, MA 02199, United States</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-in rounded-lg bg-white p-8 shadow-md">
            <h3 className="mb-6 text-2xl font-bold text-sciscribe-navy">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-sciscribe-navy">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/20"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-sciscribe-navy">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/20"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-sciscribe-navy">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/20"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-hover w-full rounded-lg bg-sciscribe-navy px-6 py-3 font-medium text-white transition-all hover:bg-sciscribe-navy/90 mb-4"
              >
                Send Message
              </button>
              
              <div className="text-center">
                <Link to="/contact" className="text-sciscribe-gold hover:text-sciscribe-gold/80 font-medium">
                  Want a full quote? Send us more details →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
