# Muhammad Zakki Mardhi — Neo Portfolio

A playful Neobrutalist developer portfolio built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Showcases enterprise banking frontend engineering, fullstack builds, and interactive UI experiments.

## Key Interactive Features

- **Draggable Hero Sticker Playground & Confetti CV**: Physics-enabled draggable stickers and custom canvas confetti bursts triggered on resume downloads.
- **3D Collectible Project Trading Cards**: Interactive 3D-flipping trading cards with rarity badges, stat bars, and native `<dialog>` architecture case study modals.
- **Maker-Checker Banking RBAC Sandbox**: Live interactive simulator demonstrating dual-control banking approval workflows (`Maker`, `Checker`, and `Viewer` roles) with a real-time audit trail.

## Project Structure

```text
├── app/                  # Next.js App Router layout, root page, and global styles
├── components/
│   ├── layout/           # Site chrome (Navbar, Footer)
│   ├── sections/         # Portfolio page sections (Hero, Skills, Experience, Maker-Checker, Projects, etc.)
│   ├── fun/              # Interactive micro-experiences (Confetti, Marquee, Draggable Stickers)
│   └── ui/               # Reusable Neobrutalist UI primitives (Button, Badge)
└── lib/
    ├── data.ts           # Typed portfolio content, projects, experience, and color tokens
    └── utils.ts          # Classname merging utility (cn)
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build
npm start
```

### Docker Support

```bash
docker compose up --build
```
