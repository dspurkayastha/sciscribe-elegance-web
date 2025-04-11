
import { useState } from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Oncology Researcher",
      institution: "Memorial Cancer Institute",
      quote:
        "SciScribe transformed my complex oncology manuscript into a clear, compelling paper without sacrificing scientific precision. Their attention to detail was exceptional.",
      stars: 5,
    },
    {
      name: "Prof. Michael Roberts",
      role: "Department Chair",
      institution: "Oxford University",
      quote:
        "We've been using SciScribe for our department's publication support for three years now. Their scientific editing has significantly improved our acceptance rates.",
      stars: 5,
    },
    {
      name: "Dr. Aisha Patel",
      role: "Clinical Researcher",
      institution: "Mayo Clinic",
      quote:
        "The clinical trial manuscript assistance was invaluable. SciScribe's editors understood the nuances of our methodology and helped clarify our complex statistical findings.",
      stars: 5,
    },
    {
      name: "Dr. James Wilson",
      role: "Biotechnology Lead",
      institution: "Genentech",
      quote:
        "SciScribe's confidential handling of our pre-patent research was impeccable. Their editors helped us present our innovation clearly while maintaining our IP security.",
      stars: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = testimonials.slice(
    activeIndex,
    activeIndex + (window.innerWidth >= 768 ? 2 : 1)
  );

  return (
    <section id="testimonials" className="bg-sciscribe-light py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold text-sciscribe-navy">Client Testimonials</h2>
          <p className="mb-12 text-lg text-sciscribe-navy/80">
            Hear what researchers and scientists say about our services
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 ease-in-out ${
                  index >= activeIndex && index < activeIndex + 2
                    ? "animate-fade-in opacity-100"
                    : "opacity-0"
                }`}
                style={{ display: index >= activeIndex && index < activeIndex + 2 ? "block" : "none" }}
              >
                <div className="h-full rounded-lg bg-white p-8 shadow-md">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} size={18} fill="#FFC107" className="text-sciscribe-gold" />
                    ))}
                  </div>
                  <p className="mb-6 text-lg italic text-sciscribe-navy/80">"{testimonial.quote}"</p>
                  <div className="mt-auto">
                    <p className="font-bold text-sciscribe-navy">{testimonial.name}</p>
                    <p className="text-sm text-sciscribe-navy/70">
                      {testimonial.role}, {testimonial.institution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="mt-10 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-sciscribe-gold" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
