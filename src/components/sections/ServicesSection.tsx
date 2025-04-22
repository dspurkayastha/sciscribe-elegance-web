
import { FileText, FileCheck, FileSearch, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      title: "Scientific Editing",
      description:
        "Comprehensive language editing, structural improvement, and clarity enhancement for research manuscripts.",
      icon: FileText,
      color: "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/40 dark:to-cyan-500/40",
      borderColor: "border-blue-300 dark:border-blue-400/30",
      iconBg: "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/60 dark:to-cyan-800/40"
    },
    {
      title: "Journal Submission Support",
      description:
        "Formatting assistance, cover letter creation, and response to reviewers to maximize publication success.",
      icon: FileCheck,
      color: "from-purple-500/20 to-pink-500/20 dark:from-purple-500/40 dark:to-pink-500/40",
      borderColor: "border-purple-300 dark:border-purple-400/30",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/60 dark:to-pink-800/40"
    },
    {
      title: "Research Manuscript Assistance",
      description:
        "Expert guidance on manuscript structure, data presentation, and narrative development.",
      icon: FileSearch,
      color: "from-green-500/20 to-teal-500/20 dark:from-green-500/40 dark:to-teal-500/40",
      borderColor: "border-green-300 dark:border-green-400/30",
      iconBg: "bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/60 dark:to-teal-800/40"
    },
    {
      title: "Clinical Study Writing",
      description:
        "Specialized editing and writing support for clinical trials, medical case reports, and health research.",
      icon: BarChart2,
      color: "from-amber-500/20 to-orange-500/20 dark:from-amber-500/40 dark:to-orange-500/40",
      borderColor: "border-amber-300 dark:border-amber-400/30",
      iconBg: "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/60 dark:to-orange-800/40"
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
              className={`animate-fade-in flex h-full flex-col rounded-xl 
                border ${service.borderColor} bg-gradient-to-br ${service.color}
                shadow-[0_4px_24px_-6px_rgba(139,92,246,0.12),_0_1.5px_0_0_#F59E0B] 
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                backdrop-blur-md ring-1 ring-inset ring-sciscribe-gold/5`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${service.iconBg} text-sciscribe-navy dark:text-white shadow-md border border-sciscribe-mist/40 dark:border-white/5`}>
                <service.icon size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-sciscribe-navy dark:text-white">{service.title}</h3>
              <p className="mb-6 flex-grow text-sciscribe-navy/90 dark:text-white/80">{service.description}</p>
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
