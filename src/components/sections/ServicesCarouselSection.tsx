
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServicesCarouselSection = () => {
  const services = [
    {
      id: 1,
      title: "Scientific Manuscript Editing",
      description: "We enhance clarity, structure, and language while preserving your scientific voice. Our editors ensure your manuscript meets journal standards and effectively communicates your research findings.",
      image: "https://s3.ap-south-1.amazonaws.com/client-deliverables.sciscribesolutions/website_imges/cman.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4TV37PKLV5CX6OMV%2F20250509%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250509T205814Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c0d31cafc8d6d4bd08c107f884411f9f1473af8ae2f19c9d6c2218e0c14ad70c"
    },
    {
      id: 2,
      title: "Statistical Analysis & Data Visualization",
      description: "We create impactful figures, tables, and visuals, and offer guidance on study design, statistical analysis, and presenting your findings with confidence.",
      image: "https://s3.ap-south-1.amazonaws.com/client-deliverables.sciscribesolutions/website_imges/cstats.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4TV37PKLV5CX6OMV%2F20250509%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250509T205814Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=508235210079c5016c24045a188fe4722bae5519ccaad9101cb7914bab14aae5"
    },
    {
      id: 3,
      title: "Thesis & Dissertation Support",
      description: "Comprehensive editing support for graduate students, ensuring your thesis meets academic standards for clarity, structure, and formatting requirements.",
      image: "https://s3.ap-south-1.amazonaws.com/client-deliverables.sciscribesolutions/website_imges/cthesis.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4TV37PKLV5CX6OMV%2F20250509%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250509T205814Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d668398a648913eda3ea6e44005723e47690adb46e60f424b384346c9cc6a26d"
    },
    {
      id: 4,
      title: "Scientific Publication Services",
      description: "End-to-end publication support, including journal selection, cover letter creation, response to reviewers, and formatting according to journal guidelines.",
      image: "https://s3.ap-south-1.amazonaws.com/client-deliverables.sciscribesolutions/website_imges/cjournal.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4TV37PKLV5CX6OMV%2F20250509%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250509T205814Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5c3e33c453218d4cde11ce67546244d5dc81e3632737fc24e5581a2c901313eb"
    },
    {
      id: 5,
      title: "Grant Writing & Peer Review",
      description: "Professional editing and peer review of grant proposals and research papers to increase your chances of funding and acceptance.",
      image: "https://s3.ap-south-1.amazonaws.com/client-deliverables.sciscribesolutions/website_imges/cgrant.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA4TV37PKLV5CX6OMV%2F20250509%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250509T205814Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=93f56a11e93f4c9fbbad8912c144ce7eed8a7cbfa252300639d57e98695c7a76"
    }
  ];

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);
  const autoPlayDuration = 5000;

  const nextSlide = () => {
    setCurrent(current === services.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? services.length - 1 : current - 1);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set up auto play
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, autoPlayDuration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current]);

  return (
    <section id="hire-us" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sciscribe-mist/30 to-white/0 dark:from-sciscribe-navy/30 dark:to-sciscribe-navy/0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-bold dark:text-white text-sciscribe-navy">Hire Us For</h2>
          <p className="text-lg dark:text-white/80 text-sciscribe-navy/80">
            Our comprehensive scientific communication services to elevate your research
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform ease-out duration-700"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {services.map((service) => (
                <div key={service.id} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-sciscribe-navy/30 p-6 md:p-10 rounded-xl shadow-xl border border-sciscribe-mist/30 dark:border-white/5">
                    <div className="flex items-center justify-center">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="max-h-64 object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col justify-center text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-4 text-sciscribe-navy dark:text-white">{service.title}</h3>
                      <p className="mb-6 text-sciscribe-navy/80 dark:text-white/70">{service.description}</p>
                      <div>
                        <Link to="/contact">
                          <Button className="btn-premium">Get Started</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 bg-white/80 dark:bg-sciscribe-navy/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-sciscribe-navy transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-sciscribe-navy dark:text-white" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 bg-white/80 dark:bg-sciscribe-navy/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-sciscribe-navy transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="text-sciscribe-navy dark:text-white" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-sciscribe-gold w-6' 
                    : 'bg-sciscribe-mist dark:bg-white/30'
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

export default ServicesCarouselSection;
