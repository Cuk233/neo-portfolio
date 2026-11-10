"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project, type Rarity } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProjectCard, rarityStars } from "./project-card";
import { ProjectModal } from "./project-modal";

type Filter = "All" | Rarity;

const filters: Filter[] = ["All", "Enterprise", "Personal", "Side Quest"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.rarity === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-4xl font-heading text-ink">Featured Projects</h2>
          <p className="text-base font-medium text-ink/80">
            Collect them all — hover or tap any card to flip 🃏
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
        >
          {filters.map((filter) => {
            const active = activeFilter === filter;
            const count =
              filter === "All"
                ? projects.length
                : projects.filter((p) => p.rarity === filter).length;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-base border-2 border-ink px-4 py-1.5 text-xs sm:text-sm font-heading text-ink transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
                  active
                    ? "bg-coral shadow-none translate-x-[2px] translate-y-[2px]"
                    : "bg-white shadow-brutal-sm hover:-translate-y-0.5"
                )}
              >
                {filter}{" "}
                {filter !== "All" && (
                  <span className="text-ink/70" aria-hidden="true">
                    {rarityStars[filter]}
                  </span>
                )}{" "}
                <span className="ml-1 rounded-sm border border-ink bg-sunny px-1.5 py-0.2 text-xs">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
