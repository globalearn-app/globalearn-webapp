"use client";

import { useEffect, useState } from "react";
import {
  Users,
  DollarSign,
  TrendingUp,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface Stats {
  totalUsers: number;
  activeUsers: number;
  pendingKYC: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingWithdrawals: number;
}

export default function AdminDashboard() {
  const { format } = useCurrency();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    pendingKYC: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
  });

  useEffect(() => {
    // In a real app, fetch from API
    setStats({
      totalUsers: 1250,
      activeUsers: 890,
      pendingKYC: 45,
      totalDeposits: 2450000,
      totalWithdrawals: 1850000,
      pendingWithdrawals: 12,
    });
  }, []);

  const recentActivity = [
    { type: "deposit", user: "john.doe@email.com", amount: 5000, status: "completed", time: "2 min ago" },
    { type: "withdrawal", user: "jane.smith@email.com", amount: 2500, status: "pending", time: "15 min ago" },
    { type: "kyc", user: "mike.wilson@email.com", amount: 0, status: "submitted", time: "1 hour ago" },
    { type: "registration", user: "sarah.jones@email.com", amount: 0, status: "new", time: "2 hours ago" },
    { type: "deposit", user: "tom.brown@email.com", amount: 10000, status: "completed", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of platform activity and statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4" />
                  +12% this month
                </div>
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
                <p className="text-sm text-muted-foreground">Total Deposits</p>
                <p className="text-2xl font-bold">{format(stats.totalDeposits)}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4" />
                  +8% this week
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                <p className="text-2xl font-bold">{format(stats.totalWithdrawals)}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  {stats.pendingWithdrawals} pending
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending KYC</p>
                <p className="text-2xl font-bold">{stats.pendingKYC}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Clock className="h-4 w-4" />
                  Requires review
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === "deposit"
                          ? "bg-green-500/20"
                          : activity.type === "withdrawal"
                          ? "bg-blue-500/20"
                          : activity.type === "kyc"
                          ? "bg-yellow-500/20"
                          : "bg-primary/20"
                      }`}
                    >
                      {activity.type === "deposit" && (
                        <ArrowDownRight className="h-5 w-5 text-green-500" />
                      )}
                      {activity.type === "withdrawal" && (
                        <ArrowUpRight className="h-5 w-5 text-blue-500" />
                      )}
                      {activity.type === "kyc" && (
                        <FileCheck className="h-5 w-5 text-yellow-500" />
                      )}
                      {activity.type === "registration" && (
                        <Users className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount > 0 && (
                      <p className={`font-bold ${activity.type === "deposit" ? "text-green-500" : ""}`}>
                        {activity.type === "deposit" ? "+" : "-"}{format(activity.amount)}
                      </p>
                    )}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        activity.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : activity.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : activity.status === "submitted"
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-primary/20 text-primary"
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

        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Users</span>
                <span className="font-medium">{stats.activeUsers}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(stats.activeUsers / stats.totalUsers) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total users
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">KYC Verified</span>
                <span className="font-medium">892</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "71%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">71% verification rate</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">System Load</span>
                <span className="font-medium">24%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "24%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Normal operation</p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-green-500">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">All systems operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
