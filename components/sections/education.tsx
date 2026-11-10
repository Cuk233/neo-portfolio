"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { cn } from "@/lib/utils";

export function EducationSection() {
  return (
    <section id="education" className="bg-bg px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-heading text-ink">Education &amp; Awards</h2>
          <p className="mt-3 text-lg font-medium text-ink/80">Certified, stamped, and laminated 🪪</p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {education.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative overflow-hidden rounded-base border-2 border-ink bg-white text-ink shadow-brutal-lg"
            >
              <div
                className="flex items-center justify-between border-b-2 border-ink px-5 py-2 text-xs font-bold uppercase tracking-widest"
                style={{ backgroundColor: item.color }}
              >
                <span>Certificate of Awesome</span>
                <span aria-hidden>No. 00{index + 1}</span>
              </div>
              <div className="flex gap-4 p-5">
                <span
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-base border-2 border-ink text-4xl shadow-brutal-sm"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                >
                  {item.emoji}
                </span>
                <div className="min-w-0 pr-16">
                  <h3 className="text-lg font-heading leading-tight">{item.title}</h3>
                  <p className="font-bold">{item.school}</p>
                  <p className="text-sm text-ink/70">{item.period}</p>
                </div>
              </div>
              <p className="border-t-2 border-dashed border-ink px-5 py-4 text-sm">{item.detail}</p>
              {item.badge && (
                <span
                  className={cn(
                    "absolute right-4 top-12 flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-double border-coral bg-white/80 p-2 text-center text-xs font-black uppercase leading-tight text-coral",
                    index % 2 === 0 ? "rotate-12" : "-rotate-12"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
