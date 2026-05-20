"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface Deposit {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  method: "BTC" | "ETH" | "USDT" | "Bank" | "Card";
  amount: number;
  amountUSD: number;
  status: "pending" | "confirmed" | "completed" | "rejected";
  txHash?: string;
  createdAt: string;
}

export default function AdminDepositsPage() {
  const { format } = useCurrency();
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const depositsPerPage = 10;

  useEffect(() => {
    // Mock data
    const mockDeposits: Deposit[] = [
      {
        id: "1",
        userId: "u1",
        userEmail: "john.doe@email.com",
        userName: "John Doe",
        method: "BTC",
        amount: 0.15,
        amountUSD: 10125,
        status: "completed",
        txHash: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        createdAt: "2024-01-20 14:32",
      },
      {
        id: "2",
        userId: "u2",
        userEmail: "jane.smith@email.com",
        userName: "Jane Smith",
        method: "ETH",
        amount: 2.5,
        amountUSD: 8642,
        status: "pending",
        txHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        createdAt: "2024-01-20 12:15",
      },
      {
        id: "3",
        userId: "u3",
        userEmail: "mike.wilson@email.com",
        userName: "Mike Wilson",
        method: "Bank",
        amount: 5000,
        amountUSD: 5000,
        status: "confirmed",
        createdAt: "2024-01-19 18:45",
      },
      {
        id: "4",
        userId: "u4",
        userEmail: "sarah.jones@email.com",
        userName: "Sarah Jones",
        method: "USDT",
        amount: 15000,
        amountUSD: 15000,
        status: "completed",
        txHash: "TN9HbFFVJBm7mFTvT9xVMRGsNrxcmfTuWK",
        createdAt: "2024-01-19 10:20",
      },
      {
        id: "5",
        userId: "u5",
        userEmail: "tom.brown@email.com",
        userName: "Tom Brown",
        method: "Card",
        amount: 1000,
        amountUSD: 1000,
        status: "rejected",
        createdAt: "2024-01-18 16:30",
      },
    ];
    setDeposits(mockDeposits);
  }, []);

  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch =
      deposit.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.txHash?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || deposit.status === statusFilter;
    const matchesMethod = methodFilter === "all" || deposit.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredDeposits.length / depositsPerPage);
  const paginatedDeposits = filteredDeposits.slice(
    (currentPage - 1) * depositsPerPage,
    currentPage * depositsPerPage
  );

  const handleViewDeposit = (deposit: Deposit) => {
    setSelectedDeposit(deposit);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (depositId: string, newStatus: Deposit["status"]) => {
    setDeposits(deposits.map((d) => (d.id === depositId ? { ...d, status: newStatus } : d)));
    setIsViewDialogOpen(false);
  };

  const totalPending = deposits.filter((d) => d.status === "pending").length;
  const totalCompleted = deposits.filter((d) => d.status === "completed").reduce((sum, d) => sum + d.amountUSD, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deposit Management</h1>
        <p className="text-muted-foreground">
          Review and manage user deposits
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <ArrowDownToLine className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Deposits</p>
                <p className="text-2xl font-bold">{totalPending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Completed</p>
                <p className="text-2xl font-bold">{format(totalCompleted)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <ArrowDownToLine className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Deposits</p>
                <p className="text-2xl font-bold">{format(18767)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle>All Deposits ({filteredDeposits.length})</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deposits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="BTC">Bitcoin</SelectItem>
                  <SelectItem value="ETH">Ethereum</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDeposits.map((deposit) => (
                  <tr key={deposit.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{deposit.userName}</p>
                        <p className="text-sm text-muted-foreground">{deposit.userEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary">
                        {deposit.method}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-green-500">+{format(deposit.amountUSD)}</p>
                      {deposit.method !== "Bank" && deposit.method !== "Card" && (
                        <p className="text-xs text-muted-foreground">
                          {deposit.amount} {deposit.method}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          deposit.status === "completed"
                            ? "bg-green-500/20 text-green-500"
                            : deposit.status === "rejected"
                            ? "bg-red-500/20 text-red-500"
                            : deposit.status === "confirmed"
                            ? "bg-blue-500/20 text-blue-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {deposit.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{deposit.createdAt}</td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDeposit(deposit)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {deposit.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(deposit.id, "confirmed")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                                Mark Confirmed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(deposit.id, "completed")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Mark Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(deposit.id, "rejected")}>
                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                Reject Deposit
                              </DropdownMenuItem>
                            </>
                          )}
                          {deposit.status === "confirmed" && (
                            <DropdownMenuItem onClick={() => handleUpdateStatus(deposit.id, "completed")}>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              Mark Completed
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * depositsPerPage + 1} to{" "}
                {Math.min(currentPage * depositsPerPage, filteredDeposits.length)} of{" "}
                {filteredDeposits.length} deposits
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Deposit Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Deposit Details</DialogTitle>
            <DialogDescription>
              Complete information about this deposit
            </DialogDescription>
          </DialogHeader>
          {selectedDeposit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">User</Label>
                  <p className="font-medium">{selectedDeposit.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedDeposit.userEmail}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-medium text-green-500">{format(selectedDeposit.amountUSD)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Method</Label>
                  <p className="font-medium">{selectedDeposit.method}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium capitalize">{selectedDeposit.status}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">{selectedDeposit.createdAt}</p>
                </div>
                {selectedDeposit.txHash && (
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Transaction Hash</Label>
                    <p className="font-mono text-sm break-all">{selectedDeposit.txHash}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedDeposit?.status === "pending" && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleUpdateStatus(selectedDeposit.id, "rejected")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleUpdateStatus(selectedDeposit.id, "completed")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
