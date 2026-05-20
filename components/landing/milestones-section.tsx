"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  DollarSign,
  Globe,
  TrendingUp,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useCurrency } from "@/lib/context/CurrencyContext";

const milestones = [
  {
    icon: Users,
    value: "50,000+",
    label: "Active Traders",
    description: "Trusted by traders worldwide",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: DollarSign,
    value: "$2.5B+",
    label: "Trading Volume",
    description: "Monthly trading volume processed",
    color: "from-primary to-primary/80",
  },
  {
    icon: Globe,
    value: "120+",
    label: "Countries",
    description: "Global presence across continents",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: TrendingUp,
    value: "98.5%",
    label: "Success Rate",
    description: "Profitable trading strategies",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Shield,
    value: "$500M+",
    label: "Assets Secured",
    description: "Protected by advanced security",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Target,
    value: "24/7",
    label: "Market Access",
    description: "Trade anytime, anywhere",
    color: "from-orange-500 to-orange-600",
  },
];

const timeline = [
  {
    year: "2019",
    title: "Company Founded",
    description: "Global Earn was established with a vision to democratize trading",
  },
  {
    year: "2020",
    title: "10,000 Users",
    description: "Reached our first major user milestone during global expansion",
  },
  {
    year: "2021",
    title: "Multi-Asset Trading",
    description: "Launched forex, crypto, and commodities trading platforms",
  },
  {
    year: "2022",
    title: "Global Licensing",
    description: "Obtained regulatory licenses in multiple jurisdictions",
  },
  {
    year: "2023",
    title: "AI-Powered Tools",
    description: "Introduced machine learning for market analysis and predictions",
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Recognized as a top 10 trading platform worldwide",
  },
];

export function MilestonesSection() {
  const { t } = useLanguage();
  const { format } = useCurrency();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Our Achievements & Milestones
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A track record of excellence in the trading industry, built on trust and innovation
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-xl p-5 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
              >
                <milestone.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1">{milestone.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{milestone.label}</div>
              <div className="text-xs text-muted-foreground hidden md:block">{milestone.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Journey</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From humble beginnings to industry leadership
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center md:justify-${index % 2 === 0 ? "start" : "end"} md:even:flex-row-reverse`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                  <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                      {item.year}
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                  <div className="h-4 w-4 rounded-full bg-primary border-4 border-background" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Join thousands of successful traders and be part of our next milestone
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Start Your Journey
            <TrendingUp className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
