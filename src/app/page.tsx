import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TrustCredibility from "@/components/TrustCredibility";
import ServiceTiers from "@/components/ServiceTiers";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Features />
      <TrustCredibility />
      <ServiceTiers />
      <UseCases />
      <CTA />
      <Footer />
    </main>
  );
}
