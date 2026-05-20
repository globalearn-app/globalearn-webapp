"use client";

import { useState } from "react";
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface WalletData {
  id: string;
  currency: string;
  symbol: string;
  balance: number;
  availableBalance: number;
  lockedBalance: number;
  address?: string;
  color: string;
}

const wallets: WalletData[] = [
  {
    id: "1",
    currency: "USD",
    symbol: "$",
    balance: 5234.56,
    availableBalance: 4500.0,
    lockedBalance: 734.56,
    color: "from-green-500 to-green-600",
  },
  {
    id: "2",
    currency: "BTC",
    symbol: "₿",
    balance: 0.0542,
    availableBalance: 0.0542,
    lockedBalance: 0,
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "3",
    currency: "ETH",
    symbol: "Ξ",
    balance: 1.2345,
    availableBalance: 1.0,
    lockedBalance: 0.2345,
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD71",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "4",
    currency: "USDT",
    symbol: "₮",
    balance: 2500.0,
    availableBalance: 2500.0,
    lockedBalance: 0,
    address: "TN3W4H2gJhgZxPEDmVpuZiF3V8X7VhKhDq",
    color: "from-teal-500 to-teal-600",
  },
];

export default function WalletsPage() {
  const { format } = useCurrency();
  const [showBalances, setShowBalances] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const totalBalance = wallets.reduce((sum, w) => {
    if (w.currency === "USD" || w.currency === "USDT") return sum + w.balance;
    if (w.currency === "BTC") return sum + w.balance * 67500;
    if (w.currency === "ETH") return sum + w.balance * 3450;
    return sum;
  }, 0);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Wallets</h1>
          <p className="text-muted-foreground">
            Manage your cryptocurrency and fiat wallets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Total Balance Card */}
      <Card className="bg-gradient-to-br from-primary/20 via-background to-accent/20 border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-bold">
                {showBalances ? format(totalBalance) : "••••••"}
              </p>
              <p className="text-sm text-green-500 mt-1">+5.23% from last month</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallets Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {wallets.map((wallet) => (
          <Card key={wallet.id} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${wallet.color} flex items-center justify-center`}
                >
                  <span className="text-white font-bold">{wallet.symbol}</span>
                </div>
                <div>
                  <CardTitle className="text-base">{wallet.currency}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {wallet.currency === "USD" ? "US Dollar" : 
                     wallet.currency === "BTC" ? "Bitcoin" :
                     wallet.currency === "ETH" ? "Ethereum" : "Tether"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Balance */}
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold">
                  {showBalances
                    ? wallet.currency === "USD" || wallet.currency === "USDT"
                      ? format(wallet.balance)
                      : `${wallet.symbol}${wallet.balance.toFixed(4)}`
                    : "••••••"}
                </p>
              </div>

              {/* Available / Locked */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Available</p>
                  <p className="font-medium text-green-500">
                    {showBalances
                      ? wallet.currency === "USD" || wallet.currency === "USDT"
                        ? format(wallet.availableBalance)
                        : `${wallet.symbol}${wallet.availableBalance.toFixed(4)}`
                      : "••••"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Locked</p>
                  <p className="font-medium text-orange-500">
                    {showBalances
                      ? wallet.currency === "USD" || wallet.currency === "USDT"
                        ? format(wallet.lockedBalance)
                        : `${wallet.symbol}${wallet.lockedBalance.toFixed(4)}`
                      : "••••"}
                  </p>
                </div>
              </div>

              {/* Address (for crypto) */}
              {wallet.address && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Deposit Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-secondary/50 px-2 py-1 rounded flex-1 truncate">
                      {wallet.address}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => copyAddress(wallet.address!)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    {copiedAddress === wallet.address && (
                      <span className="text-xs text-green-500">Copied!</span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 gap-1">
                  <ArrowDownRight className="h-3 w-3" />
                  Deposit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Wallet Button */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">Add New Wallet</p>
            <p className="text-sm text-muted-foreground">
              Connect a new cryptocurrency wallet
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
