"use client";

import { useState } from "react";
import {
  Users,
  Copy,
  Share2,
  Gift,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { useAuth } from "@/lib/context/AuthContext";

interface Referral {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active" | "completed";
  joinedAt: string;
  totalDeposit: number;
  commission: number;
}

const mockReferrals: Referral[] = [
  {
    id: "1",
    name: "John D.",
    email: "j***d@email.com",
    status: "completed",
    joinedAt: "2024-01-15",
    totalDeposit: 1500,
    commission: 75,
  },
  {
    id: "2",
    name: "Sarah M.",
    email: "s***m@email.com",
    status: "active",
    joinedAt: "2024-02-20",
    totalDeposit: 500,
    commission: 25,
  },
  {
    id: "3",
    name: "Mike R.",
    email: "m***r@email.com",
    status: "pending",
    joinedAt: "2024-03-01",
    totalDeposit: 0,
    commission: 0,
  },
];

const referralLevels = [
  { level: 1, referrals: 5, bonus: 50, commission: "5%" },
  { level: 2, referrals: 15, bonus: 150, commission: "7%" },
  { level: 3, referrals: 30, bonus: 400, commission: "10%" },
  { level: 4, referrals: 50, bonus: 1000, commission: "12%" },
];

export default function ReferralsPage() {
  const { toast } = useToast();
  const { format } = useCurrency();
  const { user } = useAuth();
  const [referrals] = useState<Referral[]>(mockReferrals);

  const referralCode = user?.email?.split("@")[0].toUpperCase() + "REF" || "USERREF";
  const referralLink = `https://globalearn.com/register?ref=${referralCode}`;

  const totalReferrals = referrals.length;
  const activeReferrals = referrals.filter((r) => r.status === "active" || r.status === "completed").length;
  const totalEarnings = referrals.reduce((sum, r) => sum + r.commission, 0);
  const pendingEarnings = referrals.filter((r) => r.status === "active").reduce((sum, r) => sum + r.commission, 0);

  const currentLevel = referralLevels.find((t) => totalReferrals < t.referrals) || referralLevels[referralLevels.length - 1];
  const previousLevel = referralLevels[referralLevels.indexOf(currentLevel) - 1];
  const progress = previousLevel
    ? ((totalReferrals - previousLevel.referrals) / (currentLevel.referrals - previousLevel.referrals)) * 100
    : (totalReferrals / currentLevel.referrals) * 100;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-500",
    active: "bg-blue-500/20 text-blue-500",
    completed: "bg-green-500/20 text-green-500",
  };

  const statusIcons = {
    pending: Clock,
    active: TrendingUp,
    completed: CheckCircle,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Referral Program</h1>
        <p className="text-muted-foreground">
          Invite friends and earn commissions on their deposits
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold">{totalReferrals}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Referrals</p>
                <p className="text-2xl font-bold">{activeReferrals}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">{format(totalEarnings)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Earnings</p>
                <p className="text-2xl font-bold">{format(pendingEarnings)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Referral Link */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Referral Code</label>
                <div className="flex gap-2">
                  <Input value={referralCode} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(referralCode, "Referral code")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Referral Link</label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(referralLink, "Referral link")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button className="flex-1" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Facebook
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Referrals List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              {referrals.length > 0 ? (
                <div className="space-y-3">
                  {referrals.map((referral) => {
                    const StatusIcon = statusIcons[referral.status];
                    return (
                      <div
                        key={referral.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {referral.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{referral.name}</p>
                            <p className="text-sm text-muted-foreground">{referral.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-sm text-muted-foreground">Deposit</p>
                            <p className="font-medium">{format(referral.totalDeposit)}</p>
                          </div>
                          <div className="text-right hidden sm:block">
                            <p className="text-sm text-muted-foreground">Commission</p>
                            <p className="font-medium text-green-500">{format(referral.commission)}</p>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusColors[referral.status]}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {referral.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No referrals yet</p>
                  <p className="text-sm text-muted-foreground">
                    Share your link to start earning
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Referral Levels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="text-3xl font-bold text-primary">Level {referralLevels.indexOf(currentLevel) + 1}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentLevel.commission} Commission Rate
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next level</span>
                  <span>{totalReferrals} / {currentLevel.referrals} referrals</span>
                </div>
                <Progress value={Math.min(progress, 100)} className="h-2" />
              </div>

              <div className="space-y-3">
                {referralLevels.map((level, index) => {
                  const isCurrentLevel = level === currentLevel;
                  const isCompleted = totalReferrals >= level.referrals;
                  return (
                    <div
                      key={level.level}
                      className={`p-3 rounded-lg border transition-colors ${
                        isCurrentLevel
                          ? "border-primary bg-primary/5"
                          : isCompleted
                          ? "border-green-500/50 bg-green-500/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : isCurrentLevel
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">Level {level.level}</p>
                            <p className="text-xs text-muted-foreground">
                              {level.referrals} referrals
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{level.commission}</p>
                          <p className="text-xs text-muted-foreground">
                            +{format(level.bonus)} bonus
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Share Your Link</p>
                  <p className="text-xs text-muted-foreground">
                    Send your unique referral link to friends
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Friends Sign Up</p>
                  <p className="text-xs text-muted-foreground">
                    They create an account using your link
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Earn Commissions</p>
                  <p className="text-xs text-muted-foreground">
                    Get a percentage of their deposits as commission
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
