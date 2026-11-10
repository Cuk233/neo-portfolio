const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#4DA1A9", "#B8A9FF", "#2A2A2A"];
const PIECES = 60;
const DURATION = 1400;

export function fireConfetti(origin?: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    overflow: "hidden",
    zIndex: "9999",
  });
  document.body.appendChild(overlay);

  for (let i = 0; i < PIECES; i++) {
    const piece = document.createElement("div");
    const size = 6 + Math.random() * 6;
    const round = Math.random() > 0.6;
    Object.assign(piece.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${round ? size : size * 0.5}px`,
      background: COLORS[i % COLORS.length],
      border: "1px solid #2A2A2A",
      borderRadius: round ? "50%" : "1px",
    });
    overlay.appendChild(piece);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 80 + Math.random() * 160;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 120;
    const gravity = 260 + Math.random() * 120;
    const spin = (Math.random() - 0.5) * 1080;

    piece.animate(
      [
        { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx * 0.6}px), calc(-50% + ${dy * 0.6}px)) rotate(${spin * 0.5}deg)`,
          opacity: 1,
          offset: 0.4,
        },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + gravity}px)) rotate(${spin}deg)`,
          opacity: 0,
        },
      ],
      { duration: DURATION * (0.7 + Math.random() * 0.3), easing: "cubic-bezier(0.2, 0.6, 0.4, 1)", fill: "forwards" }
    );
  }

  window.setTimeout(() => overlay.remove(), DURATION + 100);
}
