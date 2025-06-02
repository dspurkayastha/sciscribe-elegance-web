import Seo from "@/components/ui/Seo";
import { InteractiveBackground } from "@/components/background/InteractiveBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SummerOfferSection from "@/components/sections/SummerOfferSection";

const SummerOffer: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo
        title="Exclusive Summer Offer | SciScribe Solutions"
        description="Claim your exclusive discount by filling out our special summer offer form. Limited time only!"
      />
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 dark:bg-sciscribe-navy/5">
        <SummerOfferSection />
      </main>
      <Footer />
    </div>
  );
};

export default SummerOffer;
