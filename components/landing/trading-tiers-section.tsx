"use client";

import { motion } from "framer-motion";
import { Check, Sprout, Medal, Award, Crown, Gem, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useCurrency } from "@/lib/context/CurrencyContext";
import { TRADING_TIERS } from "@/lib/config/tiers";

const planIcons = {
  Sprout,
  Medal,
  Award,
  Crown,
  Gem,
  Diamond,
};

export function TradingTiersSection() {
  const { t } = useLanguage();
  const { format } = useCurrency();

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t("plans.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("plans.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRADING_TIERS.map((plan, index) => {
            const IconComponent = planIcons[plan.icon as keyof typeof planIcons];
            const isPopular = plan.id === 4;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative bg-card border rounded-xl overflow-hidden ${
                  isPopular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Most Popular
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${plan.color}`} />

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">Plan {plan.id}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-1">
                      {format(plan.minInvestment)}
                      {plan.maxInvestment && (
                        <span className="text-lg text-muted-foreground font-normal">
                          {" "}- {format(plan.maxInvestment)}
                        </span>
                      )}
                      {!plan.maxInvestment && (
                        <span className="text-lg text-muted-foreground font-normal">+</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Investment Range</p>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 mb-6">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {plan.dailyProfit}%
                      </div>
                      <div className="text-xs text-muted-foreground">Daily Profit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{plan.duration} days</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={isPopular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
