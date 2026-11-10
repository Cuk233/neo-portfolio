"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

const INITIAL_BULLETS = 3;

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true });

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="experience" className="py-20 px-4 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-4xl font-heading text-ink">Work Experience</h2>
          <p className="text-base font-medium text-ink/80">
            Building production banking &amp; aviation systems 💼
          </p>
        </div>

        <div className="relative pl-6 md:pl-0">
          <div
            aria-hidden="true"
            className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-ink md:-translate-x-1/2"
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const isExpanded = Boolean(expanded[index]);
              const visibleBullets = isExpanded
                ? exp.description
                : exp.description.slice(0, INITIAL_BULLETS);
              const hiddenCount = exp.description.length - INITIAL_BULLETS;

              return (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.12 }}
                  className={cn(
                    "relative w-full md:w-[calc(50%-2rem)]",
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  )}
                >
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: exp.color }}
                    className={cn(
                      "absolute top-6 h-4 w-4 rounded-full border-2 border-ink",
                      "-left-[22px]",
                      index % 2 === 0
                        ? "md:left-auto md:-right-[40px]"
                        : "md:-left-[40px]"
                    )}
                  />

                  <article className="rounded-base border-2 border-ink bg-bg shadow-brutal overflow-hidden">
                    <header
                      style={{ backgroundColor: exp.color }}
                      className="border-b-2 border-ink p-4 sm:p-5 flex flex-wrap items-start justify-between gap-2"
                    >
                      <div>
                        <h3 className="text-xl font-heading text-ink">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-bold text-ink">
                          {exp.company} · {exp.type} · {exp.location}
                        </p>
                      </div>
                      <span className="rounded-base border-2 border-ink bg-white px-2.5 py-0.5 text-xs font-heading text-ink shadow-brutal-sm">
                        {exp.period}
                      </span>
                    </header>

                    <div className="p-4 sm:p-5 space-y-4">
                      <ul className="space-y-2 text-sm text-ink">
                        {visibleBullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span aria-hidden="true" className="font-bold text-coral">
                              ▸
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {hiddenCount > 0 && (
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() => toggle(index)}
                          className="inline-flex items-center gap-1.5 rounded-base border-2 border-ink bg-sunny px-3 py-1 text-xs font-heading text-ink shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                        >
                          {isExpanded ? (
                            <>
                              Show less <ChevronUp className="h-3.5 w-3.5" />
                            </>
                          ) : (
                            <>
                              +{hiddenCount} more highlights{" "}
                              <ChevronDown className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dashed border-ink/30">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-base border border-ink bg-white px-2 py-0.5 text-xs font-bold text-ink"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
