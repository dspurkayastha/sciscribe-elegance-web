
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
    <section id="services" className="py-20">
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
              className="animate-fade-in flex h-full flex-col rounded-lg border border-gray-100 bg-white dark:bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sciscribe-light text-sciscribe-navy dark:bg-sciscribe-navy/30 dark:text-white">
                <service.icon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">{service.title}</h3>
              <p className="mb-6 flex-grow text-foreground/80">{service.description}</p>
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
