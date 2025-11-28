import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import APICostCalculator from "@/components/APICostCalculator";
import ServiceTiers from "@/components/ServiceTiers";
import UseCases from "@/components/UseCases";
import TechnicalProof from "@/components/TechnicalProof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Features />
      <Testimonials />
      <div id="calculator">
        <APICostCalculator />
      </div>
      <UseCases />
      <TechnicalProof />
      <ServiceTiers />
      <CTA />
      <Footer />
    </main>
  );
}
