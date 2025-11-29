import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ServiceTiers from "@/components/ServiceTiers";
import TechnicalProof from "@/components/TechnicalProof";
import CTA from "@/components/CTA";
import APICostCalculator from "@/components/APICostCalculator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Features />
      <TechnicalProof />
      <ServiceTiers />
      <CTA />
      <div id="calculator">
        <APICostCalculator />
      </div>
      <Footer />
    </main>
  );
}
