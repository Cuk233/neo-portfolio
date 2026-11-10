"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/data";
import { rarityStars } from "./project-card";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      aria-labelledby="project-modal-title"
      className="w-[min(92vw,42rem)] max-h-[88vh] rounded-base border-2 border-ink bg-white p-0 text-ink shadow-brutal-lg backdrop:bg-black/60"
    >
      {project && (
        <div>
          <header
            className="flex items-start gap-4 border-b-2 border-ink p-5"
            style={{ backgroundColor: project.color }}
          >
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-base border-2 border-ink bg-white text-3xl shadow-brutal-sm"
              aria-hidden
            >
              {project.emoji}
            </span>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wide">
                {project.rarity} {rarityStars[project.rarity]}
              </p>
              <h3 id="project-modal-title" className="text-2xl font-heading leading-tight">
                {project.title}
              </h3>
              <p className="text-sm font-bold text-ink/80">
                {project.client} · {project.period}
              </p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close case study"
              className="rounded-base border-2 border-ink bg-white p-1.5 shadow-brutal-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="space-y-5 p-5">
            <p className="font-medium">{project.summary}</p>
            <ul className="space-y-2 text-sm">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-base border-2 border-ink px-2 py-0.5 text-xs font-bold"
                  style={{ backgroundColor: project.color }}
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-base border-2 border-ink bg-ink px-4 py-2 font-bold text-white shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral"
              >
                Visit project
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
