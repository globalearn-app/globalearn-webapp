"use client";

import { MessageCircle, Mail } from "lucide-react";
import { CONTACT_INFO } from "@/lib/config/constants";

export function FloatingContact() {
  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=Hello, I need assistance with Global Earn`;
  const emailLink = `mailto:${CONTACT_INFO.email}?subject=Support Request`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Email Button */}
      <a
        href={emailLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contact via Email"
      >
        <Mail className="h-6 w-6 text-white" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Email Us
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
