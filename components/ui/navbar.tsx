"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b-2 border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <span className="text-xl font-heading text-[#2A2A2A] hover:text-[#FF6B6B] cursor-pointer transition-colors"
          onClick={() => scrollToSection("hero")}>
          Portfolio
        </span>
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            className="bg-[#4ECDC4] text-[#2A2A2A] font-bold hover:opacity-90"
            onClick={() => scrollToSection("about")}
          >
            About
          </Button>
          <Button
            variant="default"
            className="bg-[#FFE66D] text-[#2A2A2A] font-bold hover:opacity-90"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </Button>
        </div>
      </div>
    </nav>
  );
} 