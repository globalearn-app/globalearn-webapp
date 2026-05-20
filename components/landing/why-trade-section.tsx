"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Headphones,
  TrendingUp,
  Zap,
  Award,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";

const reasons = [
  {
    icon: Shield,
    titleKey: "why.security",
    descKey: "why.security.desc",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Headphones,
    titleKey: "why.support",
    descKey: "why.support.desc",
    color: "from-green-500 to-green-600",
  },
  {
    icon: TrendingUp,
    titleKey: "why.profits",
    descKey: "why.profits.desc",
    color: "from-primary to-primary/80",
  },
  {
    icon: Zap,
    titleKey: "why.fast",
    descKey: "why.fast.desc",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Award,
    titleKey: "why.regulated",
    descKey: "why.regulated.desc",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Globe,
    titleKey: "why.global",
    descKey: "why.global.desc",
    color: "from-cyan-500 to-cyan-600",
  },
];

export function WhyTradeSection() {
  const { t } = useLanguage();

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
            {t("why.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to succeed in the financial markets
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`h-14 w-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <reason.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(reason.titleKey)}</h3>
              <p className="text-muted-foreground">{t(reason.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
