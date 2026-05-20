"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  Copy,
  Check,
  Bitcoin,
  Wallet,
  CreditCard,
  Building,
  Clock,
  AlertCircle,
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

const cryptoAddresses = {
  BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  USDT: "TN9HbFFVJBm7mFTvT9xVMRGsNrxcmfTuWK",
};

export default function DepositsPage() {
  const { format } = useCurrency();
  const [depositMethod, setDepositMethod] = useState("crypto");
  const [cryptoCurrency, setCryptoCurrency] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentDeposits = [
    { id: 1, method: "BTC", amount: 0.05, amountUSD: 3375, status: "completed", date: "2024-01-15" },
    { id: 2, method: "ETH", amount: 1.5, amountUSD: 5185, status: "pending", date: "2024-01-14" },
    { id: 3, method: "Bank", amount: 1000, amountUSD: 1000, status: "completed", date: "2024-01-10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deposits</h1>
        <p className="text-muted-foreground">
          Fund your account to start trading
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Deposit Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownToLine className="h-5 w-5" />
                Make a Deposit
              </CardTitle>
              <CardDescription>
                Choose your preferred deposit method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={depositMethod} onValueChange={setDepositMethod}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="crypto" className="gap-2">
                    <Bitcoin className="h-4 w-4" />
                    Crypto
                  </TabsTrigger>
                  <TabsTrigger value="card" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Card
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
                    <Label>Deposit Address</Label>
                    <div className="flex gap-2">
                      <Input
                        value={cryptoAddresses[cryptoCurrency as keyof typeof cryptoAddresses]}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          handleCopy(cryptoAddresses[cryptoCurrency as keyof typeof cryptoAddresses])
                        }
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-500">Important</p>
                        <p className="text-muted-foreground">
                          Only send {cryptoCurrency} to this address. Sending any other
                          cryptocurrency may result in permanent loss.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount Sent ({cryptoCurrency})</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <Button className="w-full">Confirm Deposit</Button>
                </TabsContent>

                <TabsContent value="card" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Amount (USD)</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      min="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum deposit: $100
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input placeholder="4242 4242 4242 4242" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVC</Label>
                      <Input placeholder="123" />
                    </div>
                  </div>

                  <Button className="w-full">
                    Pay {amount ? format(parseFloat(amount)) : "$0.00"}
                  </Button>
                </TabsContent>

                <TabsContent value="bank" className="space-y-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-medium mb-3">Bank Transfer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank Name</span>
                        <span className="font-medium">Global Earn Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name</span>
                        <span className="font-medium">Global Earn Trading Ltd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Number</span>
                        <span className="font-medium">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Routing Number</span>
                        <span className="font-medium">021000021</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SWIFT Code</span>
                        <span className="font-medium">GLOBUS33</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount Transferred (USD)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Reference Number</Label>
                    <Input placeholder="Transaction reference" />
                  </div>

                  <Button className="w-full">Submit Deposit Request</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">{format(12450.89)}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available</span>
                  <span className="text-green-500">{format(10200.00)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Orders</span>
                  <span>{format(2250.89)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deposit Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum</span>
                <span>{format(100)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Maximum (Daily)</span>
                <span>{format(50000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Time</span>
                <span>1-3 confirmations</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deposit History */}
      <Card>
        <CardHeader>
          <CardTitle>Deposit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentDeposits.map((deposit) => (
              <div
                key={deposit.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    {deposit.method === "Bank" ? (
                      <Building className="h-5 w-5 text-green-500" />
                    ) : (
                      <Wallet className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {deposit.method === "Bank"
                        ? "Bank Transfer"
                        : `${deposit.method} Deposit`}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {deposit.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-500">
                    +{format(deposit.amountUSD)}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      deposit.status === "completed"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {deposit.status}
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
