import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import EnhancedTestimonialsSection from "@/components/sections/EnhancedTestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import AcademicPartnersSection from "@/components/sections/AcademicPartnersSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import CTASection from "@/components/sections/CTASection";
import RouterAwareSeo from "@/components/ui/RouterAwareSeo";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import LightningSeparator from "@/components/ui/lightningseparator";
import EnhancedAcademicPartnersSection from "@/components/sections/EnhancedAcademicPartnersSection";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <RouterAwareSeo
        title="SciScribe Solutions | Scientific Editing, Research Consulting & Publication Support"
        description="Professional academic editing, research consulting, journal submission support, and publication services for scientists, researchers, and students worldwide. Accelerate your research with our expert team."
      />
      {/* Add LocalBusinessSchema for better local SEO */}
      <LocalBusinessSchema />
      <InteractiveBackground />
      <Navbar />
      <main className="dark:bg-sciscribe-navy/5">
        <HeroSection />
        <WhyChooseUsSection />
        <ServicesSection />
        <LightningSeparator />
        <EnhancedAcademicPartnersSection /> 
        <EnhancedTestimonialsSection />
        <LightningSeparator />
        <CTASection />
        <LightningSeparator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
