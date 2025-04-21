"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

export function StatsSection() {
  const stats: Stat[] = [
    {
      label: "Projects Completed",
      value: 4,
      suffix: "",
      color: "#FF6B6B",
    },
    {
      label: "Years Experience",
      value: 1,
      suffix: "+",
      color: "#4ECDC4",
    },
    {
      label: "Technologies",
      value: 15,
      suffix: "+",
      color: "#FFE66D",
    },
  ];

  return (
    <section className="py-12 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-heading text-[#2A2A2A] mb-4 text-center">
          My Stats
        </h2>
        <p className="text-center text-[#2A2A2A]/70 mb-8 italic">Scroll to see animations</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-2 border-[#2A2A2A] overflow-hidden">
                <div className="h-2" style={{ backgroundColor: stat.color }} />
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="text-4xl font-bold text-[#2A2A2A] mb-2"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2 + index * 0.1 
                    }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <p className="text-[#2A2A2A]/80">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 