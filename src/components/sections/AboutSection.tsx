
import { Award, Shield, Users } from "lucide-react";

const AboutSection = () => {
  const pillars = [
    {
      title: "Integrity",
      description:
        "Our commitment to ethical standards and transparent practices ensures your research maintains its authenticity while meeting publication standards.",
      icon: Shield,
    },
    {
      title: "Excellence",
      description:
        "Every manuscript receives meticulous attention from PhD-level editors specialized in your research area, ensuring uncompromising quality.",
      icon: Award,
    },
    {
      title: "Confidentiality",
      description:
        "We maintain strict confidentiality protocols, safeguarding your unpublished research and intellectual property at every stage.",
      icon: Users,
    },
  ];

  return (
    <section id="about" className="bg-sciscribe-light py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-sciscribe-navy">About SciScribe Solutions</h2>
          <p className="mb-12 text-lg text-sciscribe-navy/80">
            SciScribe Solutions bridges the gap between groundbreaking research and compelling scientific 
            communication. Founded by PhD researchers and experienced editors, we transform complex scientific 
            manuscripts into clear, publishable papers while preserving your unique scientific voice.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="animate-fade-in rounded-lg bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sciscribe-light text-sciscribe-navy">
                <pillar.icon size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-sciscribe-navy">{pillar.title}</h3>
              <p className="text-sciscribe-navy/80">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
