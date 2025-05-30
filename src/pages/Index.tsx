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
        {/* Our Socials Section */}
        <div className="relative my-16">
          <LightningSeparator />
          <section className="bg-white/70 dark:bg-sciscribe-navy/40 py-10 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-sciscribe-blue">Our Socials</h2>
            <p className="text-center text-base md:text-lg mb-6 text-gray-700 dark:text-white/80">
              Follow Us on social media for exclusive offers, expert tips, and the latest updates in scientific editing and research support.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.linkedin.com/company/sciscribe-solutions/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-sciscribe-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576386514296" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-sciscribe-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/sciscribesolutions_ig/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-3 transition-colors hover:bg-sciscribe-gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </section>
          <LightningSeparator />
        </div>
        <TestimonialsSection />
        <LightningSeparator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
