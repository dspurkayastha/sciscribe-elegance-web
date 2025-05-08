import { useState } from "react";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Heart, MessageSquareDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceUsed, setServiceUsed] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare honeypot value (from hidden input, if present)
    const honeypot = (document.querySelector('input[name="bot-field"]') as HTMLInputElement)?.value || "";
    const payload = {
      name,
      email,
      rating: rating ?? 0,
      feedback: feedbackText,
      service: serviceUsed,
      honeypot
    };

    try {
      const response = await fetch("https://asia-south1-sciscribe-main.cloudfunctions.net/submitFeedbackForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your time and will use your insights to improve our services.",
      });
      // Reset form
      setName("");
      setEmail("");
      setServiceUsed("");
      setRating(null);
      setFeedbackText("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later or contact us directly.",
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
        <section className="section-container">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sciscribe-purple to-sciscribe-blue bg-clip-text text-transparent">
                Share Your Experience
              </h1>
              <p className="text-lg text-foreground/80">
                Your feedback helps us improve and serve the scientific community better.
              </p>
            </motion.div>

            <motion.div 
              className="premium-glassmorphism p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <form 
                onSubmit={handleSubmit}
                className="space-y-6"
                autoComplete="off"
              >
                {/* Honeypot field for anti-spam */}
                <p style={{ display: "none" }}>
                  <label>Don't fill this out if you're human: <input name="bot-field" autoComplete="off" /></label>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-1">
                      Your Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Full name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      required 
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-1">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className="bg-white/70 dark:bg-sciscribe-navy/30"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="text-sm font-medium block mb-1">
                    Service Used
                  </label>
                  <Select value={serviceUsed} onValueChange={setServiceUsed} required>
                    <SelectTrigger id="service" name="service" className="w-full bg-white/70 dark:bg-sciscribe-navy/30">
                      <SelectValue placeholder="Select the service you used" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="insight">Insight Package</SelectItem>
                      <SelectItem value="enhance">Enhance Package</SelectItem>
                      <SelectItem value="complete">Complete Package</SelectItem>
                      <SelectItem value="plagiarism">Plagiarism Check</SelectItem>
                      <SelectItem value="journal">Journal Formatting</SelectItem>
                      <SelectItem value="statistical">Statistical Analysis</SelectItem>
                      <SelectItem value="figures">Scientific Figures</SelectItem>
                      <SelectItem value="other">Other Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-3">
                    How would you rate your experience?
                  </label>
                  <input type="hidden" name="rating" value={rating?.toString() || ""} />
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          rating && star <= rating
                            ? "bg-sciscribe-gold text-white scale-110"
                            : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="feedback" className="text-sm font-medium block mb-1">
                    Your Feedback
                  </label>
                  <Textarea 
                    id="feedback"
                    name="feedbackText"
                    placeholder="Please share your experience with our services..." 
                    value={feedbackText} 
                    onChange={(e) => setFeedbackText(e.target.value)}
                    required
                    rows={6}
                    className="bg-white/70 dark:bg-sciscribe-navy/30"
                  />
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    className="btn-premium px-10 py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <MessageSquareDashed className="mr-2 h-5 w-5" />
                        Submit Feedback
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="inline-flex items-center justify-center mb-4">
                <Heart className="text-red-500 h-6 w-6 mr-2" />
                <span className="text-lg font-medium">Thank you for helping us improve!</span>
              </div>
              <p className="text-muted-foreground">
                Your feedback is invaluable in our mission to provide the best scientific editing and support services.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;
