"use client";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircleMore } from "lucide-react";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app as firebaseApp } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
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
import { Form } from "@/components/ui/form";
import { storage } from "@/lib/firebase";

const ContactContent = () => {
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
    documentType: "",
    subjectArea: "",
    wordCount: "",
    deadline: "",
    contactMethod: "email",
    source: "",
    message: "",
    gdprConsent1: false,
    gdprConsent2: false
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Dynamic add-on services config
  const addOnOptions = [
    { key: "plagiarism", label: "Plagiarism Check & Reduction" },
    { key: "statistical", label: "Statistical Analysis" },
    { key: "figures", label: "Scientific Figures & Diagrams" },
    { key: "journal", label: "Journal Formatting" },
    { key: "cover", label: "Cover Letter & Abstract Editing" },
    { key: "fastTrack", label: "Fast-Track Delivery (48-72 hr)" }
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { logFormSubmitted } = useAnalytics(); // Added useAnalytics hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
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

    // File size validation (20MB per file)
    for (const file of selectedFiles) {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `Each file must be 20MB or less. '${file.name}' is too large.`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Upload files to Firebase Storage and collect URLs
    let fileUrls: string[] = [];
    if (selectedFiles.length > 0) {
      try {
        const uploadPromises = selectedFiles.map(async (file) => {
          const uniqueName = `contact_uploads/${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${file.name}`;
          const storageRef = ref(storage, uniqueName);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        });
        fileUrls = await Promise.all(uploadPromises);
      } catch (err) {
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your files. Please try again.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
    }

    // Prepare honeypot value (from hidden input, if present)
    const honeypot = (document.querySelector('input[name="bot-field"]') as HTMLInputElement)?.value || "";

    // Prepare payload for Firebase
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      message: formData.message,
      fileUrls, // Now contains real uploaded file URLs
      honeypot,
      phone: formData.phone,
      service: formData.service,
      addOns: formData.addOns,
      documentType: formData.documentType,
      subjectArea: formData.subjectArea,
      wordCount: Number(formData.wordCount),
      deadline: formData.deadline,
      contactMethod: formData.contactMethod,
      source: formData.source,
      gdprConsent1: formData.gdprConsent1,
      gdprConsent2: formData.gdprConsent2
    };

    try {
      const response = await fetch("https://asia-south1-sciscribe-main.cloudfunctions.net/submitContactFormV2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
        variant: "default",
      });

      // Track form submission with analytics
      logFormSubmitted({
        form_id: 'contact_page_form',
        form_name: 'Contact Page Form',
        success: true
      });

      router.push(`/thank-you?source=contact&name=${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}`);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });

      // Track form submission error with analytics
      logFormSubmitted({
        form_id: 'contact_page_form',
        form_name: 'Contact Page Form',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="dark:bg-sciscribe-navy/5 pt-24">
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

        <section className="section-container">
          <div className="grid md:grid-cols-3 gap-12">
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
                    <p className="text-muted-foreground">contact@sciscribesolutions.com</p>
                    <p className="text-muted-foreground">support@sciscribesolutions.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20 flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 9395582679</p>
                    <a
                      href="https://api.whatsapp.com/message/XMKZUS2MJHUBG1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-sciscribe-blue transition-colors mt-1"
                    >
                      <MessageCircleMore size={16} className="mr-1" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20 flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6 text-sciscribe-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">Hazra Road</p>
                    <p className="text-muted-foreground">Kolkata, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-lg overflow-hidden h-[200px] bg-gradient-to-br from-sciscribe-mist/70 to-sciscribe-sky/30 dark:from-sciscribe-navy/70 dark:to-sciscribe-blue/20 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-sciscribe-blue opacity-60" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="premium-glassmorphism p-8 rounded-xl md:col-span-2"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                autoComplete="off"
              >
                {/* Honeypot field for anti-spam */}
                <p style={{ display: "none" }}>
                  <label>Don't fill this out if you're human: <input name="bot-field" autoComplete="off" /></label>
                </p>

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

                <div>
                  <p className="text-sm font-medium mb-2">Document Details</p>
                  <div>
                    <label htmlFor="documentType" className="text-sm font-medium block mb-1">
                      Document Type*
                    </label>
                    <Select
                      value={formData.documentType}
                      onValueChange={(value) => handleSelectChange("documentType", value)}
                    >
                      <SelectTrigger
                        id="documentType"
                        className="bg-white/70 dark:bg-sciscribe-navy/30"
                      >
                        <SelectValue placeholder="Choose document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manuscript">Manuscript</SelectItem>
                        <SelectItem value="thesis">Thesis</SelectItem>
                        <SelectItem value="researchPaper">Research Paper</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="subjectArea" className="text-sm font-medium block mb-1">
                      Subject Area / Field
                    </label>
                    <Input
                      id="subjectArea"
                      name="subjectArea"
                      placeholder="e.g., Neuroscience"
                      value={formData.subjectArea}
                      onChange={handleChange}
                      required
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="wordCount" className="text-sm font-medium block mb-1">
                      Word Count
                    </label>
                    <Input
                      id="wordCount"
                      name="wordCount"
                      type="number"
                      placeholder="e.g., 8500"
                      value={formData.wordCount}
                      onChange={handleChange}
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                      min={0}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Add-on Services</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {addOnOptions.map((opt) => (
                      <div className="flex items-center space-x-2" key={opt.key}>
                        <Checkbox
                          id={opt.key}
                          name={`addon-${opt.key}`}
                          checked={formData.addOns[opt.key as keyof typeof formData.addOns]}
                          onCheckedChange={() => handleCheckboxChange(opt.key)}
                        />
                        <label htmlFor={opt.key} className="text-sm">{opt.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="fileUpload" className="text-sm font-medium block mb-1">
                    Upload a File (Optional)
                  </label>
                  <Input
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: DOC, PDF, XLS, TXT, JPG, etc. You can upload multiple files.
                  </p>
                  {selectedFiles.length > 0 && (
                    <ul className="text-xs mt-1 list-disc ml-4">
                      {selectedFiles.map((file, idx) => (
                        <li key={idx}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>

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
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Please select a future date for your deadline.</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">How would you like us to contact you?</p>
                  <RadioGroup
                    value={formData.contactMethod}
                    onValueChange={handleContactMethodChange}
                    className="flex flex-col space-y-1"
                    name="contactMethod"
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

                <div>
                  <p className="text-sm font-medium mb-2">Message*</p>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">GDPR Agreement*</p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="gdprConsent"
                        name="gdprConsent"
                        checked={formData.gdprConsent1}
                        onCheckedChange={(checked) =>
                          handleGdprChange("gdprConsent1", checked as boolean)
                        }
                        className="mt-1"
                        required
                      />
                      <label htmlFor="gdprConsent" className="text-sm text-muted-foreground">
                        I consent to SciScribe Solutions storing and using my information for communication purposes. <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline ml-1">Privacy Policy</a>
                      </label>
                      <span title="Required for us to respond to your inquiry and provide a quote." className="ml-1 cursor-help">🛈</span>
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

export default ContactContent;
