"use client";

import { useState } from "react";
import {
  ArrowUpFromLine,
  Wallet,
  Building,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { useAuth } from "@/lib/context/AuthContext";
import { getTierById } from "@/lib/config/tiers";

export default function WithdrawalsPage() {
  const { format } = useCurrency();
  const { user } = useAuth();
  const [withdrawMethod, setWithdrawMethod] = useState("crypto");
  const [cryptoCurrency, setCryptoCurrency] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const tier = user?.tier ? getTierById(user.tier) : getTierById(1);
  const availableBalance = 10200.0;
  const fee = parseFloat(amount || "0") * 0.01;
  const netAmount = parseFloat(amount || "0") - fee;

  const recentWithdrawals = [
    { id: 1, method: "BTC", amount: 0.03, amountUSD: 2025, status: "completed", date: "2024-01-12" },
    { id: 2, method: "Bank", amount: 500, amountUSD: 500, status: "processing", date: "2024-01-11" },
    { id: 3, method: "ETH", amount: 0.5, amountUSD: 1728, status: "completed", date: "2024-01-08" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Withdrawals</h1>
        <p className="text-muted-foreground">
          Withdraw your funds to your wallet or bank account
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Withdrawal Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpFromLine className="h-5 w-5" />
                Request Withdrawal
              </CardTitle>
              <CardDescription>
                Choose your preferred withdrawal method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={withdrawMethod} onValueChange={setWithdrawMethod}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="crypto" className="gap-2">
                    <Wallet className="h-4 w-4" />
                    Crypto
                  </TabsTrigger>
                  <TabsTrigger value="bank" className="gap-2">
                    <Building className="h-4 w-4" />
                    Bank
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="crypto" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Cryptocurrency</Label>
                    <Select value={cryptoCurrency} onValueChange={setCryptoCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="USDT">Tether (USDT - TRC20)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Wallet Address</Label>
                    <Input
                      placeholder={`Enter your ${cryptoCurrency} wallet address`}
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Available: {format(availableBalance)}</span>
                      <button
                        className="text-primary hover:underline"
                        onClick={() => setAmount(availableBalance.toString())}
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span>{format(parseFloat(amount || "0"))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fee (1%)</span>
                      <span className="text-red-500">-{format(fee)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-border">
                      <span>You will receive</span>
                      <span className="text-green-500">{format(netAmount > 0 ? netAmount : 0)}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-500">Important</p>
                        <p className="text-muted-foreground">
                          Please double-check your wallet address. Withdrawals to
                          incorrect addresses cannot be reversed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" disabled={!amount || !walletAddress}>
                    Request Withdrawal
                  </Button>
                </TabsContent>

                <TabsContent value="bank" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input placeholder="Enter your bank name" />
                  </div>

                  <div className="space-y-2">
                    <Label>Account Holder Name</Label>
                    <Input placeholder="Full name as it appears on account" />
                  </div>

                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input placeholder="Enter account number" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Routing Number</Label>
                      <Input placeholder="Routing number" />
                    </div>
                    <div className="space-y-2">
                      <Label>SWIFT Code (Optional)</Label>
                      <Input placeholder="SWIFT code" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Available: {format(availableBalance)}</span>
                      <button
                        className="text-primary hover:underline"
                        onClick={() => setAmount(availableBalance.toString())}
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span>{format(parseFloat(amount || "0"))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bank Fee</span>
                      <span className="text-red-500">-{format(25)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-border">
                      <span>You will receive</span>
                      <span className="text-green-500">
                        {format(Math.max(parseFloat(amount || "0") - 25, 0))}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full" disabled={!amount}>
                    Request Bank Withdrawal
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500 mb-4">
                {format(availableBalance)}
              </div>
              <p className="text-sm text-muted-foreground">
                Funds available for withdrawal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Withdrawal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min. Withdrawal</span>
                <span>{format(50)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max. Daily</span>
                <span>{format(tier?.id && tier.id >= 4 ? 100000 : 10000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Time</span>
                <span>{tier?.id && tier.id >= 4 ? "24 hours" : "24-48 hours"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Crypto Fee</span>
                <span>1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank Fee</span>
                <span>{format(25)} flat</span>
              </div>
            </CardContent>
          </Card>

          {tier?.id && tier.id >= 4 && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">VIP Benefits</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  As a {tier.name} tier member, you enjoy faster withdrawals and
                  higher daily limits.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Withdrawal History */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWithdrawals.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      withdrawal.status === "completed"
                        ? "bg-green-500/20"
                        : withdrawal.status === "processing"
                        ? "bg-yellow-500/20"
                        : "bg-red-500/20"
                    }`}
                  >
                    {withdrawal.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : withdrawal.status === "processing" ? (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {withdrawal.method === "Bank"
                        ? "Bank Withdrawal"
                        : `${withdrawal.method} Withdrawal`}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {withdrawal.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">-{format(withdrawal.amountUSD)}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      withdrawal.status === "completed"
                        ? "bg-green-500/20 text-green-500"
                        : withdrawal.status === "processing"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {withdrawal.status}
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
