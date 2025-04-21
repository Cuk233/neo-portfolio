"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  color: string;
  link?: string;
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Virtual Account System",
      description: "Developed and maintained web applications using React.js and Next.js, implementing responsive designs and modern UI components. Collaborated with backend team for API integration.",
      technologies: ["React.js", "Next.js", "TypeScript", "Redux", "Zustand", "Ant Design"],
      color: "#FF6B6B",
    },
    {
      title: "Digital Wallet",
      description: "Maintained back-office web app to run smoothly and fix bugs. Create a new feature to close user account and add a new feature to bulk add user balance.",
      technologies: ["Vue.js", "Nuxt.js", "Javascript"],
      color: "#4ECDC4",
    },
    {
      title: "E-Commerce Website",
      description: "Built a full-stack e-commerce website with product listings, shopping cart functionality, and user authentication. Implemented responsive design and payment integration.",
      technologies: ["React.js", "Node.js", "Express", "MySQL", "Redux"],
      color: "#FF6B6B",
    },
    {
      title: "Travel Landing Page",
      description: "A travel landing page with a modern design and smooth animations. Features include a headless CMS using Sanity, a services section with animated icons, and a footer with social media links.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Sanity"],
      color: "#FFE66D",
      link: "https://duplicate-project.vercel.app/"
    },
    {
      title: "Backoffice Website",
      description: "A backoffice application for managing administrative tasks and data. Features user authentication and role-based access control.",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "Auth", "Redux", "TypeScript", "Axios"],
      color: "#4DA1A9",
      link: "https://backoffice-website.vercel.app/login"
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-heading text-[#2A2A2A]">Featured Projects</h2>
        </div>
        <p className="text-center text-[#2A2A2A]/70 mb-8 italic">Hover over cards to see animation</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full border-2 border-[#2A2A2A] hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                <div className="h-2" style={{ backgroundColor: project.color }} />
                <CardHeader>
                  <CardTitle className="text-[#2A2A2A]">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-[#2A2A2A]/80 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-[#2A2A2A]/5 border border-[#2A2A2A] rounded-base text-[#2A2A2A] text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.link && (
                    <Button asChild className="mt-auto border border-[#2A2A2A] text-[#2A2A2A] hover:bg-[#2A2A2A]/5">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Visit Project
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 