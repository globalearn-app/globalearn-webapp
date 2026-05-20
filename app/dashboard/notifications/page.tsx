"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  DollarSign,
  TrendingUp,
  Shield,
  AlertCircle,
  Info,
  Gift,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  type: "deposit" | "withdrawal" | "trade" | "security" | "system" | "promo";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "deposit",
    title: "Deposit Confirmed",
    message: "Your deposit of $500.00 has been confirmed and added to your wallet.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "trade",
    title: "Trade Executed",
    message: "Your BTC/USD trade has been successfully executed at $67,542.00",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "security",
    title: "New Login Detected",
    message: "A new login was detected from Chrome on Windows in New York, USA",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Account Upgraded",
    message: "Congratulations! Your account has been upgraded to Gold plan.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "withdrawal",
    title: "Withdrawal Processing",
    message: "Your withdrawal request of $200.00 is being processed.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "promo",
    title: "Special Offer!",
    message: "Get 10% bonus on deposits over $1,000 this weekend only!",
    time: "3 days ago",
    read: true,
  },
  {
    id: "7",
    type: "trade",
    title: "Daily Profit Credited",
    message: "Your daily profit of $45.50 has been credited to your account.",
    time: "4 days ago",
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "deposit":
      return { icon: DollarSign, color: "text-green-500 bg-green-500/20" };
    case "withdrawal":
      return { icon: DollarSign, color: "text-blue-500 bg-blue-500/20" };
    case "trade":
      return { icon: TrendingUp, color: "text-orange-500 bg-orange-500/20" };
    case "security":
      return { icon: Shield, color: "text-red-500 bg-red-500/20" };
    case "system":
      return { icon: Info, color: "text-primary bg-primary/20" };
    case "promo":
      return { icon: Gift, color: "text-purple-500 bg-purple-500/20" };
    default:
      return { icon: Bell, color: "text-muted-foreground bg-secondary" };
  }
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filteredNotifs =
    activeTab === "all"
      ? notifs
      : activeTab === "unread"
      ? notifs.filter((n) => !n.read)
      : notifs.filter((n) => n.type === activeTab);

  const markAsRead = (id: string) => {
    setNotifs(
      notifs.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifs([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="default">{unreadCount} new</Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Stay updated with your account activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all read
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger value="trade">Trades</TabsTrigger>
          <TabsTrigger value="deposit">Deposits</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredNotifs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You&apos;re all caught up! Check back later for updates.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifs.map((notification) => {
                const { icon: Icon, color } = getNotificationIcon(notification.type);
                return (
                  <Card
                    key={notification.id}
                    className={`transition-colors ${
                      !notification.read
                        ? "bg-primary/5 border-primary/30"
                        : "hover:bg-secondary/30"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium flex items-center gap-2">
                                {notification.title}
                                {!notification.read && (
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                )}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {notification.time}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
