
import { useState } from "react";
import { Mail, MapPin, Phone, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled by Netlify
    // This function remains for any client-side validation if needed
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold text-foreground">Contact Us</h2>
          <p className="mb-12 text-lg text-foreground/80">
            Have questions about our services? We're here to help.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="animate-slide-in rounded-lg bg-sciscribe-light dark:bg-card p-8">
            <h3 className="mb-6 text-2xl font-bold text-foreground">Get in Touch</h3>

            <div className="mb-8 space-y-6">
              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-sciscribe-navy/30 text-foreground">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-foreground/70">contact@sciscribesolutions.com</p>
                  <p className="text-foreground/70">support@sciscribesolutions.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-sciscribe-navy/30 text-foreground">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-foreground/70">+91 9395582679</p>
                  <a 
                    href="https://api.whatsapp.com/message/XMKZUS2MJHUBG1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-foreground/70 hover:text-sciscribe-gold transition-colors mt-1"
                  >
                    <MessageCircleMore size={16} className="mr-1" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-sciscribe-navy/30 text-foreground">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-foreground/70">Hazra Road</p>
                  <p className="text-foreground/70">Kolkata, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-in rounded-lg bg-white dark:bg-card p-8 shadow-md">
            <h3 className="mb-6 text-2xl font-bold text-foreground">Send us a Message</h3>
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              encType="multipart/form-data"
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don't fill this out if you're human: <input name="bot-field" /></label>
              </p>
              
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/20 dark:bg-sciscribe-navy/30 dark:border-sciscribe-navy/50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/20 dark:bg-sciscribe-navy/30 dark:border-sciscribe-navy/50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="file" className="mb-2 block text-sm font-medium text-foreground">
                  Upload File (Optional)
                </label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/20 dark:bg-sciscribe-navy/30 dark:border-sciscribe-navy/50"
                />
                <p className="mt-1 text-xs text-foreground/70">Upload any relevant documents (PDF, DOCX, etc.)</p>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-gray-200 p-3 focus:border-sciscribe-gold focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/20 dark:bg-sciscribe-navy/30 dark:border-sciscribe-navy/50"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-hover w-full rounded-lg bg-sciscribe-navy dark:bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-sciscribe-navy/90 dark:hover:bg-primary/90 mb-4"
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
