"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  SUPPORTED_CURRENCIES,
  CurrencyCode,
} from "@/lib/config/constants";

interface ExchangeRates {
  USD: number;
  EUR: number;
  GBP: number;
  INR: number;
}

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  rates: ExchangeRates;
  convert: (amount: number, from?: CurrencyCode) => number;
  format: (amount: number, from?: CurrencyCode) => string;
  isLoading: boolean;
}

const defaultRates: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<ExchangeRates>(defaultRates);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("preferredCurrency") as CurrencyCode;
    if (stored && SUPPORTED_CURRENCIES.some((c) => c.code === stored)) {
      setCurrencyState(stored);
    }
  }, []);

  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        if (res.ok) {
          const data = await res.json();
          setRates({
            USD: 1,
            EUR: data.rates.EUR || defaultRates.EUR,
            GBP: data.rates.GBP || defaultRates.GBP,
            INR: data.rates.INR || defaultRates.INR,
          });
        }
      } catch {
        console.log("[v0] Using default exchange rates");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRates();
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("preferredCurrency", newCurrency);
  };

  const convert = (amount: number, from: CurrencyCode = "USD"): number => {
    const inUSD = from === "USD" ? amount : amount / rates[from];
    return inUSD * rates[currency];
  };

  const format = (amount: number, from: CurrencyCode = "USD"): string => {
    const converted = convert(amount, from);
    const currencyInfo = SUPPORTED_CURRENCIES.find((c) => c.code === currency);
    return new Intl.NumberFormat(currencyInfo?.locale || "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, rates, convert, format, isLoading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
