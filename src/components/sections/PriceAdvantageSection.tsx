import { Check, X, Minus, ShieldCheck, Zap, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PriceAdvantageSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="section-container py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sciscribe-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sciscribe-gold/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingDown className="text-sciscribe-gold h-7 w-7" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sciscribe-blue to-sciscribe-gold bg-clip-text text-transparent drop-shadow-sm">
              Unmatched Value. Guaranteed.
            </h2>
            <ShieldCheck className="text-sciscribe-blue h-7 w-7" />
          </div>
          
          <motion.p 
            className="mb-10 text-center text-lg text-sciscribe-navy/90 dark:text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We offer top-tier academic editing, stats, figures, and journal support at{" "}
            <span className="font-semibold text-sciscribe-gold">transparent, affordable rates</span>
            —typically 30–60% lower than major providers.
          </motion.p>
        </motion.div>

        <motion.div
          className="premium-glassmorphism rounded-xl shadow-xl border border-white/20 dark:border-sciscribe-blue/20 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-sciscribe-blue/20 to-sciscribe-gold/10 dark:from-sciscribe-blue/30 dark:to-sciscribe-gold/20">
                <TableHead className="py-5 px-6 text-left font-semibold text-sciscribe-blue text-lg w-1/3">Service</TableHead>
                <TableHead className="py-5 px-6 text-center font-semibold text-lg w-1/3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">SciScribe</span>
                    <Badge variant="outline" className="bg-sciscribe-blue/10 text-sciscribe-blue border-sciscribe-blue/20 ml-2">Best Value</Badge>
                  </div>
                </TableHead>
                <TableHead className="py-5 px-6 text-center font-semibold text-lg w-1/3">Market Range*</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <motion.tr variants={itemVariants} className="hover:bg-sciscribe-blue/5 dark:hover:bg-sciscribe-blue/10 transition">
                <TableCell className="font-medium px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="font-semibold">Masters Thesis (~10k words)</span>
                    <span className="text-sm text-muted-foreground">Complete language & structural editing, Basic Statistics included, 3 weeks delivery</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl text-green-600 dark:text-green-500">₹17,500</span>
                    <span className="text-xs text-green-600/70 dark:text-green-500/70 mt-1">Save up to 67%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <span className="line-through text-red-500 dark:text-red-400">₹26,000–₹45,000</span>
                </TableCell>
              </motion.tr>
              
              <motion.tr variants={itemVariants} className="hover:bg-sciscribe-blue/5 dark:hover:bg-sciscribe-blue/10 transition">
                <TableCell className="font-medium px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="font-semibold">Full Article (Q1/Q2 Journals, with plots & Basic Statistics included)</span>
                    <span className="text-sm text-muted-foreground">Publication-ready with data visualization</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl text-green-600 dark:text-green-500">₹20,000–₹22,000</span>
                    <span className="text-xs text-green-600/70 dark:text-green-500/70 mt-1">Save up to 55%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <span className="line-through text-red-500 dark:text-red-400">₹45,000–₹65,000</span>
                </TableCell>
              </motion.tr>
              
              <motion.tr variants={itemVariants} className="hover:bg-sciscribe-blue/5 dark:hover:bg-sciscribe-blue/10 transition">
                <TableCell className="font-medium px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="font-semibold">Advanced Statistics Add-on</span>
                    <span className="text-sm text-muted-foreground">Expert statistical analysis & interpretation</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-xl text-green-600 dark:text-green-500">From ₹7,500</span>
                          <span className="text-xs text-sciscribe-blue mt-1 flex items-center">
                            <Zap className="h-3 w-3 mr-1" /> Exclusive Service
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm max-w-xs">Our PhD statisticians provide comprehensive analysis that most competitors don't offer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <span className="text-yellow-600 dark:text-yellow-500 font-medium">Usually not offered</span>
                </TableCell>
              </motion.tr>
              
              <motion.tr variants={itemVariants} className="hover:bg-sciscribe-blue/5 dark:hover:bg-sciscribe-blue/10 transition">
                <TableCell className="font-medium px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="font-semibold">Turnaround Time</span>
                    <span className="text-sm text-muted-foreground">From submission to delivery</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl text-green-600 dark:text-green-500">15-21 Days</span>
                    <span className="text-xs text-sciscribe-blue/90 mt-1">Optional 7-Day Express*</span>
                  </div>
                </TableCell>
                <TableCell className="text-center px-6 py-5 border-b border-sciscribe-mist/30 dark:border-white/10">
                  <span className="text-yellow-600 dark:text-yellow-500 font-medium">1–3 Months</span>
                </TableCell>
              </motion.tr>
            </TableBody>
          </Table>
        </motion.div>

        <motion.p 
          className="text-sm text-center text-muted-foreground mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          *Prices and timelines based on competitor websites accessed in January 2025
        </motion.p>
      </div>
    </section>
  );
};

export default PriceAdvantageSection;
