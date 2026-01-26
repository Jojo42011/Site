import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Integrations />
      <Features />
      <UseCases />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
