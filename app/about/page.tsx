"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Users,
  Globe,
  Award,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We prioritize the security of your assets with industry-leading protocols and regular audits.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "Our users are at the heart of everything we do. We continuously improve based on your feedback.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We embrace cutting-edge technology to provide the best trading experience possible.",
  },
  {
    icon: Target,
    title: "Transparency",
    description:
      "We believe in clear communication and honest practices in all our operations.",
  },
];

const milestones = [
  { year: "2019", event: "Global Earn founded in Singapore" },
  { year: "2020", event: "Reached 100,000 registered users" },
  { year: "2021", event: "Launched margin and futures trading" },
  { year: "2022", event: "Expanded to 120+ countries" },
  { year: "2023", event: "Surpassed $1 trillion in trading volume" },
  { year: "2024", event: "Introduced AI-powered trading tools" },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "120+", label: "Countries" },
  { value: "$2.5T", label: "Total Volume" },
  { value: "200+", label: "Team Members" },
];

const team = [
  {
    name: "Michael Chen",
    role: "CEO & Co-Founder",
    bio: "Former Goldman Sachs executive with 15 years in fintech",
  },
  {
    name: "Sarah Williams",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer, blockchain expert since 2014",
  },
  {
    name: "David Park",
    role: "Chief Security Officer",
    bio: "Cybersecurity veteran with experience at major exchanges",
  },
  {
    name: "Emma Rodriguez",
    role: "Head of Product",
    bio: "Product leader from Coinbase and Stripe",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Building the Future of{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Digital Finance
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Global Earn is a leading cryptocurrency exchange committed to
                providing secure, reliable, and innovative trading solutions for
                millions of users worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-border bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At Global Earn, we believe that everyone should have access to
                  the opportunities presented by digital assets. Our mission is to
                  democratize finance by making cryptocurrency trading accessible,
                  secure, and efficient for users of all experience levels.
                </p>
                <p className="text-muted-foreground mb-6">
                  We are committed to building trust through transparency, providing
                  world-class security, and continuously innovating to meet the
                  evolving needs of our global community.
                </p>
                <Button asChild>
                  <Link href="/register">
                    Join Our Community
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 w-24 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Globe className="h-12 w-12 text-primary" />
                    </div>
                    <div className="h-24 w-24 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Users className="h-12 w-12 text-accent" />
                    </div>
                    <div className="h-24 w-24 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Shield className="h-12 w-12 text-accent" />
                    </div>
                    <div className="h-24 w-24 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Award className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="pt-6">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From startup to global platform
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative flex items-center mb-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary md:-translate-x-1/2" />
                    <div
                      className={`ml-12 md:ml-0 md:w-1/2 ${
                        index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"
                      }`}
                    >
                      <span className="text-sm font-bold text-primary">
                        {milestone.year}
                      </span>
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Leadership Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the people building the future of finance
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-primary mb-2">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Us on This Journey
              </h2>
              <p className="text-muted-foreground mb-8">
                Be part of the financial revolution. Start trading with Global Earn
                today and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
