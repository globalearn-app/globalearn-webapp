"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export function MarketTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/markets");
        const data = await res.json();
        if (data.success) {
          setPrices(data.data.slice(0, 10));
        }
      } catch {
        setPrices([
          { id: "bitcoin", symbol: "BTC", name: "Bitcoin", price: 67542, change24h: 2.34 },
          { id: "ethereum", symbol: "ETH", name: "Ethereum", price: 3456.78, change24h: 1.89 },
          { id: "binancecoin", symbol: "BNB", name: "BNB", price: 598.45, change24h: 0.76 },
          { id: "solana", symbol: "SOL", name: "Solana", price: 178.92, change24h: 4.56 },
          { id: "ripple", symbol: "XRP", name: "XRP", price: 0.5234, change24h: -1.23 },
          { id: "cardano", symbol: "ADA", name: "Cardano", price: 0.4567, change24h: 1.45 },
        ]);
      }
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  if (prices.length === 0) {
    return (
      <div className="bg-secondary/50 border-b border-border h-10 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading market data...</span>
      </div>
    );
  }

  const tickerContent = (
    <>
      {prices.map((coin) => (
        <div
          key={coin.id}
          className="flex items-center gap-2 px-6 text-sm whitespace-nowrap"
        >
          <span className="font-semibold text-foreground">{coin.symbol}</span>
          <span className="text-muted-foreground">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span
            className={`flex items-center gap-1 ${
              coin.change24h >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {coin.change24h >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(coin.change24h).toFixed(2)}%
          </span>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-secondary/50 border-b border-border overflow-hidden">
      <div className="flex animate-ticker">
        <div className="flex py-2">
          {tickerContent}
          {tickerContent}
        </div>
      </div>
    </div>
  );
}
