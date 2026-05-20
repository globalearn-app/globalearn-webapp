"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/context/AuthContext";
import { CurrencyProvider } from "@/lib/context/CurrencyContext";
import { LanguageProvider } from "@/lib/context/LanguageContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
