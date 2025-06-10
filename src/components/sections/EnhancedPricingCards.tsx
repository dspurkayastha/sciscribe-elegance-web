import { Check, Star, Sparkles, Zap, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect } from "react";

const EnhancedPricingCards = () => {
  // Add custom animation via useEffect to avoid JSX style tag issues
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes pulse-slow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.9; transform: scale(1.05); }
      }
      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="section-container py-16 relative">
      {/* Decorative background elements */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-sciscribe-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-sciscribe-gold/5 rounded-full blur-3xl"></div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Research Launchpad Package */}
        <motion.div 
          className="premium-glassmorphism hover:border-sciscribe-gold/50 hover:scale-[1.02] hover:shadow-xl transition-all duration-500 flex flex-col rounded-2xl shadow-lg border border-sciscribe-gold/20 dark:border-white/20 overflow-hidden"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-sciscribe-blue/20 to-sciscribe-gold/10 dark:from-sciscribe-blue/20 dark:to-sciscribe-gold/10 p-6 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20 rounded-full">
                <TrendingUp className="h-6 w-6 text-sciscribe-blue" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">Research Launchpad</h3>
            </div>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold">₹7,500</span>
              <span className="text-lg text-muted-foreground ml-2 mb-1">($90)</span>
            </div>
            <p className="text-sm text-muted-foreground">Ideal for students and early career researchers</p>
          </div>
          
          <div className="p-6 flex-grow flex flex-col">
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Scientific Poster Design</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Conference Paper Drafting</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Visual Polish & Structure Optimization</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Abstract Editing Support</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <div className="flex items-center">
                  <span>1 week delivery</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Zap className="h-4 w-4 text-sciscribe-amber ml-2" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm max-w-xs">Express delivery available</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
            </ul>
            <div className="mt-auto">
              <Link to="/payment" className="w-full">
                <Button className="w-full bg-gradient-to-r from-sciscribe-gold/90 to-sciscribe-amber/90 hover:from-sciscribe-gold hover:to-sciscribe-amber text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Choose Plan
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Thesis Trailblazer Package */}
        <motion.div 
          className="premium-glassmorphism border-2 border-sciscribe-blue/40 dark:border-sciscribe-blue/50 relative flex flex-col rounded-2xl shadow-xl scale-105 hover:scale-[1.07] hover:shadow-2xl transition-all duration-500 z-10 overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute top-0 left-0 right-0 -mt-4 flex justify-center z-20">
            {/* Glow & Particle Effect Background */}
            <span className="relative inline-block">
              {/* Particle Glow Background */}
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
                {/* Blue Glow */}
                <span className="absolute w-[150%] h-[250%] rounded-full bg-gradient-to-br from-sciscribe-blue/40 to-sciscribe-teal/30 blur-2xl opacity-80 animate-pulse" style={{ top: '-75%', left: '-25%' }} />
                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute rounded-full bg-sciscribe-blue/70 opacity-80 blur-md animate-particle"
                    style={{
                      width: `${10 + Math.random() * 10}px`,
                      height: `${10 + Math.random() * 10}px`,
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.25}s`,
                      animationDuration: `${1.5 + Math.random()}s`,
                    }}
                  />
                ))}
              </span>
              <span className="bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal text-amber text-xs font-bold uppercase py-2 px-6 rounded-full shadow-xl ring-2 ring-sciscribe-blue/60 backdrop-blur-sm drop-shadow-lg relative animate-pulse-slow">
                <span className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  Most Popular
                </span>
              </span>
            </span>
          </div>
          
          <div className="bg-gradient-to-r from-sciscribe-blue/30 to-sciscribe-teal/20 dark:from-sciscribe-blue/40 dark:to-sciscribe-teal/30 p-6 pb-8">
            <div className="flex items-center gap-3 mb-4 mt-6">
              <div className="p-2 bg-sciscribe-blue/20 dark:bg-sciscribe-blue/30 rounded-full">
                <Star className="h-6 w-6 text-sciscribe-blue" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">Thesis Trailblazer</h3>
            </div>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold">₹15,000</span>
              <span className="text-lg text-muted-foreground ml-2 mb-1">($180)</span>
            </div>
            <p className="text-sm text-muted-foreground">End to end thesis support, tailored for academic excellence</p>
          </div>
          
          <div className="p-6 flex-grow flex flex-col">
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-blue/10">
                  <Check className="h-4 w-4 text-sciscribe-blue" />
                </div>
                <span>Structured Thesis writing</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-blue/10">
                  <Check className="h-4 w-4 text-sciscribe-blue" />
                </div>
                <span>Expert Statistical Analysis</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-blue/10">
                  <Check className="h-4 w-4 text-sciscribe-blue" />
                </div>
                <span>High quality Visuals</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-blue/10">
                  <Check className="h-4 w-4 text-sciscribe-blue" />
                </div>
                <span>Language & Proofreading excellence</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-blue/10">
                  <Check className="h-4 w-4 text-sciscribe-blue" />
                </div>
                <span>Personalized guidance</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-blue/10">
                  <Check className="h-4 w-4 text-sciscribe-blue" />
                </div>
                <span>3 weeks delivery</span>
              </li>
            </ul>
            <div className="mt-auto">
              <Link to="/payment" className="w-full">
                <Button className="w-full bg-gradient-to-r from-sciscribe-blue/90 to-sciscribe-teal/90 hover:from-sciscribe-blue hover:to-sciscribe-teal text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Choose Plan
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Publication Pinnacle Package */}
        <motion.div 
          className="premium-glassmorphism hover:border-sciscribe-gold/50 hover:scale-[1.02] hover:shadow-xl transition-all duration-500 flex flex-col rounded-2xl shadow-lg border border-sciscribe-gold/20 dark:border-white/20 overflow-hidden"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-sciscribe-gold/20 to-sciscribe-amber/10 dark:from-sciscribe-gold/20 dark:to-sciscribe-amber/10 p-6 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-sciscribe-gold/10 dark:bg-sciscribe-gold/20 rounded-full">
                <Award className="h-6 w-6 text-sciscribe-gold" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber bg-clip-text text-transparent">Publication Pinnacle</h3>
            </div>
            <div className="flex items-end mb-4">
              <span className="text-4xl font-bold">₹22,000</span>
              <span className="text-lg text-muted-foreground ml-2 mb-1">($260)</span>
            </div>
            <p className="text-sm text-muted-foreground">Your final push towards peer-reviewed success</p>
          </div>
          
          <div className="p-6 flex-grow flex flex-col">
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Expert Manuscript Refinement</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Precision Figure and Table Design</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Strategic Journal Targeting</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Ethical and technical compliance review</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <span>Reviewer response support</span>
              </li>
              <li className="flex items-start">
                <div className="mt-0.5 mr-3 p-1 rounded-full bg-sciscribe-gold/10">
                  <Check className="h-4 w-4 text-sciscribe-gold" />
                </div>
                <div className="flex items-center">
                  <span>Submission concierge service</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge className="ml-2 bg-sciscribe-gold/20 text-sciscribe-gold hover:bg-sciscribe-gold/30 text-[10px]">PREMIUM</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm max-w-xs">Full-service journal submission handling</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
            </ul>
            <div className="mt-auto">
              <Link to="/payment" className="w-full">
                <Button className="w-full bg-gradient-to-r from-sciscribe-gold/90 to-sciscribe-amber/90 hover:from-sciscribe-gold hover:to-sciscribe-amber text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Choose Plan
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedPricingCards;
