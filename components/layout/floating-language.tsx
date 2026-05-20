"use client";

import { useState } from "react";
import { Globe, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/lib/config/constants";

export function FloatingLanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Language Options */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-card border border-border rounded-lg shadow-xl overflow-hidden mb-2 min-w-[160px]">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-secondary/50 transition-colors ${
                language === lang.code ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="h-12 px-4 rounded-full shadow-lg hover:shadow-xl transition-all bg-card gap-2"
      >
        <Globe className="h-4 w-4" />
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium">{currentLang?.code.toUpperCase()}</span>
        <ChevronUp
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>
    </div>
  );
}
