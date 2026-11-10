"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Download, Github, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fireConfetti } from "@/components/fun/confetti";
import { profile, yearsOfExperience } from "@/lib/data";

const pillStickers = [
  { label: "GPA 3.69 🎓", bg: "bg-sunny", pos: "left-2 top-4", rotate: "-6deg" },
  { label: "Scholarship ×2 🏆", bg: "bg-teal", pos: "right-4 top-2", rotate: "5deg" },
  { label: "Bank-grade 🔐", bg: "bg-coral", pos: "left-4 bottom-6", rotate: "4deg" },
  { label: "Maker-Checker ✅", bg: "bg-lilac", pos: "right-6 bottom-4", rotate: "-5deg" },
  { label: "≈500KB saved ⚡", bg: "bg-sunny", pos: "left-1/3 bottom-12", rotate: "3deg" },
];

export function HeroSection() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const expYears = yearsOfExperience();

  return (
    <section id="hero" className="min-h-[100dvh] pt-24 pb-16 px-4 bg-bg overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-base border-2 border-ink bg-white px-3 py-1.5 text-xs sm:text-sm font-bold text-ink shadow-brutal-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal border border-ink" />
            </span>
            <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
            <span>{profile.location} · Available for opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading leading-[1.08] tracking-tight text-ink">
            Hi, I&apos;m{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-coral">{profile.shortName}</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-3 bg-sunny border-2 border-ink -rotate-1 -z-0"
              />
            </span>
            <span className="mt-3 flex flex-wrap items-center gap-3 text-2xl sm:text-4xl">
              <span>{profile.role}</span>
              <span className="inline-flex items-center gap-1.5 rounded-base border-2 border-ink bg-teal px-3 py-1 text-base sm:text-xl font-heading text-ink shadow-brutal-sm rotate-1">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {profile.stack}
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-ink/90 max-w-2xl leading-relaxed font-base">
            {profile.summary}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              variant="default"
              size="lg"
              className="bg-coral text-ink font-heading"
              asChild
            >
              <a
                href={profile.resume}
                download
                onClick={(e) => fireConfetti({ x: e.clientX, y: e.clientY })}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </Button>

            <Button
              variant="default"
              size="lg"
              className="bg-teal text-ink font-heading"
              asChild
            >
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" aria-hidden="true" />
                View GitHub
              </a>
            </Button>

            <Button
              variant="neutral"
              size="lg"
              className="bg-sunny text-ink font-heading"
              asChild
            >
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Say hi
              </a>
            </Button>
          </div>
        </div>

        <div
          ref={constraintsRef}
          className="lg:col-span-5 relative h-[420px] sm:h-[470px] w-full rounded-base border-2 border-dashed border-ink/40 bg-white/50 p-4 overflow-hidden"
        >
          <p className="absolute top-2.5 right-3 text-xs font-bold text-ink/70 bg-white border border-ink px-2 py-0.5 rounded-base z-30">
            psst… drag the stickers 👆
          </p>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute right-4 top-10 cursor-grab active:cursor-grabbing z-10"
            style={{ rotate: "3deg" }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileHover={{ rotate: 0, scale: 1.03 }}
            whileDrag={{ scale: 1.06, zIndex: 30, rotate: 0 }}
          >
            <Card interactive={false} className="w-60 sm:w-64 bg-sunny border-2 border-ink shadow-brutal p-0">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-ink text-base font-heading">🎨 Frontend Craft</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-ink/90 text-xs sm:text-sm">
                  Next.js 14/15, React, TypeScript, Ant Design, Tailwind CSS, RTK Query &amp; Zustand
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="absolute left-4 top-[145px] sm:top-[155px] cursor-grab active:cursor-grabbing z-10"
            style={{ rotate: "-3deg" }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileHover={{ rotate: 0, scale: 1.03 }}
            whileDrag={{ scale: 1.06, zIndex: 30, rotate: 0 }}
          >
            <Card interactive={false} className="w-60 sm:w-64 bg-teal border-2 border-ink shadow-brutal p-0">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-ink text-base font-heading">🏦 Fintech Experience</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-ink/90 text-xs sm:text-sm">
                  ≈{expYears} yrs @ Infosys · Bank Victoria portals, Maker-Checker &amp; RBAC
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="absolute right-6 top-[275px] sm:top-[290px] cursor-grab active:cursor-grabbing z-10"
            style={{ rotate: "2deg" }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            whileHover={{ rotate: 0, scale: 1.03 }}
            whileDrag={{ scale: 1.06, zIndex: 30, rotate: 0 }}
          >
            <Card interactive={false} className="w-60 sm:w-64 bg-coral border-2 border-ink shadow-brutal p-0">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-ink text-base font-heading">🎓 Education</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-ink/90 text-xs sm:text-sm">
                  B.CS Informatics · GPA 3.69 · Mercu Buana &amp; Purwadhika Scholar
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {pillStickers.map((sticker) => (
            <motion.span
              key={sticker.label}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.25}
              whileHover={{ scale: 1.08, rotate: 0 }}
              whileDrag={{ scale: 1.12, zIndex: 40 }}
              style={{ rotate: sticker.rotate }}
              className={`absolute ${sticker.pos} z-20 cursor-grab active:cursor-grabbing select-none rounded-full border-2 border-ink ${sticker.bg} px-3 py-1 text-xs font-heading text-ink shadow-brutal-sm`}
            >
              {sticker.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
