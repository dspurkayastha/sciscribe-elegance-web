
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ExternalLink, BookOpen, Award, Users, FileText } from "lucide-react";
import PortfolioSection from "@/components/sections/PortfolioSection";
import LightningSeparator from "@/components/ui/lightningseparator";
import RouterAwareSeo from "@/components/ui/RouterAwareSeo";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";

const Portfolio = () => {
  const { logPageView } = useAnalytics();
  
  // Track page view when component mounts
  useEffect(() => {
    logPageView('/portfolio');
  }, [logPageView]);
  const projects = [
    {
      id: 1,
      title: "COVID-19 Vaccine Efficacy Meta-Analysis",
      category: "medical",
      description: "Comprehensive editing and statistical analysis support for a meta-analysis examining the efficacy of various COVID-19 vaccines across different populations.",
      outcome: "Published in World Journal of Infectious Diseases with 150+ citations in the first year.",
      services: ["Statistical Analysis", "Manuscript Editing", "Figure Creation", "Journal Formatting"],
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/pC19.webp",
      tags: ["Medical", "Meta-Analysis", "Epidemiology"]
    },
    {
      id: 2,
      title: "Quantum Computing Algorithm Optimization",
      category: "engineering",
      description: "Structural editing and technical clarity enhancement for a groundbreaking paper on quantum algorithm optimization for error correction.",
      outcome: "Featured as a cover article in Quantum Information Processing.",
      services: ["Technical Editing", "Visual Abstract Creation", "Response to Reviewers"],
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/pqc.webp",
      tags: ["Physics", "Quantum Computing", "Algorithm"]
    },
    {
      id: 3,
      title: "Impact of Sustainable Agriculture Practices on Climate Change",
      category: "environmental",
      description: "Comprehensive thesis editing and data visualization support for a doctoral dissertation examining sustainable farming methods in the face of climate change.",
      outcome: "Recipient of university's Outstanding Dissertation Award and later adapted into a book.",
      services: ["Thesis Editing", "Data Visualization", "Chapter Structuring"],
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/pclimch.webp",
      tags: ["Environmental Science", "Agriculture", "Climate Change"]
    },
    {
      id: 4,
      title: "Novel Biomarkers for Early Alzheimer's Detection",
      category: "medical",
      description: "Language editing, statistical analysis, and journal submission support for research identifying new biomarkers for early-stage Alzheimer's disease.",
      outcome: "Published in Neurology and led to a follow-up research grant.",
      services: ["Statistical Analysis", "Language Polishing", "Cover Letter Writing"],
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/paz.webp",
      tags: ["Neurology", "Biomarkers", "Clinical Research"]
    },
    {
      id: 5,
      title: "Machine Learning in Financial Risk Assessment",
      category: "data-science",
      description: "Technical editing and visualization support for a complex paper on applying novel machine learning algorithms to financial risk modeling.",
      outcome: "Published in Journal of Financial Economics.",
      services: ["Technical Editing", "Figure Design", "Abstract Refinement"],
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/pML.webp",
      tags: ["Finance", "Machine Learning", "Risk Assessment"]
    },
    {
      id: 6,
      title: "Antibiotic Resistance in Urban Water Systems",
      category: "environmental",
      description: "Comprehensive editing and research design consultation for a multi-city study of antibiotic resistant bacteria in urban water infrastructure.",
      outcome: "Published in Environmental Science & Technology and cited in policy recommendations.",
      services: ["Manuscript Restructuring", "Statistical Validation", "Journal Formatting"],
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/p1.webp",
      tags: ["Environmental Health", "Microbiology", "Public Health"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "medical", label: "Medical Research" },
    { value: "engineering", label: "Engineering" },
    { value: "environmental", label: "Environmental" },
    { value: "data-science", label: "Data Science" }
  ];

  // Create structured data for portfolio projects
  const createPortfolioStructuredData = () => {
    const itemListElements = projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "image": project.image,
        "keywords": project.tags.join(", "),
        "genre": project.category
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": itemListElements,
      "numberOfItems": projects.length,
      "name": "SciScribe Solutions Portfolio"
    };
  };

  return (
    <div className="flex min-h-screen flex-col">
      <RouterAwareSeo
        title="Portfolio | SciScribe Solutions"
        description="Explore our portfolio of successful scientific editing, manuscript preparation, and research support projects across various disciplines."
        trackPageView={false} // We're manually tracking the page view above
        schema={createPortfolioStructuredData()}
      />
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
              Our Portfolio
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 dark:text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Explore our successful collaborations with researchers across disciplines
            </motion.p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-sciscribe-mist/50 dark:border-white/10 bg-white dark:bg-sciscribe-navy/30 text-foreground focus:outline-none focus:ring-2 focus:ring-sciscribe-gold/30"
                />
              </div>
              
              <div className="w-full md:w-auto">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full md:w-auto overflow-auto max-w-screen-md flex justify-start md:justify-center bg-white/80 dark:bg-sciscribe-navy/50 p-1">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category.value} 
                        value={category.value}
                        className="whitespace-nowrap text-xs md:text-sm"
                      >
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Extended Portfolio Projects */}
        <section className="section-container pt-0">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="all">
              <TabsContent value="all" className="mt-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </motion.div>
              </TabsContent>
              
              {categories.slice(1).map((category) => (
                <TabsContent key={category.value} value={category.value} className="mt-0">
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {projects
                      .filter(project => project.category === category.value)
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
        {/* Original Portfolio Section from Homepage */}
        <PortfolioSection />
        
        {/* Stats Section */}
        <section className="py-16 bg-white/50 dark:bg-sciscribe-navy/30">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-4xl font-bold text-sciscribe-gold mb-2">500+</p>
                  <p className="text-sm text-sciscribe-navy/80 dark:text-white/70">Projects Completed</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-4xl font-bold text-sciscribe-gold mb-2">95%</p>
                  <p className="text-sm text-sciscribe-navy/80 dark:text-white/70">Publication Success Rate</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-4xl font-bold text-sciscribe-gold mb-2">25+</p>
                  <p className="text-sm text-sciscribe-navy/80 dark:text-white/70">States Served</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-4xl font-bold text-sciscribe-gold mb-2">12k+</p>
                  <p className="text-sm text-sciscribe-navy/80 dark:text-white/70">Citations Generated</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <LightningSeparator />
        {/* Testimonials */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">
              The impact of our work in researchers' own words
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div 
              className="premium-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4 italic text-sciscribe-navy/80 dark:text-white/70">
                "The editing team transformed my manuscript from good to exceptional. Their attention to detail and subject expertise made all the difference in getting my paper accepted to a top-tier journal."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-sciscribe-blue/20 mr-3"></div>
                <div>
                  <p className="font-semibold">Dr. M Kishore</p>
                  <p className="text-sm text-muted-foreground">Resident, Department of Radiation Oncology</p>
                  <p className="text-sm text-muted-foreground">IPGMER</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="premium-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="mb-4 italic text-sciscribe-navy/80 dark:text-white/70">
                "As a non-native English speaker, I was struggling to effectively communicate my research. SciScribe Solutions not only fixed language issues but enhanced the scientific narrative while preserving my voice."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-sciscribe-purple/20 mr-3"></div>
                <div>
                  <p className="font-semibold">Dr. Yuki Sato</p>
                  <p className="text-sm text-muted-foreground">PhD Scholar</p>
                  <p className="text-sm text-muted-foreground">Delhi University</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

interface ProjectProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    outcome: string;
    services: string[];
    image: string;
    tags: string[];
  }
}

const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="group"
    >
      <div className="premium-card overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden mb-4">
          <div className="aspect-video rounded-md overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            {project.tags.slice(0, 2).map((tag, index) => (
              <Badge
              key={index}
              className="bg-sciscribe-navy/70 text-white text-xs font-medium px-2 py-1 rounded"
            >
              {tag}
            </Badge>            
            ))}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Award className="h-4 w-4 text-sciscribe-gold mr-2" />
            <p className="text-sm font-medium">Outcome:</p>
          </div>
          <p className="text-sm text-muted-foreground pl-6">{project.outcome}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center mb-2">
            <FileText className="h-4 w-4 text-sciscribe-blue mr-2" />
            <p className="text-sm font-medium">Services Provided:</p>
          </div>
          <div className="flex flex-wrap gap-1 pl-6">
            {project.services.slice(0, 3).map((service, index) => (
              <Badge key={index} className="bg-sciscribe-blue/10 text-sciscribe-blue dark:bg-sciscribe-blue/20 dark:text-blue-300 hover:bg-sciscribe-blue/20 text-xs">
                {service}
              </Badge>
            ))}
            {project.services.length > 3 && (
              <Badge className="bg-sciscribe-blue/10 text-sciscribe-blue dark:bg-sciscribe-blue/20 dark:text-blue-300 hover:bg-sciscribe-blue/20 text-xs">
                +{project.services.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
