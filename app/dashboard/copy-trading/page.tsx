"use client";

import { useState } from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Star,
  Copy,
  Settings,
  BarChart3,
  Activity,
  Shield,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface Trader {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  winRate: number;
  totalReturn: number;
  monthlyReturn: number;
  copiers: number;
  riskLevel: "low" | "medium" | "high";
  tradingStyle: string;
  aum: number;
  verified: boolean;
  following: boolean;
}

const topTraders: Trader[] = [
  {
    id: "1",
    name: "CryptoMaster",
    avatar: "CM",
    rank: 1,
    winRate: 78.5,
    totalReturn: 324.5,
    monthlyReturn: 18.2,
    copiers: 1523,
    riskLevel: "medium",
    tradingStyle: "Swing Trading",
    aum: 2500000,
    verified: true,
    following: true,
  },
  {
    id: "2",
    name: "SafeTrader",
    avatar: "ST",
    rank: 2,
    winRate: 82.3,
    totalReturn: 156.8,
    monthlyReturn: 8.5,
    copiers: 2341,
    riskLevel: "low",
    tradingStyle: "Conservative",
    aum: 5200000,
    verified: true,
    following: false,
  },
  {
    id: "3",
    name: "AlphaWolf",
    avatar: "AW",
    rank: 3,
    winRate: 71.2,
    totalReturn: 489.3,
    monthlyReturn: 28.7,
    copiers: 892,
    riskLevel: "high",
    tradingStyle: "Aggressive",
    aum: 1800000,
    verified: true,
    following: false,
  },
  {
    id: "4",
    name: "SteadyGains",
    avatar: "SG",
    rank: 4,
    winRate: 85.1,
    totalReturn: 98.4,
    monthlyReturn: 5.2,
    copiers: 3102,
    riskLevel: "low",
    tradingStyle: "Long-term",
    aum: 8100000,
    verified: true,
    following: false,
  },
  {
    id: "5",
    name: "DayTraderPro",
    avatar: "DP",
    rank: 5,
    winRate: 68.9,
    totalReturn: 267.1,
    monthlyReturn: 15.3,
    copiers: 756,
    riskLevel: "high",
    tradingStyle: "Day Trading",
    aum: 1200000,
    verified: false,
    following: false,
  },
];

export default function CopyTradingPage() {
  const { format } = useCurrency();
  const [traders, setTraders] = useState<Trader[]>(topTraders);
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [copyAmount, setCopyAmount] = useState("500");
  const [stopLoss, setStopLoss] = useState("20");
  const [riskFilter, setRiskFilter] = useState("all");

  const filteredTraders = traders.filter((trader) => {
    if (riskFilter === "all") return true;
    return trader.riskLevel === riskFilter;
  });

  const followingTraders = traders.filter((t) => t.following);

  const toggleFollow = (traderId: string) => {
    setTraders((prev) =>
      prev.map((t) =>
        t.id === traderId ? { ...t, following: !t.following } : t
      )
    );
  };

  const riskColors = {
    low: "text-green-500 bg-green-500/20",
    medium: "text-yellow-500 bg-yellow-500/20",
    high: "text-red-500 bg-red-500/20",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Copy Trading</h1>
        <p className="text-muted-foreground">
          Copy the trades of successful traders automatically
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Following</p>
                <p className="text-2xl font-bold">{followingTraders.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Copy Profit</p>
                <p className="text-2xl font-bold text-green-500">+{format(1245)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Copies</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Allocated</p>
                <p className="text-2xl font-bold">{format(2500)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList>
          <TabsTrigger value="discover">Discover Traders</TabsTrigger>
          <TabsTrigger value="following">Following ({followingTraders.length})</TabsTrigger>
          <TabsTrigger value="history">Copy History</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[150px]">
                <Shield className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risks</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Traders Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTraders.map((trader) => (
              <Card key={trader.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                          {trader.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{trader.name}</p>
                            {trader.verified && (
                              <Shield className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            #{trader.rank} • {trader.tradingStyle}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${riskColors[trader.riskLevel]}`}
                      >
                        {trader.riskLevel}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-green-500">
                          +{trader.totalReturn}%
                        </p>
                        <p className="text-xs text-muted-foreground">Total Return</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{trader.winRate}%</p>
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{trader.copiers}</p>
                        <p className="text-xs text-muted-foreground">Copiers</p>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Return */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Monthly Return</span>
                      <span
                        className={`text-sm font-medium ${
                          trader.monthlyReturn >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {trader.monthlyReturn >= 0 ? "+" : ""}
                        {trader.monthlyReturn}%
                      </span>
                    </div>
                    <Progress value={Math.min(trader.monthlyReturn * 3, 100)} className="h-2" />

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1"
                            onClick={() => setSelectedTrader(trader)}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Copy {trader.name}</DialogTitle>
                            <DialogDescription>
                              Configure your copy trading settings
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Copy Amount (USD)</Label>
                              <Input
                                type="number"
                                value={copyAmount}
                                onChange={(e) => setCopyAmount(e.target.value)}
                                placeholder="500"
                              />
                              <p className="text-xs text-muted-foreground">
                                Minimum: $100 • Available: $5,000
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label>Stop Loss (%)</Label>
                              <Input
                                type="number"
                                value={stopLoss}
                                onChange={(e) => setStopLoss(e.target.value)}
                                placeholder="20"
                              />
                              <p className="text-xs text-muted-foreground">
                                Auto-stop copying if losses exceed this percentage
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <Label>Copy Open Trades</Label>
                                <p className="text-xs text-muted-foreground">
                                  Copy currently open positions
                                </p>
                              </div>
                              <Switch />
                            </div>

                            <Button className="w-full" size="lg">
                              Start Copying
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant={trader.following ? "default" : "outline"}
                        size="icon"
                        onClick={() => toggleFollow(trader.id)}
                      >
                        <Star
                          className={`h-4 w-4 ${trader.following ? "fill-current" : ""}`}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="space-y-4">
          {followingTraders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {followingTraders.map((trader) => (
                <Card key={trader.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                          {trader.avatar}
                        </div>
                        <div>
                          <p className="font-semibold">{trader.name}</p>
                          <p className="text-xs text-muted-foreground">
                            #{trader.rank}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFollow(trader.id)}
                      >
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <p className="text-lg font-bold text-green-500">
                          +{trader.totalReturn}%
                        </p>
                        <p className="text-xs text-muted-foreground">Total</p>
                      </div>
                      <div className="p-2 rounded-lg bg-secondary/50">
                        <p className="text-lg font-bold">{trader.winRate}%</p>
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No traders followed yet</p>
                <p className="text-sm text-muted-foreground">
                  Star traders to follow their performance
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Copy Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { trader: "CryptoMaster", pair: "BTC/USD", type: "buy", pnl: 45.20, time: "2 hours ago" },
                  { trader: "CryptoMaster", pair: "ETH/USD", type: "sell", pnl: -12.50, time: "5 hours ago" },
                  { trader: "CryptoMaster", pair: "SOL/USD", type: "buy", pnl: 78.30, time: "1 day ago" },
                ].map((trade, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
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
                        <p className="text-xs text-muted-foreground">
                          Copied from {trade.trader} • {trade.time}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-bold ${
                        trade.pnl >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {trade.pnl >= 0 ? "+" : ""}
                      {format(trade.pnl)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
