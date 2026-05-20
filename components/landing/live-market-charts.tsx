"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  sparkline: number[];
  image?: string;
}

export function LiveMarketCharts() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("bitcoin");
  const { format } = useCurrency();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/markets");
        const data = await res.json();
        if (data.success) {
          setCryptos(data.data.slice(0, 6));
        }
      } catch {
        // Use fallback data
        setCryptos([
          {
            id: "bitcoin",
            symbol: "BTC",
            name: "Bitcoin",
            price: 67542,
            change24h: 2.34,
            sparkline: Array.from({ length: 168 }, (_, i) =>
              65000 + Math.sin(i / 10) * 2000 + Math.random() * 500
            ),
          },
          {
            id: "ethereum",
            symbol: "ETH",
            name: "Ethereum",
            price: 3456.78,
            change24h: 1.89,
            sparkline: Array.from({ length: 168 }, (_, i) =>
              3300 + Math.sin(i / 10) * 150 + Math.random() * 50
            ),
          },
          {
            id: "binancecoin",
            symbol: "BNB",
            name: "BNB",
            price: 598.45,
            change24h: 0.76,
            sparkline: Array.from({ length: 168 }, (_, i) =>
              580 + Math.sin(i / 10) * 20 + Math.random() * 10
            ),
          },
          {
            id: "solana",
            symbol: "SOL",
            name: "Solana",
            price: 178.92,
            change24h: 4.56,
            sparkline: Array.from({ length: 168 }, (_, i) =>
              165 + Math.sin(i / 10) * 15 + Math.random() * 5
            ),
          },
        ]);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const selected = cryptos.find((c) => c.id === selectedCrypto) || cryptos[0];

  const chartData = selected?.sparkline?.map((price, index) => ({
    time: index,
    price: price,
  })) || [];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Live Market Charts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time cryptocurrency prices and 7-day price charts
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
          >
            {selected && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold">
                      {selected.symbol?.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{selected.name}</h3>
                      <span className="text-sm text-muted-foreground">{selected.symbol}/USD</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{format(selected.price)}</div>
                    <div
                      className={`flex items-center justify-end gap-1 ${
                        selected.change24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {selected.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {Math.abs(selected.change24h).toFixed(2)}% (24h)
                    </div>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={selected.change24h >= 0 ? "#22c55e" : "#ef4444"}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={selected.change24h >= 0 ? "#22c55e" : "#ef4444"}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={["dataMin", "dataMax"]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [format(value), "Price"]}
                        labelFormatter={() => ""}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={selected.change24h >= 0 ? "#22c55e" : "#ef4444"}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 text-xs text-muted-foreground text-center">
                  7-Day Price Chart
                </div>
              </>
            )}
          </motion.div>

          {/* Crypto Selector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="font-semibold mb-4">Select Currency</h3>
            <div className="space-y-2">
              {cryptos.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => setSelectedCrypto(crypto.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCrypto === crypto.id
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold">
                      {crypto.symbol?.slice(0, 2)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{format(crypto.price)}</div>
                    <div
                      className={`text-xs ${
                        crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {crypto.change24h >= 0 ? "+" : ""}
                      {crypto.change24h?.toFixed(2)}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
