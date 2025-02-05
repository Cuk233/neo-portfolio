"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  color: string;
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Infosys Solusi Terpadu",
      description: "Developed and maintained web applications using React.js and Next.js, implementing responsive designs and modern UI components. Collaborated with backend team for API integration.",
      technologies: ["React.js", "Next.js", "TypeScript", "Redux", "Zustand", ],
      color: "#FF6B6B",
    },
    {
      title: "Digital Wallet",
      description: "Maintained back-office web app to run smoothly and fix bugs. Create a new feature to close user account and add a new feature to bulk add user balance.",
      technologies: ["Vue.js", "Nuxt.js", "Javascript"],
      color: "#4ECDC4",
    },
    {
      title: "Travel Landing Page",
      description: "A travel landing page with a modern design and smooth animations. Features include a headless CMS using Sanity, a services section with animated icons, and a footer with social media links.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Sanity"],
      color: "#FFE66D",
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-heading text-[#2A2A2A]">Featured Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <Card className="h-full border-2 border-[#2A2A2A] hover:-translate-y-2 transition-transform duration-300">
                  <div className="h-2" style={{ backgroundColor: project.color }} />
                  <CardHeader>
                    <CardTitle className="text-[#2A2A2A]">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#2A2A2A]/80 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-[#2A2A2A]/5 border border-[#2A2A2A] rounded-base text-[#2A2A2A] text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 