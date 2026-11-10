import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { Marquee } from "@/components/fun/marquee";
import { SkillsSection } from "@/components/sections/skills";
import { StatsSection } from "@/components/sections/stats";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { MakerCheckerSection } from "@/components/sections/maker-checker";
import { ProjectsSection } from "@/components/sections/projects";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <Marquee />
        <SkillsSection />
        <StatsSection />
        <ExperienceSection />
        <EducationSection />
        <MakerCheckerSection />
        <ProjectsSection />
        <Marquee reverse />
      </main>
      <Footer />
    </>
  );
}
