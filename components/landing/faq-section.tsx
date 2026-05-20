"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";

const faqs = [
  {
    id: 1,
    question: "How do I get started with Global Earn?",
    answer: "Getting started is simple! Create your free account, complete the KYC verification process, choose your preferred trading plan, make a deposit, and start earning daily profits. Our support team is available 24/7 to guide you through each step.",
  },
  {
    id: 2,
    question: "What is the minimum investment amount?",
    answer: "Our Starter plan begins at just $100, making professional trading accessible to everyone. We offer 6 investment plans: Starter ($100), Bronze ($300), Silver ($500), Gold ($1,000), Platinum ($3,000), and Diamond ($5,000+), each with increasing profit rates.",
  },
  {
    id: 3,
    question: "How and when can I withdraw my profits?",
    answer: "You can request a withdrawal at any time through your dashboard. Processing times vary by plan: standard plans take 24-48 hours, while premium plans (Gold and above) enjoy expedited withdrawals within 24 hours. There are no hidden fees on withdrawals.",
  },
  {
    id: 4,
    question: "Is my investment safe with Global Earn?",
    answer: "Absolutely. We employ bank-grade security measures including 256-bit SSL encryption, two-factor authentication, cold storage for digital assets, and regular security audits. We're also fully licensed and regulated, ensuring your investments are protected.",
  },
  {
    id: 5,
    question: "Can I upgrade my trading plan?",
    answer: "Yes! You can upgrade your plan at any time by increasing your investment. When you upgrade, you'll immediately start earning the higher profit rate associated with your new plan. There's no waiting period or additional verification required.",
  },
];

export function FAQSection() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t("faq.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about Global Earn
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
