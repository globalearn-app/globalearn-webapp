"use client";

import { motion } from "framer-motion";
import {
  Bitcoin,
  DollarSign,
  TrendingUp,
  Gem,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";

const products = [
  {
    id: "crypto",
    name: "Cryptocurrencies",
    description: "Trade Bitcoin, Ethereum, and 100+ altcoins with low fees",
    icon: Bitcoin,
    pairs: ["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT"],
    color: "from-orange-500 to-orange-600",
    stats: "100+ pairs",
  },
  {
    id: "forex",
    name: "Forex",
    description: "Major and minor currency pairs with tight spreads",
    icon: DollarSign,
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"],
    color: "from-green-500 to-green-600",
    stats: "50+ pairs",
  },
  {
    id: "stocks",
    name: "Stocks & ETFs",
    description: "Trade top global stocks and ETFs commission-free",
    icon: TrendingUp,
    pairs: ["AAPL", "TSLA", "GOOGL", "AMZN"],
    color: "from-blue-500 to-blue-600",
    stats: "500+ stocks",
  },
  {
    id: "commodities",
    name: "Commodities",
    description: "Gold, silver, oil, and agricultural products",
    icon: Gem,
    pairs: ["XAU/USD", "XAG/USD", "WTI", "BRENT"],
    color: "from-yellow-500 to-amber-600",
    stats: "20+ commodities",
  },
  {
    id: "indices",
    name: "Indices",
    description: "Trade major global market indices 24/7",
    icon: BarChart3,
    pairs: ["S&P 500", "NASDAQ", "DOW", "FTSE"],
    color: "from-purple-500 to-purple-600",
    stats: "15+ indices",
  },
];

export function TradingProductsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t("products.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${product.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center`}
                  >
                    <product.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                    {product.stats}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.pairs.map((pair) => (
                    <span
                      key={pair}
                      className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground"
                    >
                      {pair}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
