export const TRADING_TIERS = [
  {
    id: 1,
    name: "Starter",
    minInvestment: 100,
    maxInvestment: 299,
    dailyProfit: 2.5,
    duration: 7,
    features: ["Basic trading", "Email support"],
    color: "from-slate-500 to-slate-600",
    icon: "Sprout",
  },
  {
    id: 2,
    name: "Bronze",
    minInvestment: 300,
    maxInvestment: 499,
    dailyProfit: 3.5,
    duration: 14,
    features: ["Priority support", "Basic signals", "All Starter features"],
    color: "from-amber-600 to-amber-700",
    icon: "Medal",
  },
  {
    id: 3,
    name: "Silver",
    minInvestment: 500,
    maxInvestment: 999,
    dailyProfit: 4.5,
    duration: 21,
    features: [
      "Personal account manager",
      "Pro signals",
      "All Bronze features",
    ],
    color: "from-gray-400 to-gray-500",
    icon: "Award",
  },
  {
    id: 4,
    name: "Gold",
    minInvestment: 1000,
    maxInvestment: 2999,
    dailyProfit: 5.5,
    duration: 30,
    features: [
      "VIP support",
      "Premium signals",
      "Faster withdrawals",
      "All Silver features",
    ],
    color: "from-yellow-500 to-yellow-600",
    icon: "Crown",
  },
  {
    id: 5,
    name: "Platinum",
    minInvestment: 3000,
    maxInvestment: 4999,
    dailyProfit: 6.5,
    duration: 45,
    features: [
      "Dedicated manager",
      "Exclusive signals",
      "Insurance coverage",
      "All Gold features",
    ],
    color: "from-cyan-500 to-cyan-600",
    icon: "Gem",
  },
  {
    id: 6,
    name: "Diamond",
    minInvestment: 5000,
    maxInvestment: null,
    dailyProfit: 8.0,
    duration: 60,
    features: [
      "Concierge service",
      "Custom strategies",
      "Full insurance",
      "All Platinum features",
    ],
    color: "from-purple-500 to-purple-600",
    icon: "Diamond",
  },
] as const;

export type TradingTier = (typeof TRADING_TIERS)[number];

export function getTierById(id: number): TradingTier | undefined {
  return TRADING_TIERS.find((tier) => tier.id === id);
}

export function getTierByInvestment(amount: number): TradingTier {
  for (let i = TRADING_TIERS.length - 1; i >= 0; i--) {
    if (amount >= TRADING_TIERS[i].minInvestment) {
      return TRADING_TIERS[i];
    }
  }
  return TRADING_TIERS[0];
}
