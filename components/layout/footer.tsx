"use client";

import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { colors, profile } from "@/lib/data";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: profile.github,
      icon: <Github className="w-5 h-5" aria-hidden="true" />,
      color: colors.coral,
    },
    {
      name: "LinkedIn",
      url: profile.linkedin,
      icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
      color: colors.teal,
    },
    {
      name: "Email",
      url: `mailto:${profile.email}`,
      icon: <Mail className="w-5 h-5" aria-hidden="true" />,
      color: colors.yellow,
    },
  ];

  return (
    <footer id="contact" className="bg-white border-t-2 border-ink py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-base border-2 border-ink bg-sunny p-6 sm:p-10 shadow-brutal-lg mb-12 text-center space-y-5">
          <h2 className="text-3xl sm:text-5xl font-heading text-ink">
            Let&apos;s build something ✦
          </h2>
          <p className="text-ink/90 max-w-xl mx-auto text-sm sm:text-base">
            Need someone who can ship clean, resilient React &amp; Next.js interfaces for complex workflows? Drop me a line.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-base border-2 border-ink bg-coral px-5 py-2.5 text-sm sm:text-base font-heading text-ink shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 rounded-base border-2 border-ink bg-white px-4 py-2.5 text-sm sm:text-base font-heading text-ink shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-sea" aria-hidden="true" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copy email
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-ink font-heading text-lg">{profile.name}</p>
            <p className="text-ink/70 text-sm">
              {profile.role} ({profile.stack}) · {profile.location}
            </p>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.name}
                style={{ backgroundColor: link.color }}
                className="p-3 text-ink border-2 border-ink rounded-base shadow-brutal-sm hover:-translate-y-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 pt-6 border-t-2 border-dashed border-ink/20 text-center text-ink/70 text-xs sm:text-sm">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js &amp; a lot of ☕
        </p>
      </div>
    </footer>
  );
}
