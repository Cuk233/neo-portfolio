"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-4xl font-heading text-ink">
            Skills &amp; Technologies
          </h2>
          <p className="text-base font-medium text-ink/80">
            Tools, stacks, and security patterns I ship in production 🛠️
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {skills.map((group, groupIndex) => {
            const spanClass =
              groupIndex < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <motion.article
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: groupIndex * 0.08 }}
                style={{ backgroundColor: group.color }}
                className={cn(
                  "rounded-base border-2 border-ink p-6 shadow-brutal flex flex-col gap-4",
                  spanClass
                )}
              >
                <header className="flex items-center justify-between gap-2 border-b-2 border-ink pb-3">
                  <h3 className="text-xl font-heading text-ink flex items-center gap-2">
                    <span aria-hidden="true">{group.emoji}</span>
                    {group.name}
                  </h3>
                  <span className="rounded-base border-2 border-ink bg-white px-2 py-0.5 text-xs font-heading text-ink shadow-brutal-sm">
                    {group.items.length}
                  </span>
                </header>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item, idx) => (
                    <li
                      key={item}
                      className={cn(
                        "rounded-base border-2 border-ink bg-white px-3 py-1 text-xs sm:text-sm font-bold text-ink shadow-brutal-sm transition-transform hover:-translate-y-0.5",
                        idx % 3 === 0
                          ? "hover:rotate-1"
                          : idx % 3 === 1
                          ? "hover:-rotate-1"
                          : "hover:rotate-2"
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
