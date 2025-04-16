
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    addOns: {
      plagiarism: false,
      statistical: false,
      figures: false,
      journal: false,
      cover: false,
      fastTrack: false
    },
    deadline: "",
    contactMethod: "email",
    source: "",
    message: "",
    gdprConsent1: false,
    gdprConsent2: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      addOns: {
        ...prev.addOns,
        [name]: !prev.addOns[name as keyof typeof prev.addOns]
      }
    }));
  };

  const handleContactMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, contactMethod: value }));
  };

  const handleGdprChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would normally send this data to your backend
      console.log("Contact form submitted:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
      });

      // Redirect to thank you page
      navigate("/thank-you", { 
        state: { 
          source: "contact",
          name: `${formData.firstName} ${formData.lastName}`
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
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1"
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
              className="premium-glassmorphism p-8 rounded-xl md:col-span-2"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name - Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="text-sm font-medium block mb-1">
                      First Name*
                    </label>
                    <Input 
                      id="firstName"
                      name="firstName"
                      placeholder="First name" 
                      value={formData.firstName} 
                      onChange={handleChange}
                      required 
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                    />
                    <p className="text-xs text-muted-foreground mt-1">First</p>
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="text-sm font-medium block mb-1">
                      Last Name*
                    </label>
                    <Input 
                      id="lastName"
                      name="lastName"
                      placeholder="Last name" 
                      value={formData.lastName} 
                      onChange={handleChange}
                      required 
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Last</p>
                  </div>
                </div>
                
                {/* Email & Phone */}
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-1">
                    Email Address*
                  </label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={formData.email} 
                    onChange={handleChange}
                    required 
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="text-sm font-medium block mb-1">
                    Phone Number*
                  </label>
                  <Input 
                    id="phone"
                    name="phone"
                    placeholder="+91 98765 43210" 
                    value={formData.phone} 
                    onChange={handleChange}
                    required
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="text-sm font-medium block mb-1">
                    What service are you interested in?*
                  </label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) => handleSelectChange("service", value)}
                  >
                    <SelectTrigger 
                      id="service" 
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                    >
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="insight">Insight Package</SelectItem>
                      <SelectItem value="enhance">Enhance Package</SelectItem>
                      <SelectItem value="complete">Complete Package</SelectItem>
                      <SelectItem value="custom">Custom Requirements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Add-on Services */}
                <div>
                  <p className="text-sm font-medium mb-2">Add-on Services</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="plagiarism" 
                        checked={formData.addOns.plagiarism}
                        onCheckedChange={() => handleCheckboxChange("plagiarism")}
                      />
                      <label htmlFor="plagiarism" className="text-sm">Plagiarism Check & Reduction</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="statistical" 
                        checked={formData.addOns.statistical}
                        onCheckedChange={() => handleCheckboxChange("statistical")}
                      />
                      <label htmlFor="statistical" className="text-sm">Statistical Analysis</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="figures" 
                        checked={formData.addOns.figures}
                        onCheckedChange={() => handleCheckboxChange("figures")}
                      />
                      <label htmlFor="figures" className="text-sm">Scientific Figures & Diagrams</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="journal" 
                        checked={formData.addOns.journal}
                        onCheckedChange={() => handleCheckboxChange("journal")}
                      />
                      <label htmlFor="journal" className="text-sm">Journal Formatting</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="cover" 
                        checked={formData.addOns.cover}
                        onCheckedChange={() => handleCheckboxChange("cover")}
                      />
                      <label htmlFor="cover" className="text-sm">Cover Letter & Abstract Editing</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="fastTrack" 
                        checked={formData.addOns.fastTrack}
                        onCheckedChange={() => handleCheckboxChange("fastTrack")}
                      />
                      <label htmlFor="fastTrack" className="text-sm">Fast-Track Delivery (48-72 hr)</label>
                    </div>
                  </div>
                </div>
                
                {/* Deadline */}
                <div>
                  <label htmlFor="deadline" className="text-sm font-medium block mb-1">
                    Deadline
                  </label>
                  <Input 
                    id="deadline"
                    name="deadline"
                    type="date" 
                    value={formData.deadline} 
                    onChange={handleChange}
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                  <p className="text-xs text-muted-foreground mt-1">What is the tentative deadline (in days)?</p>
                </div>
                
                {/* Contact Method */}
                <div>
                  <p className="text-sm font-medium mb-2">How would you like us to contact you?</p>
                  <RadioGroup 
                    value={formData.contactMethod}
                    onValueChange={handleContactMethodChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="contact-email" />
                      <Label htmlFor="contact-email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="contact-phone" />
                      <Label htmlFor="contact-phone">Phone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="contact-whatsapp" />
                      <Label htmlFor="contact-whatsapp">WhatsApp</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* How did you hear about us */}
                <div>
                  <label htmlFor="source" className="text-sm font-medium block mb-1">
                    How did you hear about us?
                  </label>
                  <Select 
                    value={formData.source} 
                    onValueChange={(value) => handleSelectChange("source", value)}
                  >
                    <SelectTrigger 
                      id="source" 
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="journal">Journal Advertisement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1">
                    Message / Project Details*
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..." 
                    value={formData.message} 
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                {/* GDPR Agreement */}
                <div>
                  <p className="text-sm font-medium mb-2">GDPR Agreement*</p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="gdprConsent1" 
                        checked={formData.gdprConsent1}
                        onCheckedChange={(checked) => 
                          handleGdprChange("gdprConsent1", checked as boolean)
                        }
                        className="mt-1"
                        required
                      />
                      <label htmlFor="gdprConsent1" className="text-sm text-muted-foreground">
                        I consent to having this website store my submitted information so they can respond to my inquiry.
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="gdprConsent2" 
                        checked={formData.gdprConsent2}
                        onCheckedChange={(checked) => 
                          handleGdprChange("gdprConsent2", checked as boolean)
                        }
                        className="mt-1"
                      />
                      <label htmlFor="gdprConsent2" className="text-sm text-muted-foreground">
                        I consent to SciScribe Solutions storing and using my information for communication purposes.
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="btn-premium w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Request Free Quote"}
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
