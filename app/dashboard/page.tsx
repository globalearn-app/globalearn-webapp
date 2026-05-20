"use client";

import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "@/lib/context/AuthContext";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { getTierById } from "@/lib/config/plans";

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  sparkline: number[];
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { format } = useCurrency();
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const plan = user?.plan ? getTierById(user.plan) : getTierById(1);

  // Mock portfolio data
  const portfolioValue = 12450.89;
  const portfolioChange = 5.23;
  const dailyProfit = plan ? (portfolioValue * plan.dailyProfit) / 100 : 0;

  useEffect(() => {
    async function fetchMarkets() {
      try {
        const res = await fetch("/api/markets");
        const data = await res.json();
        if (data.success) {
          setMarkets(data.data.slice(0, 4));
        }
      } catch {
        // Use fallback
        setMarkets([
          {
            id: "bitcoin",
            symbol: "BTC",
            name: "Bitcoin",
            price: 67542,
            change24h: 2.34,
            sparkline: Array.from({ length: 24 }, (_, i) => 65000 + Math.sin(i / 3) * 2000),
          },
          {
            id: "ethereum",
            symbol: "ETH",
            name: "Ethereum",
            price: 3456.78,
            change24h: 1.89,
            sparkline: Array.from({ length: 24 }, (_, i) => 3300 + Math.sin(i / 3) * 150),
          },
        ]);
      }
    }
    fetchMarkets();
  }, []);

  const portfolioChartData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 10000 + (i * 80) + Math.sin(i / 3) * 500,
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your portfolio performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/deposits">Deposit</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/trading">Trade Now</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portfolio Value</p>
                <p className="text-2xl font-bold">{format(portfolioValue)}</p>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    portfolioChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {portfolioChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(portfolioChange)}% this month
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Daily Profit</p>
                <p className="text-2xl font-bold text-green-500">
                  +{format(dailyProfit)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {plan?.dailyProfit}% daily rate
                </p>
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
                <p className="text-sm text-muted-foreground">Current plan</p>
                <p className="text-2xl font-bold">{plan?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {plan?.duration} days duration
                </p>
              </div>
              <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${plan?.color} flex items-center justify-center`}>
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Withdrawn</p>
                <p className="text-2xl font-bold">{format(3250.0)}</p>
                <p className="text-sm text-muted-foreground">12 transactions</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Portfolio Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioChartData}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide domain={["dataMin - 500", "dataMax + 500"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [format(value), "Value"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#portfolioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-3" variant="outline" asChild>
              <Link href="/dashboard/deposits">
                <ArrowDownRight className="h-4 w-4 text-green-500" />
                Make a Deposit
              </Link>
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline" asChild>
              <Link href="/dashboard/withdrawals">
                <ArrowUpRight className="h-4 w-4 text-blue-500" />
                Request Withdrawal
              </Link>
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline" asChild>
              <Link href="/dashboard/trading">
                <TrendingUp className="h-4 w-4 text-primary" />
                Start Trading
              </Link>
            </Button>
            <Button className="w-full justify-start gap-3" variant="outline" asChild>
              <Link href="/dashboard/kyc">
                <Activity className="h-4 w-4 text-orange-500" />
                Complete KYC
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Market Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Market Overview</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/markets">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {markets.map((market) => (
              <div
                key={market.id}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xs font-bold">
                      {market.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{market.symbol}</p>
                      <p className="text-xs text-muted-foreground">{market.name}</p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      market.change24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {market.change24h >= 0 ? "+" : ""}
                    {market.change24h.toFixed(2)}%
                  </div>
                </div>
                <p className="text-lg font-bold">{format(market.price)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "deposit", amount: 500, status: "completed", time: "2 hours ago" },
              { type: "trade", amount: 150, status: "completed", time: "5 hours ago" },
              { type: "withdrawal", amount: 200, status: "pending", time: "1 day ago" },
              { type: "profit", amount: 45.5, status: "completed", time: "1 day ago" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === "deposit"
                        ? "bg-green-500/20"
                        : activity.type === "withdrawal"
                        ? "bg-blue-500/20"
                        : activity.type === "profit"
                        ? "bg-primary/20"
                        : "bg-orange-500/20"
                    }`}
                  >
                    {activity.type === "deposit" && (
                      <ArrowDownRight className="h-5 w-5 text-green-500" />
                    )}
                    {activity.type === "withdrawal" && (
                      <ArrowUpRight className="h-5 w-5 text-blue-500" />
                    )}
                    {activity.type === "trade" && (
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                    )}
                    {activity.type === "profit" && (
                      <DollarSign className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{activity.type}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      activity.type === "deposit" || activity.type === "profit"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {activity.type === "deposit" || activity.type === "profit"
                      ? "+"
                      : "-"}
                    {format(activity.amount)}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      activity.status === "completed"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
