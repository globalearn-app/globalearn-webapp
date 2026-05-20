"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Calendar,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { format as formatDate } from "date-fns";

type TransactionType = "deposit" | "withdrawal" | "trade" | "commission" | "bonus";
type TransactionStatus = "completed" | "pending" | "failed";

interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  fee: number;
  status: TransactionStatus;
  date: Date;
  reference: string;
  method?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    type: "deposit",
    description: "Bank Transfer Deposit",
    amount: 1500,
    fee: 0,
    status: "completed",
    date: new Date("2024-03-15T10:30:00"),
    reference: "DEP-2024031510",
    method: "Bank Transfer",
  },
  {
    id: "TXN002",
    type: "trade",
    description: "Buy BTC/USD",
    amount: -500,
    fee: 0.5,
    status: "completed",
    date: new Date("2024-03-14T14:22:00"),
    reference: "TRD-2024031414",
  },
  {
    id: "TXN003",
    type: "commission",
    description: "Referral Commission - John D.",
    amount: 75,
    fee: 0,
    status: "completed",
    date: new Date("2024-03-13T09:15:00"),
    reference: "COM-2024031309",
  },
  {
    id: "TXN004",
    type: "withdrawal",
    description: "Withdrawal to Bank",
    amount: -200,
    fee: 2.5,
    status: "pending",
    date: new Date("2024-03-12T16:45:00"),
    reference: "WTH-2024031216",
    method: "Bank Transfer",
  },
  {
    id: "TXN005",
    type: "trade",
    description: "Sell ETH/USD",
    amount: 320,
    fee: 0.32,
    status: "completed",
    date: new Date("2024-03-11T11:30:00"),
    reference: "TRD-2024031111",
  },
  {
    id: "TXN006",
    type: "bonus",
    description: "Welcome Bonus",
    amount: 50,
    fee: 0,
    status: "completed",
    date: new Date("2024-03-10T08:00:00"),
    reference: "BON-2024031008",
  },
  {
    id: "TXN007",
    type: "deposit",
    description: "Crypto Deposit - BTC",
    amount: 2500,
    fee: 0,
    status: "completed",
    date: new Date("2024-03-09T13:20:00"),
    reference: "DEP-2024030913",
    method: "Cryptocurrency",
  },
  {
    id: "TXN008",
    type: "withdrawal",
    description: "Withdrawal to Crypto Wallet",
    amount: -1000,
    fee: 5,
    status: "failed",
    date: new Date("2024-03-08T17:00:00"),
    reference: "WTH-2024030817",
    method: "Cryptocurrency",
  },
];

export default function TransactionsPage() {
  const { format } = useCurrency();
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesType = typeFilter === "all" || txn.type === typeFilter;
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalDeposits = transactions
    .filter((t) => t.type === "deposit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWithdrawals = Math.abs(
    transactions
      .filter((t) => t.type === "withdrawal" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);

  const typeIcons: Record<TransactionType, React.ElementType> = {
    deposit: ArrowDownToLine,
    withdrawal: ArrowUpFromLine,
    trade: ArrowUpDown,
    commission: TrendingUp,
    bonus: TrendingUp,
  };

  const typeColors: Record<TransactionType, string> = {
    deposit: "bg-green-500/20 text-green-500",
    withdrawal: "bg-red-500/20 text-red-500",
    trade: "bg-blue-500/20 text-blue-500",
    commission: "bg-amber-500/20 text-amber-500",
    bonus: "bg-purple-500/20 text-purple-500",
  };

  const statusColors: Record<TransactionStatus, string> = {
    completed: "bg-green-500/20 text-green-500",
    pending: "bg-yellow-500/20 text-yellow-500",
    failed: "bg-red-500/20 text-red-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">
            View all your account transactions
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-2xl font-bold text-green-500">{format(totalDeposits)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <ArrowDownToLine className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                <p className="text-2xl font-bold text-red-500">{format(totalWithdrawals)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <ArrowUpFromLine className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Fees Paid</p>
                <p className="text-2xl font-bold">{format(totalFees)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by description or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="trade">Trades</SelectItem>
                <SelectItem value="commission">Commissions</SelectItem>
                <SelectItem value="bonus">Bonuses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="space-y-3">
              {filteredTransactions.map((txn) => {
                const Icon = typeIcons[txn.type];
                const isPositive = txn.amount > 0;
                return (
                  <div
                    key={txn.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${typeColors[txn.type]}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{txn.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatDate(txn.date, "MMM d, yyyy h:mm a")}</span>
                          <span>•</span>
                          <span className="font-mono">{txn.reference}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            isPositive ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {format(txn.amount)}
                        </p>
                        {txn.fee > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Fee: {format(txn.fee)}
                          </p>
                        )}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[txn.status]}`}
                      >
                        {txn.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <ArrowUpDown className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No transactions found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
