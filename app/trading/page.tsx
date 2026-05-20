"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/lib/context/LanguageContext";

const tradingFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "Execute trades in milliseconds with our advanced trading engine",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Multi-layer security protocols to protect your assets",
  },
  {
    icon: BarChart3,
    title: "Advanced Charts",
    description: "Professional charting tools with 100+ technical indicators",
  },
  {
    icon: Clock,
    title: "24/7 Trading",
    description: "Trade anytime, anywhere with our always-on platform",
  },
];

const tradingTypes = [
  {
    id: "spot",
    title: "Spot Trading",
    description: "Buy and sell cryptocurrencies at current market prices",
    features: [
      "Real-time market data",
      "Limit and market orders",
      "Stop-loss orders",
      "Take-profit orders",
      "OCO orders",
    ],
  },
  {
    id: "margin",
    title: "Margin Trading",
    description: "Trade with leverage up to 10x on selected pairs",
    features: [
      "Up to 10x leverage",
      "Cross and isolated margin",
      "Risk management tools",
      "Liquidation protection",
      "Auto-deleveraging",
    ],
  },
  {
    id: "futures",
    title: "Futures Trading",
    description: "Trade perpetual contracts with advanced features",
    features: [
      "Perpetual contracts",
      "Up to 125x leverage",
      "Funding rate arbitrage",
      "Multi-collateral support",
      "Advanced order types",
    ],
  },
];

const stats = [
  { value: "$2.5B+", label: "24h Trading Volume" },
  { value: "50K+", label: "Active Traders" },
  { value: "0.1%", label: "Trading Fees" },
  { value: "99.9%", label: "Uptime" },
];

export default function TradingPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("spot");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Trade Smarter,{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Earn More
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Experience professional-grade trading with industry-leading tools,
                deep liquidity, and unmatched security on Global Earn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Start Trading
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/markets">View Markets</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Trade on Global Earn?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide everything you need for successful trading
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tradingFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trading Types */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Multiple Ways to Trade
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the trading style that fits your strategy
              </p>
            </motion.div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-3 w-full mb-8">
                {tradingTypes.map((type) => (
                  <TabsTrigger key={type.id} value={type.id}>
                    {type.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tradingTypes.map((type) => (
                <TabsContent key={type.id} value={type.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-2xl">{type.title}</CardTitle>
                        <p className="text-muted-foreground">{type.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {type.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-border">
                          <Button asChild>
                            <Link href="/dashboard/trading">
                              Start {type.title}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
              <div className="relative px-8 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Start Trading?
                </h2>
                <p className="text-white/80 mb-8 max-w-xl mx-auto">
                  Join thousands of traders who trust Global Earn for their trading needs.
                  Create your account in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/register">
                      Create Free Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
