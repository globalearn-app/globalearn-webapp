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
  FileCheck,
  Download,
  User,
  FileText,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface KYCRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  documentType: "passport" | "national_id" | "drivers_license";
  documentNumber: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  status: "pending" | "under_review" | "approved" | "rejected";
  submittedAt: string;
  documents: {
    front: string;
    back?: string;
    selfie: string;
  };
}

export default function AdminKYCPage() {
  const [requests, setRequests] = useState<KYCRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<KYCRequest | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 10;

  useEffect(() => {
    // Mock data
    const mockRequests: KYCRequest[] = [
      {
        id: "1",
        userId: "u1",
        userEmail: "john.doe@email.com",
        userName: "John Doe",
        documentType: "passport",
        documentNumber: "AB1234567",
        nationality: "United States",
        dateOfBirth: "1990-05-15",
        address: "123 Main St, New York, NY 10001",
        status: "pending",
        submittedAt: "2024-01-20 14:32",
        documents: {
          front: "/documents/passport-front.jpg",
          selfie: "/documents/selfie.jpg",
        },
      },
      {
        id: "2",
        userId: "u2",
        userEmail: "jane.smith@email.com",
        userName: "Jane Smith",
        documentType: "national_id",
        documentNumber: "ID98765432",
        nationality: "United Kingdom",
        dateOfBirth: "1985-11-22",
        address: "45 Oxford Street, London, UK",
        status: "under_review",
        submittedAt: "2024-01-19 10:15",
        documents: {
          front: "/documents/id-front.jpg",
          back: "/documents/id-back.jpg",
          selfie: "/documents/selfie.jpg",
        },
      },
      {
        id: "3",
        userId: "u3",
        userEmail: "mike.wilson@email.com",
        userName: "Mike Wilson",
        documentType: "drivers_license",
        documentNumber: "DL456789",
        nationality: "Canada",
        dateOfBirth: "1992-03-08",
        address: "789 Queen St, Toronto, ON, Canada",
        status: "approved",
        submittedAt: "2024-01-18 16:45",
        documents: {
          front: "/documents/dl-front.jpg",
          back: "/documents/dl-back.jpg",
          selfie: "/documents/selfie.jpg",
        },
      },
      {
        id: "4",
        userId: "u4",
        userEmail: "sarah.jones@email.com",
        userName: "Sarah Jones",
        documentType: "passport",
        documentNumber: "PA7891234",
        nationality: "Australia",
        dateOfBirth: "1988-07-30",
        address: "56 Sydney Rd, Melbourne, VIC, Australia",
        status: "rejected",
        submittedAt: "2024-01-17 09:20",
        documents: {
          front: "/documents/passport-front.jpg",
          selfie: "/documents/selfie.jpg",
        },
      },
      {
        id: "5",
        userId: "u5",
        userEmail: "tom.brown@email.com",
        userName: "Tom Brown",
        documentType: "national_id",
        documentNumber: "NID123456",
        nationality: "Nigeria",
        dateOfBirth: "1995-12-01",
        address: "12 Lagos St, Lagos, Nigeria",
        status: "pending",
        submittedAt: "2024-01-20 08:55",
        documents: {
          front: "/documents/id-front.jpg",
          back: "/documents/id-back.jpg",
          selfie: "/documents/selfie.jpg",
        },
      },
    ];
    setRequests(mockRequests);
  }, []);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );

  const handleViewRequest = (request: KYCRequest) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (requestId: string, newStatus: KYCRequest["status"]) => {
    setRequests(requests.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r)));
    setIsViewDialogOpen(false);
    setIsRejectDialogOpen(false);
  };

  const handleReject = () => {
    if (selectedRequest) {
      handleUpdateStatus(selectedRequest.id, "rejected");
      setRejectReason("");
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const reviewCount = requests.filter((r) => r.status === "under_review").length;

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "passport":
        return "Passport";
      case "national_id":
        return "National ID";
      case "drivers_license":
        return "Driver's License";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">KYC Verification</h1>
        <p className="text-muted-foreground">
          Review and verify user identity documents
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="border-yellow-500/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl font-bold">{reviewCount}</p>
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
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle>KYC Requests ({filteredRequests.length})</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Document</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nationality</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Submitted</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((request) => (
                  <tr key={request.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{request.userName}</p>
                        <p className="text-sm text-muted-foreground">{request.userEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium">{getDocumentTypeLabel(request.documentType)}</p>
                      <p className="text-sm text-muted-foreground">{request.documentNumber}</p>
                    </td>
                    <td className="py-4 px-4">{request.nationality}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === "approved"
                            ? "bg-green-500/20 text-green-500"
                            : request.status === "rejected"
                            ? "bg-red-500/20 text-red-500"
                            : request.status === "under_review"
                            ? "bg-blue-500/20 text-blue-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {request.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{request.submittedAt}</td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewRequest(request)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Review Documents
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {(request.status === "pending" || request.status === "under_review") && (
                            <>
                              {request.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleUpdateStatus(request.id, "under_review")}>
                                  <Eye className="h-4 w-4 mr-2 text-blue-500" />
                                  Mark Under Review
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleUpdateStatus(request.id, "approved")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setIsRejectDialogOpen(true);
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                            </>
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
                Showing {(currentPage - 1) * requestsPerPage + 1} to{" "}
                {Math.min(currentPage * requestsPerPage, filteredRequests.length)} of{" "}
                {filteredRequests.length} requests
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

      {/* View KYC Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>KYC Review</DialogTitle>
            <DialogDescription>
              Review submitted documents and verify user identity
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="info">
                  <User className="h-4 w-4 mr-2" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Full Name</Label>
                    <p className="font-medium">{selectedRequest.userName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedRequest.userEmail}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Date of Birth</Label>
                    <p className="font-medium">{selectedRequest.dateOfBirth}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Nationality</Label>
                    <p className="font-medium">{selectedRequest.nationality}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Document Type</Label>
                    <p className="font-medium">{getDocumentTypeLabel(selectedRequest.documentType)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Document Number</Label>
                    <p className="font-medium">{selectedRequest.documentNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="font-medium">{selectedRequest.address}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Submitted</Label>
                    <p className="font-medium">{selectedRequest.submittedAt}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <p className="font-medium capitalize">{selectedRequest.status.replace("_", " ")}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Document Front</Label>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="h-48 rounded-lg bg-secondary/50 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                  
                  {selectedRequest.documents.back && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Document Back</Label>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="h-48 rounded-lg bg-secondary/50 flex items-center justify-center">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Selfie with Document</Label>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="h-48 rounded-lg bg-secondary/50 flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            {selectedRequest && (selectedRequest.status === "pending" || selectedRequest.status === "under_review") && (
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
                  onClick={() => handleUpdateStatus(selectedRequest.id, "approved")}
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
            <DialogTitle>Reject KYC Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this KYC application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for Rejection</Label>
              <Textarea
                placeholder="Enter the reason for rejecting this application..."
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
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
