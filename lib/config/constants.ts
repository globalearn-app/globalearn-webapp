export const SUPPORTED_CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
  { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
] as const;

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "zh", name: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
] as const;

export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]["code"];
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export const CONTACT_INFO = {
  whatsapp: "+2347026328785",
  email: "globalearnbrokerage@gmail.com",
  brandName: "Global Earn",
} as const;

export const TRADING_PRODUCTS = [
  {
    id: "crypto",
    name: "Cryptocurrencies",
    description: "Trade Bitcoin, Ethereum, and 100+ altcoins",
    icon: "Bitcoin",
    pairs: ["BTC/USDT", "ETH/USDT", "BNB/USDT", "XRP/USDT"],
  },
  {
    id: "forex",
    name: "Forex",
    description: "Major and minor currency pairs with tight spreads",
    icon: "DollarSign",
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"],
  },
  {
    id: "stocks",
    name: "Stocks & ETFs",
    description: "Trade top global stocks and ETFs",
    icon: "TrendingUp",
    pairs: ["AAPL", "TSLA", "GOOGL", "AMZN"],
  },
  {
    id: "commodities",
    name: "Commodities",
    description: "Gold, silver, oil, and agricultural products",
    icon: "Gem",
    pairs: ["XAU/USD", "XAG/USD", "WTI/USD", "BRENT/USD"],
  },
  {
    id: "indices",
    name: "Indices",
    description: "Trade major global market indices",
    icon: "BarChart3",
    pairs: ["S&P 500", "NASDAQ", "DOW", "FTSE 100"],
  },
] as const;
