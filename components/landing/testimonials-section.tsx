"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";

const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Professional Trader",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "Global Earn has transformed my trading experience. The platform is incredibly intuitive, and the daily returns have been consistent. Highly recommended for anyone serious about trading.",
    rating: 5,
    investment: "Gold Tier",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Investment Analyst",
    location: "United Kingdom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "The customer support is exceptional. They helped me understand the different tiers and choose the right investment plan for my goals. The returns have exceeded my expectations.",
    rating: 5,
    investment: "Platinum Tier",
  },
  {
    id: 3,
    name: "David Okonkwo",
    role: "Business Owner",
    location: "Nigeria",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content: "Started with the Starter tier and quickly moved up to Bronze. The transparent fee structure and reliable withdrawals make Global Earn stand out from other platforms.",
    rating: 5,
    investment: "Bronze Tier",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "India",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content: "The mobile-friendly platform allows me to monitor my investments on the go. The real-time updates and notifications keep me informed about my portfolio performance.",
    rating: 5,
    investment: "Silver Tier",
  },
  {
    id: 5,
    name: "James Rodriguez",
    role: "Retired Executive",
    location: "Spain",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content: "After retiring, I was looking for a reliable passive income source. Global Earn's Diamond tier has provided me with excellent returns and complete peace of mind.",
    rating: 5,
    investment: "Diamond Tier",
  },
];

export function TestimonialsSection() {
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
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied traders who trust Global Earn
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-4">
                {testimonial.content}
              </p>

              <div className="pt-4 border-t border-border">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {testimonial.investment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
