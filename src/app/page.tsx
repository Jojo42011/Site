import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ClientCarousel from "@/components/ClientCarousel";
import Features from "@/components/Features";
import Products from "@/components/Products";
import CTA from "@/components/CTA";
import APICostCalculator from "@/components/APICostCalculator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <ClientCarousel />
      <Features />
      <Products />
      <CTA />
      <div id="calculator">
        <APICostCalculator />
      </div>
      <Footer />
    </main>
  );
}
