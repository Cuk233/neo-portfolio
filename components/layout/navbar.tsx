"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fireConfetti } from "@/components/fun/confetti";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Playground", href: "#playground", id: "playground" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    const ids = ["hero", ...navItems.map((i) => i.id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.4] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg border-b-2 border-ink">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#hero"
          className="inline-flex items-center gap-2.5 font-heading text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-base"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-ink bg-coral text-base font-heading text-ink shadow-brutal-sm">
            ZM.
          </span>
          <span className="hidden sm:inline text-lg tracking-tight">{profile.shortName}</span>
        </a>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "rounded-base border-2 px-3 py-1.5 text-sm font-heading text-ink transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
                  isActive
                    ? "border-ink bg-sunny shadow-brutal-sm"
                    : "border-transparent hover:border-ink hover:bg-white"
                )}
              >
                {item.label}
              </a>
            );
          })}
          <Button
            variant="default"
            size="sm"
            className="ml-2 bg-teal text-ink font-heading"
            asChild
          >
            <a
              href={profile.resume}
              download
              onClick={(e) => fireConfetti({ x: e.clientX, y: e.clientY })}
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              CV
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-base border-2 border-ink bg-sunny text-ink shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden border-t-2 border-ink bg-white px-4 py-4 shadow-brutal space-y-2"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block rounded-base border-2 border-ink px-3 py-2 text-sm font-heading text-ink",
                activeId === item.id ? "bg-sunny shadow-brutal-sm" : "bg-bg"
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resume}
            download
            onClick={(e) => {
              fireConfetti({ x: e.clientX, y: e.clientY });
              setMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 rounded-base border-2 border-ink bg-teal px-3 py-2 text-sm font-heading text-ink shadow-brutal-sm"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </a>
        </div>
      )}

      <motion.div
        aria-hidden="true"
        className="h-1 bg-coral origin-left"
        style={{ scaleX }}
      />
    </header>
  );
}
