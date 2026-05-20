"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, X, CheckCircle } from "lucide-react";

interface TradeNotification {
  id: string;
  username: string;
  amount: number;
  profit: number;
  plan: string;
  country: string;
  countryCode: string;
}

const countries = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "Japan", code: "JP" },
  { name: "Brazil", code: "BR" },
  { name: "India", code: "IN" },
  { name: "Singapore", code: "SG" },
  { name: "Netherlands", code: "NL" },
  { name: "Switzerland", code: "CH" },
  { name: "Spain", code: "ES" },
  { name: "Italy", code: "IT" },
  { name: "South Korea", code: "KR" },
  { name: "Mexico", code: "MX" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "South Africa", code: "ZA" },
  { name: "Nigeria", code: "NG" },
  { name: "Poland", code: "PL" },
];

const plans = ["Starter", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];

const firstNames = [
  "James", "Emma", "Michael", "Sophia", "William", "Olivia", "Alexander", "Isabella",
  "Daniel", "Mia", "David", "Charlotte", "Joseph", "Amelia", "Samuel", "Harper",
  "Benjamin", "Evelyn", "Lucas", "Abigail", "Henry", "Emily", "Sebastian", "Elizabeth",
  "Jack", "Sofia", "Aiden", "Avery", "Owen", "Ella", "Mohammed", "Li", "Wei", "Yuki",
  "Carlos", "Maria", "Hans", "Pierre", "Ahmed", "Fatima", "Raj", "Priya"
];

function generateRandomTrade(): TradeNotification {
  const country = countries[Math.floor(Math.random() * countries.length)];
  const plan = plans[Math.floor(Math.random() * plans.length)];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastInitial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
  // Generate realistic amounts based on plan
  const planAmounts: Record<string, { min: number; max: number; profitRate: number }> = {
    Starter: { min: 100, max: 299, profitRate: 0.025 },
    Bronze: { min: 300, max: 499, profitRate: 0.035 },
    Silver: { min: 500, max: 999, profitRate: 0.045 },
    Gold: { min: 1000, max: 2999, profitRate: 0.055 },
    Platinum: { min: 3000, max: 4999, profitRate: 0.065 },
    Diamond: { min: 5000, max: 15000, profitRate: 0.08 },
  };

  const { min, max, profitRate } = planAmounts[plan];
  const amount = Math.floor(Math.random() * (max - min + 1)) + min;
  const profit = parseFloat((amount * profitRate).toFixed(2));

  return {
    id: Math.random().toString(36).substring(7),
    username: `${firstName} ${lastInitial}.`,
    amount,
    profit,
    plan,
    country: country.name,
    countryCode: country.code,
  };
}

interface TradeNotificationPopupProps {
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  interval?: number;
  maxVisible?: number;
}

export function TradeNotificationPopup({
  position = "bottom-left",
  interval = 5000,
  maxVisible = 1,
}: TradeNotificationPopupProps) {
  const [notifications, setNotifications] = useState<TradeNotification[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const addNotification = useCallback(() => {
    const newTrade = generateRandomTrade();
    setNotifications((prev) => {
      const filtered = prev.filter((n) => !dismissed.has(n.id));
      return [newTrade, ...filtered].slice(0, maxVisible);
    });

    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newTrade.id));
    }, 8000);
  }, [dismissed, maxVisible]);

  useEffect(() => {
    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(addNotification, 3000);
    
    // Then show notifications at regular intervals
    const intervalId = setInterval(addNotification, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [addNotification, interval]);

  const dismissNotification = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const positionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-20 left-4",
    "top-right": "top-20 right-4",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 space-y-3`}>
      <AnimatePresence mode="popLayout">
        {notifications
          .filter((n) => !dismissed.has(n.id))
          .map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: position.includes("left") ? -100 : 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: position.includes("left") ? -100 : 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative bg-card border border-border rounded-lg shadow-lg p-4 min-w-[320px] max-w-[380px]"
            >
              {/* Close button */}
              <button
                onClick={() => dismissNotification(notification.id)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-secondary/80 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="flex items-start gap-3">
                {/* Success icon */}
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm truncate">
                      {notification.username}
                    </span>
                    <img
                      src={`https://flagcdn.com/w20/${notification.countryCode.toLowerCase()}.png`}
                      alt={notification.country}
                      className="h-4 w-auto rounded-sm"
                      loading="lazy"
                    />
                  </div>

                  {/* Trade details */}
                  <p className="text-sm text-muted-foreground mb-2">
                    Just earned{" "}
                    <span className="text-green-500 font-semibold">
                      ${notification.profit.toLocaleString()}
                    </span>{" "}
                    profit
                  </p>

                  {/* Plan & Amount */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground">
                        {notification.plan} Plan
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      ${notification.amount.toLocaleString()} invested
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-primary/50 rounded-b-lg"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
