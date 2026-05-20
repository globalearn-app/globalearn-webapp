"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";

export function RiskDisclosureSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">{t("risk.title")}</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Trading Risk Warning:</strong> Trading in cryptocurrencies, forex, stocks, and other financial instruments involves substantial risk of loss and is not suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
                  </p>
                  <p>
                    <strong className="text-foreground">Past Performance:</strong> Past performance is not indicative of future results. The value of investments can go down as well as up, and you may not get back the amount you originally invested. Daily profit percentages shown are based on historical data and market conditions, and are not guaranteed.
                  </p>
                  <p>
                    <strong className="text-foreground">No Financial Advice:</strong> The information provided on this platform does not constitute investment advice, financial advice, trading advice, or any other sort of advice. You should not treat any of the platform&apos;s content as such. Global Earn does not recommend that any cryptocurrency, stock, or financial instrument should be bought, sold, or held by you.
                  </p>
                  <p>
                    <strong className="text-foreground">Due Diligence:</strong> You are responsible for conducting your own due diligence and consulting with a licensed financial advisor before making any investment decisions. By using our platform, you acknowledge that you understand these risks and accept full responsibility for your trading decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
