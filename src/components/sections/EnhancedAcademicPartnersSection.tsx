import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Premium glassmorphism style for cards and containers
const premiumGlassmorphism = "bg-white/30 dark:bg-sciscribe-navy/20 backdrop-blur-md border border-white/20 dark:border-sciscribe-blue/10";

const EnhancedAcademicPartnersSection = () => {
  // Indian universities and colleges logos - using the actual URLs provided
  const partnerLogos = [
    {
      name: "Assam University",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/Assam_University_logo.webp",
      alt: "Assam University, Silchar logo"
    },
    {
      name: "Kerala University of Health Sciences",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/KUHS_logo.webp",
      alt: "Kerala University of Health Sciences logo"
    },
    {
      name: "AIIMS",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/aiims_logo.webp",
      alt: "All India Institute of Medical Sciences logo"
    },
    {
      name: "AIMS",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/aims_logo.webp",
      alt: "Arundhati Institute of Medical Sciences and Hospital logo"
    },
    {
      name: "B.J. Medical College",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/bjmc-logo.webp",
      alt: "B.J. Medical College logo"
    },
    {
      name: "NIT Silchar",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/NIT-silchar_logo.webp",
      alt: "National Institute of Technology, Silchar logo"
    },
    {
      name: "Jadavpur University",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/Jadavpur_University_Logo.webp",
      alt: "Jadavpur University logo"
    },
    {
      name: "Delhi University",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/DU.webp",
      alt: "Delhi University logo"
    },
    {
      name: "Srimanta Sankaradeva University",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/Srimanta_Sankaradeva_University_of_Health_Sciences_logo.webp",
      alt: "Srimanta Sankaradeva University of Health Sciences logo"
    },
    {
      name: "West Bengal University of Health Sciences",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/West_Bengal_University_of_Health_Sciences_logo.webp",
      alt: "West Bengal University of Health Sciences logo"
    },
    {
      name: "PGIMER Chandigarh",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/PGIMER_logo.webp",
      alt: "Postgraduate Institute of Medical Education and Research, Chandigarh logo"
    },
    {
      name: "CMC Vellore",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/CMC-logo.webp",
      alt: "Christian Medical College, Vellore logo"
    },
    {
      name: "BHU",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/BHU-logo.webp",
      alt: "Banaras Hindu University logo"
    },
    {
      name: "IIT Guwahati",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/IIT_Guwahati_Logo.webp",
      alt: "Indian Institute of Technology, Guwahati logo"
    }
  ];
  
  // Publisher logos
  const publisherLogos = [
    {
      name: "Elsevier",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/Elsevier-logo.webp",
      alt: "Elsevier logo"
    },
    {
      name: "Springer",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/springer_logo.webp",
      alt: "Springer logo"
    },
    {
      name: "Sage Publications",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/sage_logo.webp",
      alt: "Sage Publications logo"
    },
    {
      name: "MDPI",
      logo: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/mdpi_logo.webp",
      alt: "MDPI logo"
    }    
  ];

  // Categories of academic partners
  const partnerCategories = [
    {
      title: "Medical Institutions",
      description: "Supporting medical researchers, clinicians, and healthcare professionals with specialized editing and publication assistance.",
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/medical.webp",
      partners: ["AIIMS", "CMC Vellore", "PGIMER Chandigarh", "NIMHANS", "B.J. Medical College"]
    },
    {
      title: "Health Sciences Universities",
      description: "Helping health science scholars and researchers communicate clinical findings with clarity and impact.",
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/scientist.webp",
      partners: ["Kerala University of Health Sciences", "Delhi University", "Srimanta Sankaradeva University", "West Bengal University of Health Sciences", "AIMS"]
    },
    {
      title: "Engineering & Technology",
      description: "Supporting technical research communication with precision and impact for engineering institutions.",
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/phd1.webp",
      partners: ["IIT Guwahati", "NIT Silchar", "Jadavpur University", "Assam University"]
    },
    {
      title: "Academic Publishers",
      description: "Trusted by leading academic publishers to help researchers meet publication standards and requirements.",
      image: "https://sciscribe-website-images.s3.ap-south-1.amazonaws.com/website_imges/scientist.webp",
      partners: ["Elsevier", "Springer", "MDPI", "Sage Publications"]
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      {/* Enhanced decorative background elements */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-sciscribe-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-sciscribe-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-sciscribe-teal/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-sciscribe-amber/5 rounded-full blur-2xl"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik0wIDMwaDMwdjMwSDB6IiBzdHJva2U9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <Badge className="mb-4 bg-sciscribe-gold/10 text-sciscribe-gold hover:bg-sciscribe-gold/20 transition-colors">
            Our Network
          </Badge>
          <h2 className="mb-4 text-4xl font-bold bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">
            Trusted by Leading Indian Institutions
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We're proud to collaborate with researchers and scholars from India's most prestigious academic institutions
          </p>
        </motion.div>

        {/* Academic Institutions Logo Section */}
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`py-8 px-4 ${premiumGlassmorphism} rounded-xl shadow-lg`}
          >
            <h3 className="text-center text-lg font-medium mb-6 bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">
              Trusted by Leading Indian Academic Institutions
            </h3>
            
            {/* Logo grid for universities - 3 rows of 5 each */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 px-4 place-items-center justify-items-center">
              {partnerLogos.map((partner, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-24 w-full relative flex items-center justify-center p-3 rounded-lg bg-gradient-to-br from-white/70 to-white/40 dark:from-sciscribe-navy/40 dark:to-sciscribe-navy/20 border border-sciscribe-mist/20 dark:border-white/5 shadow-sm group-hover:shadow-lg group-hover:border-sciscribe-teal/30 transition-all duration-300 mx-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-sciscribe-teal/5 to-sciscribe-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={partner.logo} 
                      alt={partner.alt} 
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs text-foreground/60 mt-2 group-hover:text-foreground transition-colors duration-300 text-center w-full">{partner.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Publishers Logo Section */}
        <div className="relative mb-20 overflow-hidden">
          <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`py-8 px-4 ${premiumGlassmorphism} rounded-xl shadow-lg`}
          >
            <h3 className="text-center text-lg font-medium mb-6 bg-gradient-to-r from-sciscribe-gold to-sciscribe-amber bg-clip-text text-transparent">
              Published with Leading Academic Publishers
            </h3>
            
            {/* Responsive logo grid for publishers */}
            <div className="flex flex-wrap justify-center items-center gap-10 px-4">
              {publisherLogos.map((publisher, index) => (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center group"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-20 w-full relative flex items-center justify-center p-3 rounded-lg bg-gradient-to-br from-white/70 to-white/40 dark:from-sciscribe-navy/40 dark:to-sciscribe-navy/20 border border-sciscribe-mist/20 dark:border-white/5 shadow-sm group-hover:shadow-lg group-hover:border-sciscribe-gold/30 transition-all duration-300 mx-auto overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-sciscribe-gold/5 to-sciscribe-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src={publisher.logo} 
                      alt={publisher.alt} 
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs text-foreground/60 mt-2 group-hover:text-foreground transition-colors duration-300 text-center w-full">{publisher.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Section title for categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold bg-gradient-to-r from-sciscribe-teal to-sciscribe-gold bg-clip-text text-transparent inline-block">
            Our Academic Partnerships
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-sciscribe-teal to-sciscribe-gold rounded-full mx-auto mt-2"></div>
        </motion.div>
        
        {/* Partner categories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {partnerCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={cn(
                `${premiumGlassmorphism} flex flex-col h-full rounded-xl overflow-hidden`,
                "hover:border-sciscribe-gold/30 hover:shadow-xl", 
                "transition-all duration-500"
              )}
            >
              {/* Card header with gradient */}
              <div className="bg-gradient-to-r from-sciscribe-teal/10 to-sciscribe-gold/10 p-4 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -right-6 -top-6 w-16 h-16 rounded-full bg-gradient-to-br from-sciscribe-gold/20 to-transparent blur-xl pointer-events-none" />
                
                <div className="h-32 mb-3 overflow-hidden rounded-lg">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-center bg-gradient-to-r from-sciscribe-blue to-sciscribe-teal bg-clip-text text-transparent">
                  {category.title}
                </h3>
              </div>
              
              {/* Card body */}
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-sm text-foreground/80 mb-4">
                  {category.description}
                </p>
                
                <div className="mt-auto">
                  <h4 className="text-xs font-medium text-foreground mb-2 flex items-center">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-sciscribe-teal to-sciscribe-gold mr-2"></span>
                    Partner Institutions
                  </h4>
                  <ul className="space-y-1 pl-2">
                    {category.partners.map((partner, i) => (
                      <li key={i} className="text-xs text-foreground/70 flex items-start">
                        <span className="text-sciscribe-gold mr-1">•</span> {partner}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center max-w-md mx-auto"
        >
          <button className="group px-8 py-3 rounded-full bg-gradient-to-r from-sciscribe-teal to-sciscribe-gold text-white font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mx-auto gap-2">
            <span>Partner With Us</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <p className="mt-4 text-sm text-foreground/60">
            Join our growing network of academic institutions across India
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedAcademicPartnersSection;
