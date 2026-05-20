"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CurrencySwitcher } from "@/components/layout/currency-switcher";
import { useAuth } from "@/lib/context/AuthContext";

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
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
