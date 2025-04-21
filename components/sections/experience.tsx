"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  color: string;
}

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const experiences: Experience[] = [
    {
      title: "Frontend Developer",
      company: "Infosys Solusi Terpadu",
      period: "2023 - Present",
      description: [
        "Creating website components using React.js and Next.js",
        "Collaborate with team members to create fully functional and user-friendly website",
        "Integrate APIs from back end using Axios",
        "Ensure website's performance and responsiveness",
        "Implement form handling and data submission features",
        "Manage state and data flow within application",
        "Maintain code quality and address bugs efficiently",
        "Optimize components for maximum performance across different devices and browsers",
        "Utilize CSS for layout design and styling",
        "Troubleshoot technical issues related to front end development, ensuring prompt resolution to maintain project timelines",
        "Engage in code reviews and continuous learning to enhance development skills"
      ],
      technologies: ["React.js", "Next.js", "TypeScript", "TailwindCSS", "Redux", "Zustand", "Ant Design"],
      color: "#FF6B6B"
    },
    {
      title: "Full Stack Developer",
      company: "Purwadhika Digital Technology School",
      period: "2023",
      description: [
        "Built full-stack applications using React.Js, Express.js and MySQL",
        "Developed RESTful APIs and database schemas",
        "Implemented authentication and authorization",
        "Created responsive user interfaces with modern design principles",
        "Collaborated with team members to deliver high-quality applications",
        "Participated in code reviews and implemented feedback"
      ],
      technologies: ["MySQL", "Express.js", "React.js", "Node.js", "REST API"],
      color: "#4ECDC4"
    },
    {
      title: "Back-end Developer",
      company: "GMF AeroAsia",
      period: "06.2022 - 08.2022",
      description: [
        "Created CRUD system using PHP and CodeIgniter",
        "Experimented with API using Postman",
        "Implemented data integration from REST API to CodeIgniter",
        "Completed internship project with focus on backend development",
        "Collaborated with team members to understand business requirements",
        "Documented code and processes for future reference"
      ],
      technologies: ["PHP", "CodeIgniter", "MySQL", "REST API", "Postman"],
      color: "#FFE66D"
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-heading text-[#2A2A2A] mb-12 text-center">
          Work Experience
        </h2>
        <p className="text-center text-[#2A2A2A]/70 mb-8 italic">Click on any card to see more details</p>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-[#2A2A2A] transform -translate-x-1/2" />
          
          {/* Experience items */}
          <div className="flex flex-col">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:mr-auto md:pr-8 md:ml-0" : "md:ml-auto md:pl-8 md:mr-0"
                } w-full md:w-[calc(50%-2rem)]`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <div 
                  className={`absolute top-0 w-4 h-4 rounded-full border-2 border-[#2A2A2A] bg-white transform -translate-y-1/2
                    ${index % 2 === 0 ? "right-0 md:translate-x-10" : "left-0 md:-translate-x-10"}`}
                  style={{ 
                    backgroundColor: activeIndex === index ? exp.color : 'white',
                    transition: 'background-color 0.3s ease'
                  }}
                />

                {/* Content card */}
                <motion.div
                  className={`p-6 bg-white border-2 border-[#2A2A2A] rounded-base shadow-brutal cursor-pointer overflow-hidden hover:scale-[1.02] transition-transform`}
                  style={{ 
                    backgroundColor: activeIndex === index ? exp.color : 'white',
                    transition: 'background-color 0.3s ease'
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <h3 className="text-xl font-bold text-[#2A2A2A] mb-1">{exp.title}</h3>
                  <p className="text-[#2A2A2A] font-medium mb-2">{exp.company}</p>
                  <p className="text-[#2A2A2A]/80 text-sm mb-4">{exp.period}</p>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto',
                          transition: {
                            height: {
                              duration: 0.4,
                              ease: "easeOut"
                            },
                            opacity: {
                              duration: 0.3,
                              delay: 0.1
                            }
                          }
                        }}
                        exit={{ 
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: "easeIn"
                            },
                            opacity: {
                              duration: 0.2
                            }
                          }
                        }}
                      >
                        <ul className="list-disc list-inside mb-4 text-[#2A2A2A] space-y-2">
                          {exp.description.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="px-2 py-1 bg-white/20 border border-[#2A2A2A] rounded-base text-[#2A2A2A] text-sm"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 