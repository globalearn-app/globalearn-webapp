"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  TrendingUp,
  DollarSign,
  Calendar,
  Star,
  Award,
  Zap,
  Gift,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCurrency } from "@/lib/context/CurrencyContext";

interface Milestone {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  target: number;
  current: number;
  unit: string;
  reward: string;
  completed: boolean;
  color: string;
}

interface MilestonesCardProps {
  totalDeposits: number;
  totalTrades: number;
  totalProfit: number;
  daysActive: number;
  currentTier: number;
}

export function MilestonesCard({
  totalDeposits = 2500,
  totalTrades = 15,
  totalProfit = 450,
  daysActive = 12,
  currentTier = 2,
}: MilestonesCardProps) {
  const { format } = useCurrency();

  const milestones: Milestone[] = [
    {
      id: 1,
      title: "First Deposit",
      description: "Make your first deposit",
      icon: DollarSign,
      target: 1,
      current: Math.min(totalDeposits > 0 ? 1 : 0, 1),
      unit: "deposit",
      reward: "Welcome Badge",
      completed: totalDeposits > 0,
      color: "from-green-500 to-green-600",
    },
    {
      id: 2,
      title: "Rising Investor",
      description: "Deposit a total of $1,000",
      icon: TrendingUp,
      target: 1000,
      current: Math.min(totalDeposits, 1000),
      unit: "USD",
      reward: "5% Bonus",
      completed: totalDeposits >= 1000,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      title: "Active Trader",
      description: "Complete 10 trades",
      icon: Zap,
      target: 10,
      current: Math.min(totalTrades, 10),
      unit: "trades",
      reward: "Trader Badge",
      completed: totalTrades >= 10,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: 4,
      title: "Profit Master",
      description: "Earn $500 in profits",
      icon: Trophy,
      target: 500,
      current: Math.min(totalProfit, 500),
      unit: "USD",
      reward: "Gold Badge",
      completed: totalProfit >= 500,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: 5,
      title: "Loyal Member",
      description: "Stay active for 30 days",
      icon: Calendar,
      target: 30,
      current: Math.min(daysActive, 30),
      unit: "days",
      reward: "Loyalty Bonus",
      completed: daysActive >= 30,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 6,
      title: "Elite Investor",
      description: "Reach Tier 4 or higher",
      icon: Award,
      target: 4,
      current: Math.min(currentTier, 4),
      unit: "tier",
      reward: "VIP Status",
      completed: currentTier >= 4,
      color: "from-primary to-primary/80",
    },
    {
      id: 7,
      title: "High Roller",
      description: "Deposit a total of $10,000",
      icon: Star,
      target: 10000,
      current: Math.min(totalDeposits, 10000),
      unit: "USD",
      reward: "Premium Badge",
      completed: totalDeposits >= 10000,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: 8,
      title: "Trading Veteran",
      description: "Complete 100 trades",
      icon: Target,
      target: 100,
      current: Math.min(totalTrades, 100),
      unit: "trades",
      reward: "Exclusive Rewards",
      completed: totalTrades >= 100,
      color: "from-rose-500 to-rose-600",
    },
  ];

  const completedCount = milestones.filter((m) => m.completed).length;
  const totalMilestones = milestones.length;
  const overallProgress = (completedCount / totalMilestones) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Your Milestones
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {completedCount}/{totalMilestones} Completed
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        {/* Milestones List */}
        <div className="grid gap-3">
          {milestones.map((milestone, index) => {
            const progress = (milestone.current / milestone.target) * 100;
            const Icon = milestone.icon;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex items-start gap-4 p-4 rounded-lg border transition-all ${
                  milestone.completed
                    ? "bg-primary/5 border-primary/30"
                    : "bg-secondary/30 border-border hover:border-primary/30"
                }`}
              >
                {/* Icon */}
                <div
                  className={`h-10 w-10 rounded-lg bg-gradient-to-br ${milestone.color} flex items-center justify-center flex-shrink-0 ${
                    milestone.completed ? "" : "opacity-60"
                  }`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{milestone.title}</h4>
                    {milestone.completed && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {milestone.description}
                  </p>

                  {/* Progress Bar */}
                  {!milestone.completed && (
                    <div className="space-y-1">
                      <Progress value={progress} className="h-1.5" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {milestone.unit === "USD"
                            ? format(milestone.current)
                            : milestone.current}{" "}
                          / {milestone.unit === "USD" ? format(milestone.target) : milestone.target}{" "}
                          {milestone.unit !== "USD" && milestone.unit}
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                    </div>
                  )}

                  {/* Reward */}
                  <div
                    className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs ${
                      milestone.completed
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.completed ? (
                      <Gift className="h-3 w-3" />
                    ) : (
                      <Lock className="h-3 w-3" />
                    )}
                    {milestone.reward}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
