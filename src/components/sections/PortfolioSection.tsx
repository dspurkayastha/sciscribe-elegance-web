
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PortfolioSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const portfolioItems = [
    {
      id: 1,
      title: "Oncology Research Review",
      journal: "Journal of Clinical Oncology",
      field: "Cancer Research",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Neuroscience Meta-Analysis",
      journal: "Nature Neuroscience",
      field: "Cognitive Science",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Genomic Sequencing Study",
      journal: "Cell",
      field: "Molecular Biology",
      image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Immunotherapy Clinical Trial",
      journal: "New England Journal of Medicine",
      field: "Immunology",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      title: "Environmental Impact Assessment",
      journal: "Science of The Total Environment",
      field: "Environmental Science",
      image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      title: "Pharmaceutical Development",
      journal: "Journal of Medicinal Chemistry",
      field: "Drug Development",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80",
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === Math.ceil(portfolioItems.length / 3) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(portfolioItems.length / 3) - 1 : prevIndex - 1
    );
  };

  const displayItems = portfolioItems.slice(activeIndex * 3, activeIndex * 3 + 3);

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden">
      {/* Modern interactive background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-sciscribe-navy/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(140,85,247,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,210,190,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(40deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0.95)_100%)] dark:bg-[linear-gradient(40deg,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.6)_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sciscribe-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sciscribe-blue/30 to-transparent" />
      </div>
      
      <motion.div
        className="absolute top-20 -left-40 h-80 w-80 rounded-full bg-sciscribe-teal/5 blur-3xl"
        animate={{
          x: [0, 60, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 -right-40 h-80 w-80 rounded-full bg-sciscribe-gold/5 blur-3xl"
        animate={{
          x: [0, -60, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 
            className="mb-2 text-4xl font-bold text-sciscribe-navy dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Recent Work
          </motion.h2>
          <motion.p 
            className="mb-12 text-lg text-sciscribe-navy/80 dark:text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A selection of manuscripts we've helped bring to publication
          </motion.p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="animate-fade-in overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sciscribe-gold/20 border border-transparent hover:border-sciscribe-gold"
                style={{ animationDelay: `${index * 0.15}s` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5 bg-white/80 dark:bg-sciscribe-navy/40 backdrop-blur-sm">
                  <h3 className="mb-2 text-lg font-bold text-sciscribe-navy dark:text-white">{item.title}</h3>
                  <p className="text-sm text-sciscribe-navy/70 dark:text-white/70">{item.journal}</p>
                  <p className="mt-2 text-sm font-medium text-sciscribe-gold">{item.field}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 dark:bg-sciscribe-navy/50 shadow-md transition-all hover:bg-sciscribe-gold/10 md:-left-5"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6 text-sciscribe-navy dark:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 dark:bg-sciscribe-navy/50 shadow-md transition-all hover:bg-sciscribe-gold/10 md:-right-5"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6 text-sciscribe-navy dark:text-white" />
          </button>

          {/* Indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(portfolioItems.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  activeIndex === index ? "w-6 bg-sciscribe-gold" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
