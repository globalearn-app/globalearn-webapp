"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Clock, MapPin, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/LanguageContext";
import { CONTACT_INFO } from "@/lib/config/constants";

export function SupportSection() {
  const { t } = useLanguage();

  const whatsappLink = `https://wa.me/${CONTACT_INFO.whatsapp.replace(/[^0-9]/g, "")}`;

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
            {t("support.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("support.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6 text-center"
          >
            <div className="h-14 w-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-7 w-7 text-green-500" />
            </div>
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Quick responses via WhatsApp
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                {CONTACT_INFO.whatsapp}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6 text-center"
          >
            <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send us a detailed message
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${CONTACT_INFO.email}`}>
                Send Email
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6 text-center"
          >
            <div className="h-14 w-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-7 w-7 text-purple-500" />
            </div>
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We never sleep, always here
            </p>
            <span className="text-sm font-medium text-primary">Always Available</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-border rounded-xl p-6 text-center"
          >
            <div className="h-14 w-14 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-7 w-7 text-orange-500" />
            </div>
            <h3 className="font-semibold mb-2">VIP Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Priority support for Gold+ tiers
            </p>
            <span className="text-sm font-medium text-primary">Premium Service</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
