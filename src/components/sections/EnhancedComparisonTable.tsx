import { Check, X, Target, Clock, FileText, Zap, Award, BarChart4, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const EnhancedComparisonTable = () => {
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const features = [
    {
      name: "Ideal For",
      icon: <Target className="h-5 w-5" />,
      launchpad: "Students & Early Researchers",
      trailblazer: "Thesis & Dissertation Projects",
      pinnacle: "Journal Submission & Review Prep",
      tooltip: "Target audience and use cases for each package"
    },
    {
      name: "High-Quality Visuals",
      icon: <Sparkles className="h-5 w-5" />,
      launchpad: true,
      trailblazer: true,
      pinnacle: true,
      tooltip: "Professional figures, charts, and visual elements"
    },
    {
      name: "Proofreading & Language Excellence",
      icon: <FileText className="h-5 w-5" />,
      launchpad: true,
      trailblazer: true,
      pinnacle: true,
      tooltip: "Grammar, spelling, clarity, and academic language refinement"
    },
    {
      name: "Expert Statistical Analysis",
      icon: <BarChart4 className="h-5 w-5" />,
      launchpad: false,
      trailblazer: true,
      pinnacle: true,
      tooltip: "Data validation, statistical methods review, and results interpretation"
    },
    {
      name: "Delivery Time",
      icon: <Clock className="h-5 w-5" />,
      launchpad: "1 week (guaranteed)",
      trailblazer: "3 weeks",
      pinnacle: "4–5 weeks (Fast-Track Available)",
      tooltip: "Estimated time from submission to delivery"
    },
    {
      name: "Manuscript Refinement",
      icon: <FileText className="h-5 w-5" />,
      launchpad: false,
      trailblazer: true,
      pinnacle: true,
      tooltip: "Comprehensive editing and structural improvements"
    },
    {
      name: "Journal Targeting & Compliance",
      icon: <Target className="h-5 w-5" />,
      launchpad: false,
      trailblazer: false,
      pinnacle: true,
      tooltip: "Journal selection guidance and submission requirements compliance"
    },
    {
      name: "Reviewer Response Support",
      icon: <FileText className="h-5 w-5" />,
      launchpad: false,
      trailblazer: false,
      pinnacle: true,
      tooltip: "Assistance with addressing reviewer comments and revisions"
    },
    {
      name: "Concierge Submission Service",
      icon: <Award className="h-5 w-5" />,
      launchpad: false,
      trailblazer: false,
      pinnacle: "Premium",
      tooltip: "Full-service journal submission handling by our experts"
    }
  ];

  return (
    <section className="section-container py-16 relative">
      {/* Decorative background elements */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-sciscribe-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-sciscribe-gold/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-sciscribe-blue to-sciscribe-gold bg-clip-text text-transparent drop-shadow-sm">
            Package Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Compare our packages to find the perfect fit for your academic journey
          </p>
        </motion.div>

        <motion.div 
          className="premium-glassmorphism rounded-2xl overflow-hidden border border-white/20 dark:border-sciscribe-blue/20 shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-sciscribe-blue/20 to-sciscribe-gold/20 dark:from-sciscribe-blue/30 dark:to-sciscribe-gold/30">
                  <TableHead className="py-5 px-6 text-left font-semibold text-foreground/90">
                    <span className="text-lg">Feature / Service</span>
                  </TableHead>
                  <TableHead className="py-5 px-6 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span className="text-lg bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber bg-clip-text text-transparent">Research Launchpad</span>
                      <span className="text-base font-normal text-foreground/70">₹7,500 ($90)</span>
                    </div>
                  </TableHead>
                  <TableHead className="py-5 px-6 text-center font-semibold relative">
                    <div className="absolute -top-0 left-0 right-0 flex justify-center z-100">
                      <Badge className="bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal text-white text-xs py-1 px-3 shadow-md">MOST POPULAR</Badge>
                    </div>
                    <div className="flex flex-col items-center mt-1">
                      <span className="text-lg bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">Thesis Trailblazer</span>
                      <span className="text-base font-normal text-foreground/70">₹15,000 ($180)</span>
                    </div>
                  </TableHead>
                  <TableHead className="py-5 px-6 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <span className="text-lg bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber bg-clip-text text-transparent">Publication Pinnacle</span>
                      <span className="text-base font-normal text-foreground/70">₹22,000 ($260)</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature, index) => (
                  <motion.tr 
                    key={index}
                    className={index % 2 === 0 ? "bg-white/50 dark:bg-sciscribe-navy/20" : "bg-white/30 dark:bg-sciscribe-navy/10"}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <TableCell className="py-4 px-6 font-medium">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20">
                                {feature.icon}
                              </div>
                              <span>{feature.name}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="text-sm max-w-xs">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      {typeof feature.launchpad === 'boolean' ? (
                        feature.launchpad ? (
                          <div className="flex justify-center">
                            <div className="p-1 rounded-full bg-sciscribe-gold/10 dark:bg-sciscribe-gold/20">
                              <Check className="h-5 w-5 text-sciscribe-gold" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/20">
                              <X className="h-5 w-5 text-red-400 dark:text-red-500" />
                            </div>
                          </div>
                        )
                      ) : (
                        <span className="text-sm">{feature.launchpad}</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      {typeof feature.trailblazer === 'boolean' ? (
                        feature.trailblazer ? (
                          <div className="flex justify-center">
                            <div className="p-1 rounded-full bg-sciscribe-blue/10 dark:bg-sciscribe-blue/20">
                              <Check className="h-5 w-5 text-sciscribe-blue" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/20">
                              <X className="h-5 w-5 text-red-400 dark:text-red-500" />
                            </div>
                          </div>
                        )
                      ) : (
                        <span className="text-sm">{feature.trailblazer}</span>
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      {typeof feature.pinnacle === 'boolean' ? (
                        feature.pinnacle ? (
                          <div className="flex justify-center">
                            <div className="p-1 rounded-full bg-sciscribe-gold/10 dark:bg-sciscribe-gold/20">
                              <Check className="h-5 w-5 text-sciscribe-gold" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="p-1 rounded-full bg-red-100 dark:bg-red-900/20">
                              <X className="h-5 w-5 text-red-400 dark:text-red-500" />
                            </div>
                          </div>
                        )
                      ) : feature.pinnacle === "Premium" ? (
                        <div className="flex justify-center">
                          <Badge className="bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber text-white">
                            <Sparkles className="h-3 w-3 mr-1" /> Premium
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-sm">{feature.pinnacle}</span>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedComparisonTable;
