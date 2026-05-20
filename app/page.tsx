import { MarketTicker } from "@/components/layout/market-ticker";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { FloatingLanguageSwitcher } from "@/components/layout/floating-language";
import { HeroSection } from "@/components/landing/hero-section";
import { WhyTradeSection } from "@/components/landing/why-trade-section";
import { TradingProductsSection } from "@/components/landing/trading-products-section";
import { TradingTiersSection } from "@/components/landing/trading-tiers-section";
import { LiveMarketCharts } from "@/components/landing/live-market-charts";
import { YouTubeSection } from "@/components/landing/youtube-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { SupportSection } from "@/components/landing/support-section";
import { RiskDisclosureSection } from "@/components/landing/risk-disclosure-section";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Market Ticker */}
      <MarketTicker />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Live Market Charts */}
      <LiveMarketCharts />

      {/* Why Trade Section */}
      <WhyTradeSection />

      {/* Trading Products */}
      <TradingProductsSection />

      {/* Trading Tiers */}
      <TradingTiersSection />

      {/* YouTube Videos */}
      <YouTubeSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA */}
      <CTASection />

      {/* Support */}
      <SupportSection />

      {/* Risk Disclosure */}
      <RiskDisclosureSection />

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingContact />
      <FloatingLanguageSwitcher />
    </main>
  );
}
