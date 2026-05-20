"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SUPPORTED_LANGUAGES, LanguageCode } from "@/lib/config/constants";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.markets": "Markets",
    "nav.trading": "Trading",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Get Started",
    "nav.dashboard": "Dashboard",
    "hero.title": "Trade Crypto & Stocks with Confidence",
    "hero.subtitle":
      "Join thousands of traders earning daily profits with our advanced trading platform",
    "hero.cta": "Start Trading Now",
    "hero.secondary": "View Markets",
    "why.title": "Why Trade with Global Earn",
    "why.security": "Bank-Grade Security",
    "why.security.desc":
      "Your funds are protected with industry-leading security measures",
    "why.support": "24/7 Expert Support",
    "why.support.desc":
      "Our team of experts is always available to help you succeed",
    "why.profits": "Daily Profit Returns",
    "why.profits.desc":
      "Earn up to 8% daily returns based on your investment tier",
    "why.fast": "Fast Withdrawals",
    "why.fast.desc": "Process withdrawals within 24 hours, guaranteed",
    "why.regulated": "Fully Regulated",
    "why.regulated.desc": "Licensed and regulated for your peace of mind",
    "why.global": "Global Access",
    "why.global.desc": "Trade from anywhere with our mobile-friendly platform",
    "tiers.title": "Investment Tiers",
    "tiers.subtitle": "Choose the plan that fits your investment goals",
    "products.title": "Trading Products",
    "products.subtitle": "Diverse markets at your fingertips",
    "testimonials.title": "What Our Traders Say",
    "faq.title": "Frequently Asked Questions",
    "cta.title": "Ready to Start Earning?",
    "cta.subtitle": "Join over 50,000 traders worldwide",
    "cta.button": "Create Free Account",
    "support.title": "Need Help?",
    "support.subtitle": "Our support team is here for you 24/7",
    "risk.title": "Risk Disclosure",
    "footer.rights": "All rights reserved",
  },
  es: {
    "nav.home": "Inicio",
    "nav.markets": "Mercados",
    "nav.trading": "Comercio",
    "nav.about": "Acerca de",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Comenzar",
    "nav.dashboard": "Panel",
    "hero.title": "Opera Cripto y Acciones con Confianza",
    "hero.subtitle":
      "Únete a miles de traders que ganan beneficios diarios con nuestra plataforma avanzada",
    "hero.cta": "Comenzar a Operar",
    "hero.secondary": "Ver Mercados",
    "why.title": "Por Qué Operar con Global Earn",
    "tiers.title": "Niveles de Inversión",
    "products.title": "Productos de Trading",
    "testimonials.title": "Lo Que Dicen Nuestros Traders",
    "faq.title": "Preguntas Frecuentes",
    "cta.title": "¿Listo para Comenzar a Ganar?",
    "support.title": "¿Necesitas Ayuda?",
    "risk.title": "Divulgación de Riesgos",
    "footer.rights": "Todos los derechos reservados",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.markets": "Marchés",
    "nav.trading": "Trading",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.register": "Commencer",
    "hero.title": "Tradez Crypto et Actions en Toute Confiance",
    "hero.cta": "Commencer à Trader",
    "why.title": "Pourquoi Trader avec Global Earn",
    "tiers.title": "Niveaux d'Investissement",
    "products.title": "Produits de Trading",
    "testimonials.title": "Ce Que Disent Nos Traders",
    "faq.title": "Questions Fréquentes",
    "cta.title": "Prêt à Commencer à Gagner?",
    "support.title": "Besoin d'Aide?",
    "risk.title": "Avertissement sur les Risques",
    "footer.rights": "Tous droits réservés",
  },
  de: {
    "nav.home": "Startseite",
    "nav.markets": "Märkte",
    "nav.trading": "Handel",
    "nav.about": "Über Uns",
    "nav.contact": "Kontakt",
    "nav.login": "Anmelden",
    "nav.register": "Loslegen",
    "hero.title": "Handeln Sie Krypto & Aktien mit Vertrauen",
    "hero.cta": "Jetzt Handeln",
    "why.title": "Warum mit Global Earn Handeln",
    "tiers.title": "Investitionsstufen",
    "products.title": "Handelsprodukte",
    "testimonials.title": "Was Unsere Trader Sagen",
    "faq.title": "Häufig Gestellte Fragen",
    "cta.title": "Bereit zum Verdienen?",
    "support.title": "Brauchen Sie Hilfe?",
    "risk.title": "Risikohinweis",
    "footer.rights": "Alle Rechte vorbehalten",
  },
  zh: {
    "nav.home": "首页",
    "nav.markets": "市场",
    "nav.trading": "交易",
    "nav.about": "关于我们",
    "nav.contact": "联系我们",
    "nav.login": "登录",
    "nav.register": "开始",
    "hero.title": "自信交易加密货币和股票",
    "hero.cta": "立即开始交易",
    "why.title": "为什么选择Global Earn",
    "tiers.title": "投资等级",
    "products.title": "交易产品",
    "testimonials.title": "交易者反馈",
    "faq.title": "常见问题",
    "cta.title": "准备开始赚钱了吗?",
    "support.title": "需要帮助?",
    "risk.title": "风险披露",
    "footer.rights": "版权所有",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.markets": "الأسواق",
    "nav.trading": "التداول",
    "nav.about": "معلومات عنا",
    "nav.contact": "اتصل بنا",
    "nav.login": "تسجيل الدخول",
    "nav.register": "ابدأ",
    "hero.title": "تداول العملات المشفرة والأسهم بثقة",
    "hero.cta": "ابدأ التداول الآن",
    "why.title": "لماذا التداول مع Global Earn",
    "tiers.title": "مستويات الاستثمار",
    "products.title": "منتجات التداول",
    "testimonials.title": "ماذا يقول المتداولون",
    "faq.title": "الأسئلة الشائعة",
    "cta.title": "هل أنت مستعد لبدء الربح؟",
    "support.title": "تحتاج مساعدة؟",
    "risk.title": "إفصاح المخاطر",
    "footer.rights": "جميع الحقوق محفوظة",
  },
  hi: {
    "nav.home": "होम",
    "nav.markets": "बाज़ार",
    "nav.trading": "ट्रेडिंग",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.login": "लॉग इन",
    "nav.register": "शुरू करें",
    "hero.title": "विश्वास के साथ क्रिप्टो और स्टॉक ट्रेड करें",
    "hero.cta": "अभी ट्रेडिंग शुरू करें",
    "why.title": "Global Earn के साथ क्यों ट्रेड करें",
    "tiers.title": "निवेश स्तर",
    "products.title": "ट्रेडिंग उत्पाद",
    "testimonials.title": "हमारे ट्रेडर्स क्या कहते हैं",
    "faq.title": "अक्सर पूछे जाने वाले प्रश्न",
    "cta.title": "कमाई शुरू करने के लिए तैयार?",
    "support.title": "मदद चाहिए?",
    "risk.title": "जोखिम प्रकटीकरण",
    "footer.rights": "सर्वाधिकार सुरक्षित",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem("preferredLanguage") as LanguageCode;
    if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
    localStorage.setItem("preferredLanguage", newLanguage);
    const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === newLanguage);
    document.documentElement.dir = langInfo?.dir || "ltr";
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  const langInfo = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const dir = langInfo?.dir || "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
