import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Cuk233",
      icon: <Github className="w-6 h-6" />,
      color: "#FF6B6B"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/zaki-mardhi/",
      icon: <Linkedin className="w-6 h-6" />,
      color: "#4ECDC4"
    },
  ];

  return (
    <footer className="bg-bw border-t-2 border-[#2A2A2A] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-[${link.color}] text-[#2A2A2A] border-2 border-[#2A2A2A] rounded-base hover:translate-y-[-4px] transition-transform`}
              >
                {link.icon}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[#2A2A2A] font-bold mb-2">Muhammad Zakki Mardhi</p>
            <p className="text-[#2A2A2A]/60">Frontend Developer</p>
          </div>
          <p className="text-[#2A2A2A]/60 text-sm">
            © {new Date().getFullYear()} - Built with Next.js and Neobrutalism Design
          </p>
        </div>
      </div>
    </footer>
  );
} 