"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen pt-20 px-4 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-20">
        {/* Left side - Text content */}
        <div className="space-y-6">
          <h1 className="text-6xl font-heading leading-tight text-[#2A2A2A]">
            Hi, I&apos;m
            <span className="block text-[#FF6B6B] hover:text-[#4ECDC4] transition-colors">
              Zakki Mardhi
            </span>
            Frontend Developer
          </h1>
          <p className="text-xl text-[#2A2A2A]/80">
            Passionate about creating beautiful web experiences with React, Next.js, and modern technologies
          </p>
          <div className="flex gap-4">
            <Button variant="default" size="lg" className="bg-[#FF6B6B] text-[#2A2A2A] font-bold hover:opacity-90">
              <a href="https://github.com/Cuk233" target="_blank" rel="noopener noreferrer">View Github</a>
            </Button>
            <Button variant="default" size="lg" className="bg-[#4ECDC4] text-[#2A2A2A] font-bold hover:opacity-90" asChild>
              <a href="/CV-MuhammadZakkiMardhi_2024.pdf" download>Resume</a>
            </Button>
          </div>
        </div>

        {/* Right side - Featured cards */}
        <div className="relative h-[500px] w-full">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
              className="absolute right-4 top-4 cursor-grab active:cursor-grabbing z-10"
              style={{ rotate: "3deg" }}
            drag
              dragElastic={0.3}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
              whileDrag={{ scale: 1.05, zIndex: 20, rotate: 0 }}
            whileTap={{ cursor: "grabbing" }}
          >
            <Card className="w-64 bg-[#FFE66D] border-2 border-[#2A2A2A] shadow-brutal">
              <CardHeader className="p-4">
                <CardTitle className="text-[#2A2A2A] text-lg">Frontend Dev</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-[#2A2A2A]/80 text-sm">React.js, Next.js, TypeScript, and TailwindCSS</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute right-20 top-[160px] cursor-grab active:cursor-grabbing z-10"
              style={{ rotate: "-3deg" }}
            drag
              dragElastic={0.3}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
              whileDrag={{ scale: 1.05, zIndex: 20, rotate: 0 }}
            whileTap={{ cursor: "grabbing" }}
          >
            <Card className="w-64 bg-[#4ECDC4] border-2 border-[#2A2A2A] shadow-brutal">
              <CardHeader className="p-4">
                <CardTitle className="text-[#2A2A2A] text-lg">Experience</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-[#2A2A2A]/80 text-sm">Frontend Developer at Infosys Solusi Terpadu</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute right-8 top-[320px] cursor-grab active:cursor-grabbing z-10"
              style={{ rotate: "2deg" }}
            drag
                dragElastic={0.3}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
                whileDrag={{ scale: 1.05, zIndex: 20, rotate: 0 }}
            whileTap={{ cursor: "grabbing" }}
          >
            <Card className="w-64 bg-[#FF6B6B] border-2 border-[#2A2A2A] shadow-brutal">
              <CardHeader className="p-4">
                <CardTitle className="text-[#2A2A2A] text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-[#2A2A2A]/80 text-sm">Informatics Engineering at Mercu Buana University</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 