import HeroSection from "@/components/sections/HeroSection";
import ApolloSection from "@/components/sections/ApolloSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-transparent overflow-hidden relative w-full m-0 p-0">
            <HeroSection />
            <ApolloSection />
            <WhyChooseUsSection />
            <ServicesSection />
        </main>
    );
}

