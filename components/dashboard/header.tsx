"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, Menu, X, LayoutDashboard, TrendingUp, Wallet, ArrowDownToLine, ArrowUpFromLine, FileCheck, User, Settings, LogOut, Copy, History, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CurrencySwitcher } from "@/components/layout/currency-switcher";
import { useAuth } from "@/lib/context/AuthContext";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const mobileLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Trading", href: "/dashboard/trading", icon: TrendingUp },
  { label: "Copy Trading", href: "/dashboard/copy-trading", icon: Copy },
  { label: "Wallets", href: "/dashboard/wallets", icon: Wallet },
  { label: "Deposits", href: "/dashboard/deposits", icon: ArrowDownToLine },
  { label: "Withdrawals", href: "/dashboard/withdrawals", icon: ArrowUpFromLine },
  { label: "Transactions", href: "/dashboard/transactions", icon: History },
  { label: "Referrals", href: "/dashboard/referrals", icon: Users },
  { label: "KYC Verification", href: "/dashboard/kyc", icon: FileCheck },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur border-b border-border px-4 lg:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-4 border-b border-border">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="font-bold text-primary-foreground">G</span>
                  </div>
                  <span className="font-bold text-lg">Global Earn</span>
                </Link>
              </div>

              {/* User Info */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                {mobileLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="p-2 border-t border-border">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile Logo */}
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="font-bold text-primary-foreground">G</span>
          </div>
        </Link>

        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search markets, transactions..."
            className="pl-10 bg-secondary/50 border-0"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <CurrencySwitcher />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
            3
          </span>
        </Button>

        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </span>
          </div>
          <span className="text-sm font-medium">{user?.firstName}</span>
        </div>
      </div>
    </header>
  );
}
