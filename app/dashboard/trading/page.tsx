"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Activity,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  sparkline: number[];
}

export default function TradingPage() {
  const { format } = useCurrency();
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [orderMode, setOrderMode] = useState<"market" | "limit">("market");

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const res = await fetch("/api/markets");
        const data = await res.json();
        if (data.success) {
          setMarkets(data.data);
          setSelectedMarket(data.data[0]);
        }
      } catch {
        const fallback: MarketData[] = [
          {
            id: "bitcoin",
            symbol: "BTC",
            name: "Bitcoin",
            price: 67542,
            change24h: 2.34,
            high24h: 68200,
            low24h: 66100,
            volume24h: 28500000000,
            sparkline: Array.from({ length: 168 }, (_, i) => 65000 + Math.sin(i / 10) * 2000),
          },
          {
            id: "ethereum",
            symbol: "ETH",
            name: "Ethereum",
            price: 3456.78,
            change24h: 1.89,
            high24h: 3520,
            low24h: 3380,
            volume24h: 15200000000,
            sparkline: Array.from({ length: 168 }, (_, i) => 3300 + Math.sin(i / 10) * 150),
          },
        ];
        setMarkets(fallback);
        setSelectedMarket(fallback[0]);
      }
    }
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 30000);
    return () => clearInterval(interval);
  }, []);

  const chartData = selectedMarket?.sparkline?.map((price, index) => ({
    time: index,
    price,
  })) || [];

  const total = selectedMarket ? parseFloat(amount || "0") * selectedMarket.price : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trading</h1>
        <p className="text-muted-foreground">
          Buy and sell cryptocurrencies instantly
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Market Selector */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Select
                  value={selectedMarket?.id}
                  onValueChange={(id) => {
                    const market = markets.find((m) => m.id === id);
                    if (market) setSelectedMarket(market);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {markets.map((market) => (
                      <SelectItem key={market.id} value={market.id}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{market.symbol}</span>
                          <span className="text-muted-foreground">/USD</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedMarket && (
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-2xl font-bold">{format(selectedMarket.price)}</p>
                      <p
                        className={`text-sm flex items-center gap-1 ${
                          selectedMarket.change24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {selectedMarket.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(selectedMarket.change24h).toFixed(2)}%
                      </p>
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-sm text-muted-foreground">24h High</p>
                      <p className="font-medium">{format(selectedMarket.high24h)}</p>
                    </div>
                    <div className="hidden md:block text-right">
                      <p className="text-sm text-muted-foreground">24h Low</p>
                      <p className="font-medium">{format(selectedMarket.low24h)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card>
            <CardContent className="p-4">
              <div className="h-[400px]">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={
                              selectedMarket?.change24h && selectedMarket.change24h >= 0
                                ? "#22c55e"
                                : "#ef4444"
                            }
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={
                              selectedMarket?.change24h && selectedMarket.change24h >= 0
                                ? "#22c55e"
                                : "#ef4444"
                            }
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
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={
                          selectedMarket?.change24h && selectedMarket.change24h >= 0
                            ? "#22c55e"
                            : "#ef4444"
                        }
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5" />
              Place Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Buy/Sell Tabs */}
            <Tabs value={orderType} onValueChange={(v) => setOrderType(v as "buy" | "sell")}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger
                  value="buy"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Buy
                </TabsTrigger>
                <TabsTrigger
                  value="sell"
                  className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  Sell
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Order Type */}
            <div className="space-y-2">
              <Label>Order Type</Label>
              <Select value={orderMode} onValueChange={(v) => setOrderMode(v as "market" | "limit")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Amount ({selectedMarket?.symbol})</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex gap-2">
                {[25, 50, 75, 100].map((pct) => (
                  <Button
                    key={pct}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setAmount((1000 * pct / 100 / (selectedMarket?.price || 1)).toFixed(6))}
                  >
                    {pct}%
                  </Button>
                ))}
              </div>
            </div>

            {/* Limit Price */}
            {orderMode === "limit" && (
              <div className="space-y-2">
                <Label>Limit Price (USD)</Label>
                <Input type="number" placeholder={selectedMarket?.price.toString()} />
              </div>
            )}

            {/* Total */}
            <div className="p-4 rounded-lg bg-secondary/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Price</span>
                <span>{format(selectedMarket?.price || 0)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Fee (0.1%)</span>
                <span>{format(total * 0.001)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>{format(total + total * 0.001)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className={`w-full ${
                orderType === "buy"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {orderType === "buy" ? "Buy" : "Sell"} {selectedMarket?.symbol}
            </Button>

            {/* Available Balance */}
            <div className="text-center text-sm text-muted-foreground">
              Available: {format(5000)} USD
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Open Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Open Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No open orders</p>
            <p className="text-sm">Your active orders will appear here</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: "buy", pair: "BTC/USD", amount: 0.05, price: 67200, time: "10:32 AM" },
              { type: "sell", pair: "ETH/USD", amount: 1.5, price: 3420, time: "9:15 AM" },
              { type: "buy", pair: "SOL/USD", amount: 10, price: 175, time: "Yesterday" },
            ].map((trade, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      trade.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  >
                    {trade.type === "buy" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium capitalize">
                      {trade.type} {trade.pair}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {trade.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {trade.amount} @ {format(trade.price)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total: {format(trade.amount * trade.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
