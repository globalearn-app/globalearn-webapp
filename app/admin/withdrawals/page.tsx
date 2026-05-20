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
  ArrowUpFromLine,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface Withdrawal {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  method: "BTC" | "ETH" | "USDT" | "Bank";
  amount: number;
  fee: number;
  netAmount: number;
  walletAddress?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  status: "pending" | "processing" | "completed" | "rejected";
  createdAt: string;
}

export default function AdminWithdrawalsPage() {
  const { format } = useCurrency();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const withdrawalsPerPage = 10;

  useEffect(() => {
    // Mock data
    const mockWithdrawals: Withdrawal[] = [
      {
        id: "1",
        userId: "u1",
        userEmail: "john.doe@email.com",
        userName: "John Doe",
        method: "BTC",
        amount: 5000,
        fee: 50,
        netAmount: 4950,
        walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        status: "pending",
        createdAt: "2024-01-20 15:45",
      },
      {
        id: "2",
        userId: "u2",
        userEmail: "jane.smith@email.com",
        userName: "Jane Smith",
        method: "Bank",
        amount: 10000,
        fee: 25,
        netAmount: 9975,
        bankDetails: {
          bankName: "Chase Bank",
          accountNumber: "****4567",
          accountName: "Jane Smith",
        },
        status: "processing",
        createdAt: "2024-01-20 11:30",
      },
      {
        id: "3",
        userId: "u3",
        userEmail: "mike.wilson@email.com",
        userName: "Mike Wilson",
        method: "ETH",
        amount: 2500,
        fee: 25,
        netAmount: 2475,
        walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        status: "completed",
        createdAt: "2024-01-19 18:20",
      },
      {
        id: "4",
        userId: "u4",
        userEmail: "sarah.jones@email.com",
        userName: "Sarah Jones",
        method: "USDT",
        amount: 15000,
        fee: 150,
        netAmount: 14850,
        walletAddress: "TN9HbFFVJBm7mFTvT9xVMRGsNrxcmfTuWK",
        status: "pending",
        createdAt: "2024-01-19 14:15",
      },
      {
        id: "5",
        userId: "u5",
        userEmail: "tom.brown@email.com",
        userName: "Tom Brown",
        method: "Bank",
        amount: 500,
        fee: 25,
        netAmount: 475,
        bankDetails: {
          bankName: "Bank of America",
          accountNumber: "****8901",
          accountName: "Tom Brown",
        },
        status: "rejected",
        createdAt: "2024-01-18 09:10",
      },
    ];
    setWithdrawals(mockWithdrawals);
  }, []);

  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.walletAddress?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || withdrawal.status === statusFilter;
    const matchesMethod = methodFilter === "all" || withdrawal.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalPages = Math.ceil(filteredWithdrawals.length / withdrawalsPerPage);
  const paginatedWithdrawals = filteredWithdrawals.slice(
    (currentPage - 1) * withdrawalsPerPage,
    currentPage * withdrawalsPerPage
  );

  const handleViewWithdrawal = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (withdrawalId: string, newStatus: Withdrawal["status"]) => {
    setWithdrawals(withdrawals.map((w) => (w.id === withdrawalId ? { ...w, status: newStatus } : w)));
    setIsViewDialogOpen(false);
    setIsRejectDialogOpen(false);
  };

  const handleReject = () => {
    if (selectedWithdrawal) {
      handleUpdateStatus(selectedWithdrawal.id, "rejected");
      setRejectReason("");
    }
  };

  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending");
  const totalPendingAmount = pendingWithdrawals.reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Withdrawal Management</h1>
        <p className="text-muted-foreground">
          Review and process user withdrawal requests
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-yellow-500/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold">{pendingWithdrawals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold">{format(totalPendingAmount)}</p>
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
                <p className="text-sm text-muted-foreground">Processed Today</p>
                <p className="text-2xl font-bold">{format(12475)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle>All Withdrawals ({filteredWithdrawals.length})</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search withdrawals..."
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
                  <SelectItem value="processing">Processing</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Net</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{withdrawal.userName}</p>
                        <p className="text-sm text-muted-foreground">{withdrawal.userEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-secondary">
                        {withdrawal.method}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">{format(withdrawal.amount)}</td>
                    <td className="py-4 px-4">
                      <p className="font-medium">{format(withdrawal.netAmount)}</p>
                      <p className="text-xs text-muted-foreground">
                        Fee: {format(withdrawal.fee)}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          withdrawal.status === "completed"
                            ? "bg-green-500/20 text-green-500"
                            : withdrawal.status === "rejected"
                            ? "bg-red-500/20 text-red-500"
                            : withdrawal.status === "processing"
                            ? "bg-blue-500/20 text-blue-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {withdrawal.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{withdrawal.createdAt}</td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewWithdrawal(withdrawal)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {withdrawal.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(withdrawal.id, "processing")}>
                                <ArrowUpFromLine className="h-4 w-4 mr-2 text-blue-500" />
                                Mark Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(withdrawal.id, "completed")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Mark Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedWithdrawal(withdrawal);
                                  setIsRejectDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {withdrawal.status === "processing" && (
                            <DropdownMenuItem onClick={() => handleUpdateStatus(withdrawal.id, "completed")}>
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
                Showing {(currentPage - 1) * withdrawalsPerPage + 1} to{" "}
                {Math.min(currentPage * withdrawalsPerPage, filteredWithdrawals.length)} of{" "}
                {filteredWithdrawals.length} withdrawals
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

      {/* View Withdrawal Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Withdrawal Details</DialogTitle>
            <DialogDescription>
              Complete information about this withdrawal request
            </DialogDescription>
          </DialogHeader>
          {selectedWithdrawal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">User</Label>
                  <p className="font-medium">{selectedWithdrawal.userName}</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.userEmail}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Method</Label>
                  <p className="font-medium">{selectedWithdrawal.method}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="font-medium">{format(selectedWithdrawal.amount)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Net Amount</Label>
                  <p className="font-medium text-green-500">{format(selectedWithdrawal.netAmount)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Fee</Label>
                  <p className="font-medium">{format(selectedWithdrawal.fee)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium capitalize">{selectedWithdrawal.status}</p>
                </div>
              </div>
              
              {selectedWithdrawal.walletAddress && (
                <div>
                  <Label className="text-muted-foreground">Wallet Address</Label>
                  <p className="font-mono text-sm break-all bg-secondary/50 p-2 rounded mt-1">
                    {selectedWithdrawal.walletAddress}
                  </p>
                </div>
              )}
              
              {selectedWithdrawal.bankDetails && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Bank Details</Label>
                  <div className="bg-secondary/50 p-3 rounded space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Bank:</span>{" "}
                      {selectedWithdrawal.bankDetails.bankName}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Account:</span>{" "}
                      {selectedWithdrawal.bankDetails.accountNumber}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Name:</span>{" "}
                      {selectedWithdrawal.bankDetails.accountName}
                    </p>
                  </div>
                </div>
              )}
              
              <div>
                <Label className="text-muted-foreground">Request Date</Label>
                <p className="font-medium">{selectedWithdrawal.createdAt}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedWithdrawal?.status === "pending" && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    setIsRejectDialogOpen(true);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => handleUpdateStatus(selectedWithdrawal.id, "completed")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Withdrawal</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this withdrawal request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for Rejection</Label>
              <Textarea
                placeholder="Enter the reason for rejecting this withdrawal..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
