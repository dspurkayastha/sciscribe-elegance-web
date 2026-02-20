import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import LightningSeparator from "@/components/ui/lightningseparator";
import EnhancedAcademicPartnersSection from "@/components/sections/EnhancedAcademicPartnersSection";
import EnhancedTestimonialsSection from "@/components/sections/EnhancedTestimonialsSection";
import ApolloPromoBanner from "@/components/sections/ApolloPromoBanner";
import CTASection from "@/components/sections/CTASection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col relative w-full overflow-hidden">
            <InteractiveBackground className="fixed inset-0 z-0 opacity-40 dark:opacity-20" />

            <div className="relative z-10 w-full mb-24">
                <HeroSection />

                <WhyChooseUsSection />

                <ServicesSection />

                <LightningSeparator />

                <EnhancedAcademicPartnersSection />

                {/* Midpage Full Width Banner for Apollo Marketing Promo */}
                <ApolloPromoBanner />

                <EnhancedTestimonialsSection />

                <LightningSeparator />

                <CTASection />

                <LightningSeparator />

                <ContactSection />
            </div>
        </main>
    );
}
