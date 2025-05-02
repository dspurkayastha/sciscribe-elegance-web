import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import AddOnServicesSection from "@/components/sections/AddOnServicesSection";
import AcademicPartnersSection from "@/components/sections/AcademicPartnersSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ServicesCarouselSection from "@/components/sections/ServicesCarouselSection";
import TeamSection from "@/components/sections/TeamSection";
import Seo from "@/components/ui/Seo";
import LightningSeparator from "@/components/ui/lightningseparator";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo
        title="SciScribe Solutions | Scientific Editing, Research Consulting & Publication Support"
        description="Professional academic editing, research consulting, journal submission support, and publication services for scientists, researchers, and students worldwide. Accelerate your research with our expert team."
      />
      <InteractiveBackground />
      <Navbar />
      <main className="dark:bg-sciscribe-navy/5">
        <HeroSection />
        <AboutSection />
        <CoreValuesSection />
        <LightningSeparator />
        <ServicesSection />
        <AddOnServicesSection />
        <LightningSeparator />
        <AcademicPartnersSection />
        <WhyChooseUsSection />
        <ServicesCarouselSection />
        <TeamSection />
        <PortfolioSection />
        <TestimonialsSection />
        <LightningSeparator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
