
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <section id="portfolio" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold text-sciscribe-navy">Recent Work</h2>
          <p className="mb-12 text-lg text-sciscribe-navy/80">
            A selection of manuscripts we've helped bring to publication
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-sciscribe-navy">{item.title}</h3>
                  <p className="text-sm text-sciscribe-navy/70">{item.journal}</p>
                  <p className="mt-2 text-sm font-medium text-sciscribe-gold">{item.field}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-sciscribe-gold/10 md:-left-5"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6 text-sciscribe-navy" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-sciscribe-gold/10 md:-right-5"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6 text-sciscribe-navy" />
          </button>

          {/* Indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(portfolioItems.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  activeIndex === index ? "w-6 bg-sciscribe-gold" : "bg-gray-300"
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
