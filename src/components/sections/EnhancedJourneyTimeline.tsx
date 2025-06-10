import { motion } from "framer-motion";
import { Award, Calendar, TrendingUp, Zap, Star, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const timelineEvents = [
  {
    year: "2018",
    title: "Foundation",
    description: "SciScribe Solutions was founded with a mission to support researchers in communicating their findings effectively.",
    icon: <Calendar className="h-5 w-5 text-white" />,
    color: "from-sciscribe-gold to-amber-500",
    achievements: ["First 5 university partnerships", "Established core editing services"],
    position: "right"
  },
  {
    year: "2020",
    title: "Growth & Expansion",
    description: "Expanded our team and services to include specialized statistical support and clinical writing.",
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    color: "from-sciscribe-blue to-sciscribe-teal",
    achievements: ["15+ university partnerships", "Added statistical analysis services"],
    position: "left"
  },
  {
    year: "2022",
    title: "National Recognition",
    description: "Reached milestone of supporting researchers across 25+ states, with clients from over 30 universities nationwide.",
    icon: <Award className="h-5 w-5 text-white" />,
    color: "from-sciscribe-purple to-violet-500",
    achievements: ["Partnerships with 50+ scholars", "Multiple high-impact publications"],
    position: "right"
  },
  {
    year: "Today",
    title: "Innovation & Excellence",
    description: "Continuing to innovate with new service offerings and digital solutions to better serve the national scientific community.",
    icon: <Star className="h-5 w-5 text-white" />,
    color: "from-sciscribe-gold to-amber-500",
    achievements: ["Launch of AI-assisted editing", "New digital platform"],
    position: "left"
  }
];

const EnhancedJourneyTimeline = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/0 via-sciscribe-blue/5 to-white/0 dark:from-sciscribe-navy/0 dark:via-sciscribe-blue/10 dark:to-sciscribe-navy/0"></div>
      <div className="absolute top-40 -left-32 w-64 h-64 rounded-full bg-sciscribe-gold/10 blur-3xl"></div>
      <div className="absolute bottom-40 -right-32 w-64 h-64 rounded-full bg-sciscribe-blue/10 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-2 bg-sciscribe-blue/10 text-sciscribe-blue hover:bg-sciscribe-blue/20 dark:bg-sciscribe-blue/20">Our Story</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-sciscribe-blue to-sciscribe-gold bg-clip-text text-transparent drop-shadow-sm">
            Our Journey
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            From humble beginnings to becoming a trusted partner for researchers across the nation
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line - with height adjustment to not clip through Future element */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-[calc(100%-60px)] w-1 bg-gradient-to-b from-sciscribe-gold via-sciscribe-blue to-sciscribe-purple rounded-full"></div>
          
          {/* Timeline Items */}
          <div className="space-y-14">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`flex ${event.position === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content Side */}
                  <div className="w-5/12">
                    <motion.div 
                      className="premium-glassmorphism p-4 rounded-lg border border-white/20 dark:border-sciscribe-blue/20 shadow-md overflow-visible"
                      whileHover={{ 
                        scale: 1.02, 
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`bg-gradient-to-r ${event.color} p-1.5 rounded-lg mr-2`}>
                          {event.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{event.year}</h3>
                          <p className="text-xs text-muted-foreground">{event.title}</p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {event.achievements.map((achievement, i) => (
                          <TooltipProvider key={i}>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="text-xs bg-white/50 dark:bg-sciscribe-navy/50">
                                  {achievement}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="z-50">
                                <p className="text-xs">Key achievement</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline Marker */}
                  <div className="w-2/12 flex justify-center relative">
                    <motion.div 
                      className={`w-5 h-5 rounded-full bg-gradient-to-r ${event.color} absolute top-5 z-20 flex items-center justify-center`}
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: [0.8, 1.1, 1] }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </motion.div>
                  </div>

                  {/* Empty Side */}
                  <div className="w-5/12"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final element - Future */}
          <motion.div 
            className="mt-16 pt-4 relative z-20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Circle background to cover timeline line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white dark:bg-sciscribe-navy rounded-full z-10"></div>
            
            {/* Future Card */}
            <div className="max-w-sm mx-auto">
              <motion.div 
                className="premium-glassmorphism p-4 rounded-lg border border-white/20 dark:border-sciscribe-blue/20 shadow-md overflow-visible text-center"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3 text-left">
                    <h3 className="font-bold text-lg">The Future</h3>
                    <p className="text-xs text-muted-foreground">2025 & Beyond</p>
                  </div>
                </div>
                <p className="text-sm mb-3">
                  We're committed to advancing scientific communication through innovation 
                  and personalized support for researchers nationwide.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <Badge variant="outline" className="text-xs bg-white/50 dark:bg-sciscribe-navy/50">
                    AI-powered solutions
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-white/50 dark:bg-sciscribe-navy/50">
                    Expanded service offerings
                  </Badge>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedJourneyTimeline;
