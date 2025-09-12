import { ScrollRestoration } from "@/components/helper_functions/ScrollRestoration";
import { Navigation } from "@/app/pages/landing/Navigation";
import { Hero } from "@/app/pages/landing/Hero";
import { Features } from "@/app/pages/landing/Features";
import { CompoundInterestCalculator } from "@/app/pages/landing/CompoundInterestCalculator";
import { CurrencyConverter } from "@/app/pages/landing/CurrencyConverter";
import { CTA } from "@/app/pages/landing/CTA";
import { Footer } from "@/app/pages/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <ScrollRestoration />
      <Navigation />
      <Hero />
      <Features />
      <CompoundInterestCalculator />
      <CurrencyConverter />
      <CTA />
      <Footer />
    </div>
  );
}