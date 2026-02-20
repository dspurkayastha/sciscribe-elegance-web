
import { useLocation, Link } from "react-router-dom";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const ThankYou = () => {
  const location = useLocation();
  const { source, name } = location.state || {};

  const getMessage = () => {
    switch (source) {
      case "contact":
        return `Thank you${name ? `, ${name}` : ""}, for reaching out to us! We've received your message and will get back to you shortly.`;
      case "feedback":
        return `Thank you${name ? `, ${name}` : ""}, for your valuable feedback! We appreciate you taking the time to help us improve.`;
      default:
        return "Thank you for your submission!";
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto px-6"
        >
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-sciscribe-purple to-sciscribe-blue bg-clip-text text-transparent">
            Success!
          </h1>
          
          <p className="text-lg mb-8 text-foreground/80">
            {getMessage()}
          </p>

          <div className="space-x-4">
            <Button asChild className="btn-premium">
              <Link to="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us Again</Link>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
