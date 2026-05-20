"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useCurrency } from "@/lib/context/CurrencyContext";

const stats = [
  { value: "$2.5B+", label: "Trading Volume" },
  { value: "50,000+", label: "Active Traders" },
  { value: "99.9%", label: "Uptime" },
  { value: "150+", label: "Countries" },
];

export function HeroSection() {
  const { t } = useLanguage();
  const { format } = useCurrency();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Secure & Regulated Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
              {t("hero.title")}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/register">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/markets">{t("hero.secondary")}</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Live Prices Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Live Markets</h3>
                <span className="flex items-center gap-2 text-sm text-green-500">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Bitcoin", symbol: "BTC", price: 67542.00, change: 2.34 },
                  { name: "Ethereum", symbol: "ETH", price: 3456.78, change: 1.89 },
                  { name: "Solana", symbol: "SOL", price: 178.92, change: 4.56 },
                  { name: "BNB", symbol: "BNB", price: 598.45, change: -0.76 },
                ].map((coin, index) => (
                  <motion.div
                    key={coin.symbol}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-sm">
                        {coin.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{coin.name}</div>
                        <div className="text-sm text-muted-foreground">{coin.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{format(coin.price)}</div>
                      <div
                        className={`text-sm flex items-center justify-end gap-1 ${
                          coin.change >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        <TrendingUp className={`h-3 w-3 ${coin.change < 0 ? "rotate-180" : ""}`} />
                        {Math.abs(coin.change)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>12,345 traders online</span>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <Link href="/markets">View All</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
