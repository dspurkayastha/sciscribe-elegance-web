
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would normally send this data to your backend
      console.log("Contact form submitted:", { name, email, subject, message });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
      });

      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      // Redirect to thank you page
      navigate("/thank-you", { 
        state: { 
          source: "contact",
          name
        } 
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="dark:bg-sciscribe-navy/5 pt-24">
        {/* Hero Section */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 dark:text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Have questions or ready to elevate your research? Reach out to our team.
            </motion.p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="section-container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20 flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@sciscribesolutions.com</p>
                    <p className="text-muted-foreground">support@sciscribesolutions.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20 flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-muted-foreground">Monday to Friday, 9am to 6pm IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20 flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">123 Science Park</p>
                    <p className="text-muted-foreground">Research Avenue, Tech City</p>
                    <p className="text-muted-foreground">Bengaluru, Karnataka 560001</p>
                  </div>
                </div>
              </div>

              {/* Decorative Map/Image */}
              <div className="mt-12 rounded-lg overflow-hidden h-[200px] bg-gradient-to-br from-sciscribe-mist/70 to-sciscribe-sky/30 dark:from-sciscribe-navy/70 dark:to-sciscribe-blue/20 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-sciscribe-blue opacity-60" />
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="premium-glassmorphism p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium block mb-1">
                    Full Name
                  </label>
                  <Input 
                    id="name"
                    placeholder="Your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-1">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="text-sm font-medium block mb-1">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    placeholder="What's this about?" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us about your project..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-premium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white/50 dark:bg-sciscribe-navy/20 py-16 mt-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">How quickly will you respond to my inquiry?</h3>
                <p className="text-muted-foreground">We aim to respond to all inquiries within 24 hours during business days.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">Can I schedule a consultation call?</h3>
                <p className="text-muted-foreground">Absolutely! Please indicate your interest in a call in your message, and we'll arrange a convenient time to discuss your project.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">Do you work with international clients?</h3>
                <p className="text-muted-foreground">Yes, we work with researchers and institutions worldwide and can accommodate different time zones for communication.</p>
              </div>
              
              <div className="premium-card">
                <h3 className="text-lg font-semibold mb-2">Are there any disciplines you don't cover?</h3>
                <p className="text-muted-foreground">We cover most academic disciplines but specialize in STEM fields, medicine, and social sciences. Contact us about your specific area of research.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
