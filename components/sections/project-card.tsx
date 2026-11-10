"use client";

import { useState, type MouseEvent } from "react";
import { ExternalLink, RotateCcw, BookOpen } from "lucide-react";
import type { Project, Rarity } from "@/lib/data";
import { cn } from "@/lib/utils";

export const rarityStars: Record<Rarity, string> = {
  Enterprise: "★★★",
  Personal: "★★",
  "Side Quest": "★",
};

const statLabels = [
  ["complexity", "Complexity"],
  ["security", "Security"],
  ["scale", "Scale"],
] as const;

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-ink">
      <span className="w-20 shrink-0 uppercase tracking-wide">{label}</span>
      <div className="flex flex-1 gap-1" role="img" aria-label={`${label} ${value} of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={cn("h-3 flex-1 rounded-sm border-2 border-ink", i < value ? "bg-ink" : "bg-white")}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const [flipped, setFlipped] = useState(false);
  const stop = (e: MouseEvent) => e.stopPropagation();

  return (
    <div className="group h-[440px] [perspective:1200px]">
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] motion-reduce:transition-none",
          "[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-pressed={flipped}
          aria-label={`${project.title} — flip card for details`}
          tabIndex={flipped ? -1 : 0}
          className="absolute inset-0 flex flex-col overflow-hidden rounded-base border-2 border-ink bg-white text-left shadow-brutal [backface-visibility:hidden] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          <div
            className="relative flex h-36 shrink-0 items-center justify-center border-b-2 border-ink"
            style={{ backgroundColor: project.color }}
          >
            <span className="text-6xl drop-shadow-[3px_3px_0_#2A2A2A]" aria-hidden>
              {project.emoji}
            </span>
            <span className="absolute left-3 top-3 rounded-base border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold text-ink shadow-brutal-sm">
              {project.rarity} <span className="text-coral">{rarityStars[project.rarity]}</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="text-lg font-heading leading-tight text-ink">{project.title}</h3>
            <p className="text-xs font-bold text-ink/70">
              {project.client} · {project.period}
            </p>
            <p className="line-clamp-3 text-sm text-ink/90">{project.summary}</p>
            <div className="mt-auto space-y-1.5">
              {statLabels.map(([key, label]) => (
                <StatBar key={key} label={label} value={project.stats[key]} />
              ))}
            </div>
          </div>
        </button>

        <div
          onClick={() => setFlipped(false)}
          aria-hidden={!flipped}
          className="absolute inset-0 flex flex-col gap-4 rounded-base border-2 border-ink p-5 text-ink shadow-brutal [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backgroundColor: project.color }}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-heading leading-tight">{project.title}</h3>
            <button
              type="button"
              onClick={(e) => {
                stop(e);
                setFlipped(false);
              }}
              tabIndex={flipped ? 0 : -1}
              aria-label={`Flip ${project.title} back`}
              className="shrink-0 rounded-base border-2 border-ink bg-white p-1.5 shadow-brutal-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-base border-2 border-ink bg-white px-2 py-0.5 text-xs font-bold">
                {tech}
              </span>
            ))}
          </div>
          <ul className="space-y-2 text-sm">
            {project.highlights.slice(0, 2).map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden>▸</span>
                <span className="line-clamp-3">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={(e) => {
                stop(e);
                onOpen(project);
              }}
              tabIndex={flipped ? 0 : -1}
              className="inline-flex items-center gap-2 rounded-base border-2 border-ink bg-white px-3 py-2 text-sm font-bold shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink"
            >
              <BookOpen className="h-4 w-4" />
              Case study
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                tabIndex={flipped ? 0 : -1}
                className="inline-flex items-center gap-2 rounded-base border-2 border-ink bg-ink px-3 py-2 text-sm font-bold text-white shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
              >
                Visit
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
