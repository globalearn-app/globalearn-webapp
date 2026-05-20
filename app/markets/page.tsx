"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Market {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d: { price: number[] };
}

const categories = [
  { id: "all", label: "All Markets" },
  { id: "crypto", label: "Cryptocurrencies" },
  { id: "defi", label: "DeFi" },
  { id: "nft", label: "NFT & Gaming" },
  { id: "layer1", label: "Layer 1" },
];

export default function MarketsPage() {
  const { format } = useCurrency();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"market_cap" | "price" | "change">("market_cap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const { data: markets, isLoading } = useSWR<Market[]>("/api/markets", fetcher, {
    refreshInterval: 30000,
  });

  const filteredMarkets = markets
    ?.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "market_cap") comparison = b.market_cap - a.market_cap;
      else if (sortBy === "price") comparison = b.current_price - a.current_price;
      else if (sortBy === "change") comparison = b.price_change_percentage_24h - a.price_change_percentage_24h;
      return sortOrder === "desc" ? comparison : -comparison;
    });

  const toggleWatchlist = (id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSort = (key: "market_cap" | "price" | "change") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Markets</h1>
          <p className="text-muted-foreground">
            Track real-time prices and market data for all major cryptocurrencies
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Total Market Cap</p>
              <p className="text-2xl font-bold">$2.45T</p>
              <p className="text-sm text-green-500">+2.34%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">24h Volume</p>
              <p className="text-2xl font-bold">$98.7B</p>
              <p className="text-sm text-green-500">+5.12%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">BTC Dominance</p>
              <p className="text-2xl font-bold">52.4%</p>
              <p className="text-sm text-red-500">-0.23%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Active Coins</p>
              <p className="text-2xl font-bold">12,847</p>
              <p className="text-sm text-muted-foreground">+24 today</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="bg-secondary/50">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search markets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Markets Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">#</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th
                      className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                      onClick={() => toggleSort("price")}
                    >
                      <span className="inline-flex items-center gap-1">
                        Price
                        <ArrowUpDown className="h-3 w-3" />
                      </span>
                    </th>
                    <th
                      className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                      onClick={() => toggleSort("change")}
                    >
                      <span className="inline-flex items-center gap-1">
                        24h %
                        <ArrowUpDown className="h-3 w-3" />
                      </span>
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">
                      7d %
                    </th>
                    <th
                      className="text-right p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground hidden lg:table-cell"
                      onClick={() => toggleSort("market_cap")}
                    >
                      <span className="inline-flex items-center gap-1">
                        Market Cap
                        <ArrowUpDown className="h-3 w-3" />
                      </span>
                    </th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground hidden xl:table-cell">
                      Volume (24h)
                    </th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground hidden xl:table-cell">
                      Last 7 Days
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b border-border">
                        <td colSpan={9} className="p-4">
                          <div className="h-10 bg-secondary/50 rounded animate-pulse" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    filteredMarkets?.map((market, index) => (
                      <motion.tr
                        key={market.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="border-b border-border hover:bg-secondary/30 transition-colors"
                      >
                        <td className="p-4 text-sm text-muted-foreground">{index + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={market.image}
                              alt={market.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{market.name}</p>
                              <p className="text-xs text-muted-foreground uppercase">
                                {market.symbol}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium">
                          {format(market.current_price)}
                        </td>
                        <td className="p-4 text-right">
                          <span
                            className={`inline-flex items-center gap-1 ${
                              market.price_change_percentage_24h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {market.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {Math.abs(market.price_change_percentage_24h).toFixed(2)}%
                          </span>
                        </td>
                        <td className="p-4 text-right hidden md:table-cell">
                          <span
                            className={
                              market.price_change_percentage_7d_in_currency >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {market.price_change_percentage_7d_in_currency >= 0 ? "+" : ""}
                            {market.price_change_percentage_7d_in_currency?.toFixed(2)}%
                          </span>
                        </td>
                        <td className="p-4 text-right hidden lg:table-cell">
                          {format(market.market_cap)}
                        </td>
                        <td className="p-4 text-right hidden xl:table-cell">
                          {format(market.total_volume)}
                        </td>
                        <td className="p-4 hidden xl:table-cell">
                          <div className="w-24 h-8">
                            <svg viewBox="0 0 100 30" className="w-full h-full">
                              <polyline
                                fill="none"
                                stroke={
                                  market.price_change_percentage_7d_in_currency >= 0
                                    ? "#22c55e"
                                    : "#ef4444"
                                }
                                strokeWidth="2"
                                points={market.sparkline_in_7d?.price
                                  ?.slice(-20)
                                  .map((p, i, arr) => {
                                    const min = Math.min(...arr);
                                    const max = Math.max(...arr);
                                    const x = (i / (arr.length - 1)) * 100;
                                    const y = 30 - ((p - min) / (max - min || 1)) * 30;
                                    return `${x},${y}`;
                                  })
                                  .join(" ")}
                              />
                            </svg>
                          </div>
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWatchlist(market.id)}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                watchlist.includes(market.id)
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
