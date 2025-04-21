"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  items: string[];
  color: string;
}

export function SkillsSection() {
  const skills: Skill[] = [
    {
      name: "Frontend Development",
      items: ["React.js", "Next.js", "TypeScript", "TailwindCSS", "HTML/CSS", "Redux", "Zustand", "Axios", "Ant Design", "Vue.js", "Nuxt.js", "Material UI"],
      color: "bg-[#FF6B6B]"
    },
    {
      name: "Backend Development",
      items: ["Node.js", "Express", "MySQL", "REST API", "PHP", "CodeIgniter"],
      color: "bg-[#4ECDC4]"
    },
    {
      name: "Tools & Others",
      items: ["Git", "Docker", "Vercel", "Figma", "VS Code", "Postman", "Sanity", "Chart.js"],
      color: "bg-[#FFE66D]"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-heading text-[#2A2A2A] mb-12 text-center">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card key={index} className={cn(skill.color, "border-2 border-[#2A2A2A]")}>
              <CardHeader>
                <CardTitle className="text-[#2A2A2A]">{skill.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-3 py-1 bg-white/20 border-2 border-[#2A2A2A] rounded-base text-[#2A2A2A] font-medium text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 