// Single source of truth for portfolio content.
// Synced with CV_Muhammad_Zakki_Mardhi_2026.pdf

export const profile = {
  name: "Muhammad Zakki Mardhi",
  shortName: "Zakki Mardhi",
  role: "Frontend Developer",
  stack: "TypeScript / React",
  location: "Tangerang, Indonesia",
  email: "zakimardi@gmail.com",
  github: "https://github.com/Cuk233",
  linkedin: "https://www.linkedin.com/in/zaki-mardhi/",
  resume: "/CV_Muhammad_Zakki_Mardhi_2026.pdf",
  summary:
    "Frontend developer building secure, high-volume web platforms for the banking industry. I turn complex financial workflows (maker-checker approvals, reconciliation, batch processing) into interfaces that feel simple, fast, and trustworthy.",
  careerStart: new Date(2023, 11, 1), // 12/2023
};

export const colors = {
  coral: "#FF6B6B",
  teal: "#4ECDC4",
  yellow: "#FFE66D",
  sea: "#4DA1A9",
  lilac: "#B8A9FF",
};

export interface Experience {
  title: string;
  company: string;
  type: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  color: string;
}

export const experiences: Experience[] = [
  {
    title: "Front-end Developer",
    company: "Infosys Solusi Terpadu",
    type: "Full-time",
    location: "Jakarta",
    period: "12/2023 - Present",
    description: [
      "Designed and implemented robust, user-friendly website components and pages with React.js and Next.js for financial clients.",
      "Delivered secure, fully functional websites with cross-functional teams in a regulated banking environment.",
      "Integrated backend APIs using Axios, ensuring seamless and secure data exchange for critical financial operations.",
      "Ensured performance and responsiveness across devices and browsers for a consistent, accessible experience.",
      "Implemented robust form handling and data submission for accurate capture of sensitive information.",
      "Managed state and data flow in complex applications for predictable, trustworthy behaviour.",
      "Maintained high code quality and resolved critical bugs to minimise disruption to financial services.",
      "Championed code reviews and best practices, particularly around security and compliance.",
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "Ant Design", "RTK Query", "Zustand", "Axios", "Vue.js"],
    color: colors.coral,
  },
  {
    title: "Back End Developer",
    company: "GMF AeroAsia",
    type: "Internship",
    location: "Tangerang",
    period: "06/2022 - 08/2022",
    description: [
      "Independently built a CRUD system with PHP and CodeIgniter to monitor document progress and aircraft maintenance.",
      "Experimented with APIs in Postman and integrated REST API data into CodeIgniter applications.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL", "REST API", "Postman"],
    color: colors.yellow,
  },
];

export interface Education {
  title: string;
  school: string;
  period: string;
  detail: string;
  badge?: string;
  color: string;
  emoji: string;
}

export const education: Education[] = [
  {
    title: "Bachelor of Computer Science in Informatics",
    school: "Mercu Buana University",
    period: "Graduated 01/2023",
    detail: "Jakarta. Recipient of the Mercu Buana Scholarship (2019).",
    badge: "GPA 3.69",
    color: colors.teal,
    emoji: "🎓",
  },
  {
    title: "Fullstack Web Developer Bootcamp",
    school: "Purwadhika School",
    period: "12/2022 - 02/2023",
    detail: "Intensive full-stack training: JavaScript, React.js, Tailwind CSS, and APIs with Sequelize & Axios.",
    badge: "Scholarship 2023",
    color: colors.coral,
    emoji: "🚀",
  },
];

export type Rarity = "Enterprise" | "Personal" | "Side Quest";

export interface Project {
  title: string;
  client: string;
  period: string;
  rarity: Rarity;
  emoji: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  stats: { complexity: number; security: number; scale: number };
  color: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: "Back-Office Marketing & CMS Portal",
    client: "Bank Victoria · Infosys Solusi Terpadu",
    period: "08/2024 - Present",
    rarity: "Enterprise",
    emoji: "🏦",
    summary: "Enterprise marketing & CMS portal with a maker-checker approval engine across 7 banking modules.",
    highlights: [
      "Architected the portal with Next.js 14 (App Router), React 18, TypeScript and Ant Design.",
      "Engineered a dual-control (Maker-Checker) approval engine across 7 modules with granular RBAC and Next.js Edge Middleware.",
      "Built voucher management with dynamic cashback rules, escrow reconciliation and bulk batch uploads.",
      "Developed a secure CMS (Monaco Editor + React Quill) with DOMPurify sanitisation to eliminate XSS on mobile banking feeds.",
      "Built an analytics dashboard and server-side reporting with Recharts for high-volume exports.",
    ],
    technologies: ["Next.js 14", "React 18", "TypeScript", "Ant Design", "Edge Middleware", "DOMPurify", "Recharts"],
    stats: { complexity: 5, security: 5, scale: 4 },
    color: colors.coral,
  },
  {
    title: "Virtual Account Customer Portal",
    client: "Bank Victoria · Infosys Solusi Terpadu",
    period: "04/2024 - Present",
    rarity: "Enterprise",
    emoji: "💳",
    summary: "Corporate-client VA portal with source-of-funds, prefix routing and high-throughput batch processing.",
    highlights: [
      "Engineered the portal with Next.js 14, React 18, TypeScript and Ant Design for corporate clients.",
      "Developed VA Source of Funds, dynamic prefix routing and multi-tier Maker-Checker governance.",
      "Architected a batch VA engine with client-side Excel/CSV parsing and real-time schema validation.",
      "Implemented an RTK Query + Axios interceptor data layer with automated token refresh and session recovery.",
    ],
    technologies: ["Next.js 14", "TypeScript", "RTK Query", "Axios", "Ant Design", "ExcelJS"],
    stats: { complexity: 5, security: 5, scale: 5 },
    color: colors.teal,
  },
  {
    title: "Virtual Account Back Office System",
    client: "Bank Victoria · Infosys Solusi Terpadu",
    period: "04/2024 - Present",
    rarity: "Enterprise",
    emoji: "🧾",
    summary: "Back-office VA lifecycle management with automated reconciliation and settlement.",
    highlights: [
      "Architected core back-office modules for VA lifecycle management with Next.js 14, TypeScript and Ant Design.",
      "Built automated reconciliation & settlement: transaction matching, dispute verification and fee calculation.",
      "Implemented a networking layer with a token-refresh mutex, retry queuing and Zustand state sync.",
      "Integrated Ant Design Charts dashboards and async report generation with real-time blob streaming.",
    ],
    technologies: ["Next.js 14", "TypeScript", "Zustand", "Axios", "Ant Design Charts"],
    stats: { complexity: 5, security: 4, scale: 5 },
    color: colors.yellow,
  },
  {
    title: "Mutaba'ah Admin Portal",
    client: "Personal",
    period: "07/2026",
    rarity: "Personal",
    emoji: "📿",
    summary: "Full-stack student character-tracking platform with multi-step evaluations and an admin dashboard.",
    highlights: [
      "Architected a full-stack platform with multi-step evaluation forms and an admin dashboard.",
      "Modular service-oriented Express/Node.js backend with PostgreSQL composite indexing and response compression.",
      "Server-side batch recap reporting with lazy-loaded Excel exports (~500KB saved from the initial bundle).",
    ],
    technologies: ["React", "Express", "Node.js", "PostgreSQL", "ExcelJS"],
    stats: { complexity: 4, security: 3, scale: 3 },
    color: colors.lilac,
  },
  {
    title: "Digital Wallet Admin Portal",
    client: "Infosys Solusi Terpadu",
    period: "12/2023 - 06/2024",
    rarity: "Enterprise",
    emoji: "👛",
    summary: "Admin features and critical fixes for a high-security digital wallet portal.",
    highlights: [
      "Developed administrative features and resolved critical defects using Vue.js.",
      "Improved data visibility, transaction auditing stability and operational efficiency for sensitive workflows.",
    ],
    technologies: ["Vue.js", "Nuxt.js", "JavaScript"],
    stats: { complexity: 3, security: 5, scale: 4 },
    color: colors.sea,
  },
  {
    title: "Document Monitoring System",
    client: "GMF AeroAsia",
    period: "06/2022 - 08/2022",
    rarity: "Enterprise",
    emoji: "✈️",
    summary: "CRUD monitoring system tracking aircraft-maintenance document workflows.",
    highlights: [
      "Developed a CRUD monitoring system with PHP and CodeIgniter for aircraft maintenance workflows.",
      "Streamlined document approval lifecycles and improved real-time visibility in a regulated aviation environment.",
    ],
    technologies: ["PHP", "CodeIgniter", "MySQL"],
    stats: { complexity: 2, security: 3, scale: 2 },
    color: colors.teal,
  },
  {
    title: "Ingredex",
    client: "Side project",
    period: "Live",
    rarity: "Side Quest",
    emoji: "🧴",
    summary: "Cosmetic-ingredient index with pregnancy-safety info and a back-office CMS.",
    highlights: [
      "Full-stack ingredient index with product listings and safety explanations for pregnant women.",
      "Back-office CMS with CSV import, image processing and JWT auth.",
    ],
    technologies: ["Next.js 14", "TypeScript", "MUI", "Supabase", "PostgreSQL", "Zod"],
    stats: { complexity: 4, security: 3, scale: 3 },
    color: colors.coral,
    link: "https://ingredex.vercel.app/",
  },
  {
    title: "Travel Landing Page",
    client: "Side project",
    period: "Live",
    rarity: "Side Quest",
    emoji: "🏝️",
    summary: "Animated travel landing page powered by Sanity headless CMS.",
    highlights: [
      "Modern design with smooth animations and animated service icons.",
      "Content managed through Sanity headless CMS.",
    ],
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Sanity"],
    stats: { complexity: 2, security: 1, scale: 2 },
    color: colors.yellow,
    link: "https://duplicate-project.vercel.app/",
  },
  {
    title: "Backoffice Website",
    client: "Side project",
    period: "Live",
    rarity: "Side Quest",
    emoji: "🗂️",
    summary: "Admin back-office demo with authentication and role-based access control.",
    highlights: ["User authentication and role-based access control.", "Redux state with Axios API layer."],
    technologies: ["Next.js", "TypeScript", "Redux", "Tailwind CSS", "Axios"],
    stats: { complexity: 3, security: 3, scale: 2 },
    color: colors.sea,
    link: "https://backoffice-website.vercel.app/login",
  },
];

export interface SkillGroup {
  name: string;
  items: string[];
  color: string;
  emoji: string;
}

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    emoji: "⌨️",
    items: ["TypeScript", "JavaScript", "HTML5", "CSS", "SQL", "PHP", "Python"],
    color: colors.coral,
  },
  {
    name: "Frontend",
    emoji: "🎨",
    items: ["React.js", "Next.js (App & Pages)", "Vue.js", "Nuxt.js", "Ant Design", "Tailwind CSS", "RTK Query", "Zustand", "Recharts", "Chart.js"],
    color: colors.teal,
  },
  {
    name: "Backend & Database",
    emoji: "🗄️",
    items: ["Node.js", "Express.js", "PostgreSQL", "MySQL", "Supabase", "Sequelize", "CodeIgniter"],
    color: colors.yellow,
  },
  {
    name: "APIs & Security",
    emoji: "🔐",
    items: ["REST APIs", "Axios Interceptors", "Token Refresh Mutex", "RBAC", "Edge Middleware", "DOMPurify (XSS)", "ExcelJS Blob Streaming"],
    color: colors.lilac,
  },
  {
    name: "Ways of Working",
    emoji: "🤝",
    items: ["Maker-Checker / Dual Control", "Financial Reconciliation", "Performance Optimization", "State Management", "Code Review", "UAT / SIT"],
    color: colors.sea,
  },
];

export const marqueeItems = [
  "React", "Next.js", "TypeScript", "Ant Design", "RTK Query", "Zustand", "Tailwind", "Vue", "Node.js",
  "PostgreSQL", "Supabase", "Framer Motion", "RBAC", "Maker-Checker", "DOMPurify",
];

export function yearsOfExperience(now = new Date()) {
  const ms = now.getTime() - profile.careerStart.getTime();
  return Math.max(1, Math.floor(ms / (365.25 * 24 * 3600 * 1000) + 0.1));
}

export function totalTechnologies() {
  return new Set(skills.flatMap((s) => s.items)).size;
}
