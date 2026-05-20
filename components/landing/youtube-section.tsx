"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  {
    id: "1",
    title: "Getting Started with Global Earn",
    description: "Learn how to create your account and make your first trade",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=340&fit=crop",
    duration: "5:32",
  },
  {
    id: "2",
    title: "Understanding Trading Tiers",
    description: "A complete guide to our investment tiers and profit rates",
    thumbnail: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=340&fit=crop",
    duration: "8:15",
  },
  {
    id: "3",
    title: "Cryptocurrency Trading Basics",
    description: "Everything you need to know about trading Bitcoin and altcoins",
    thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=340&fit=crop",
    duration: "12:45",
  },
  {
    id: "4",
    title: "Security Features Explained",
    description: "How we keep your funds and data secure",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=340&fit=crop",
    duration: "6:20",
  },
];

export function YouTubeSection() {
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
            Learn to Trade
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our educational videos and become a confident trader
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden mb-3 aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                  {video.duration}
                </div>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {video.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
