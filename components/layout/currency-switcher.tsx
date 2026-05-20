"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { SUPPORTED_CURRENCIES } from "@/lib/config/constants";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const currentCurrency = SUPPORTED_CURRENCIES.find((c) => c.code === currency);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-sm">
          <span className="font-medium">{currentCurrency?.symbol}</span>
          <span className="hidden sm:inline">{currency}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        {SUPPORTED_CURRENCIES.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className={currency === curr.code ? "bg-primary/10" : ""}
          >
            <span className="mr-2 font-medium">{curr.symbol}</span>
            <span>{curr.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
