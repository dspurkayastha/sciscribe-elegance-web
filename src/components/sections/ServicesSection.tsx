
import { FileText, FileCheck, FileSearch, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      title: "Scientific Editing",
      description:
        "Comprehensive language editing, structural improvement, and clarity enhancement for research manuscripts.",
      icon: FileText,
    },
    {
      title: "Journal Submission Support",
      description:
        "Formatting assistance, cover letter creation, and response to reviewers to maximize publication success.",
      icon: FileCheck,
    },
    {
      title: "Research Manuscript Assistance",
      description:
        "Expert guidance on manuscript structure, data presentation, and narrative development.",
      icon: FileSearch,
    },
    {
      title: "Clinical Study Writing",
      description:
        "Specialized editing and writing support for clinical trials, medical case reports, and health research.",
      icon: BarChart2,
    },
  ];

  return (
    <section id="services" className="py-20 bg-sciscribe-light/70 dark:bg-sciscribe-navy/10">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold text-foreground">Our Services</h2>
          <p className="mb-12 text-lg text-foreground/80">
            We offer comprehensive support throughout your publication journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="animate-fade-in flex h-full flex-col rounded-xl 
                border border-sciscribe-mist/50 bg-white/80 dark:bg-sciscribe-navy/90 
                shadow-[0_4px_24px_-6px_rgba(139,92,246,0.08),_0_1.5px_0_0_#F59E0B] 
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                backdrop-blur-md ring-1 ring-inset ring-sciscribe-gold/5"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sciscribe-light/80 to-sciscribe-slate/40 dark:from-sciscribe-navy/60 dark:to-sciscribe-purple/30 text-sciscribe-navy dark:text-white shadow-md border border-sciscribe-mist/40 dark:border-white/5">
                <service.icon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-sciscribe-navy dark:text-white">{service.title}</h3>
              <p className="mb-6 flex-grow text-sciscribe-navy/80 dark:text-white/70">{service.description}</p>
              <Button
                variant="ghost"
                className="mt-auto w-full justify-start p-0 text-sciscribe-gold hover:bg-transparent hover:text-sciscribe-gold/80"
              >
                Learn more &rarr;
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
