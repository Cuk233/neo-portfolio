import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
	  colors: {
		main: 'var(--main)',
		overlay: 'var(--overlay)',
		bg: 'var(--bg)',
		bw: 'var(--bw)',
		blank: 'var(--blank)',
		text: 'var(--text)',
		mtext: 'var(--mtext)',
		border: 'var(--border)',
		ring: 'var(--ring)',
		ringOffset: 'var(--ring-offset)',
		
		secondaryBlack: '#212121',
		coral: '#FF6B6B',
		teal: '#4ECDC4',
		sunny: '#FFE66D',
		sea: '#4DA1A9',
		lilac: '#B8A9FF',
		ink: '#2A2A2A',
	  },
	  borderRadius: {
		base: '5px'
	  },
	  boxShadow: {
		shadow: 'var(--shadow)',
		brutal: '4px 4px 0px 0px #2A2A2A',
		'brutal-sm': '2px 2px 0px 0px #2A2A2A',
		'brutal-lg': '8px 8px 0px 0px #2A2A2A',
	  },
	  translate: {
		boxShadowX: '4px',
		boxShadowY: '4px',
		reverseBoxShadowX: '-4px',
		reverseBoxShadowY: '-4px',
	  },
	  fontWeight: {
		base: '500',
		heading: '700',
	  },
	  animation: {
		marquee: 'marquee 30s linear infinite',
		wiggle: 'wiggle 0.4s ease-in-out',
	  },
	  keyframes: {
		marquee: {
		  from: { transform: 'translateX(0)' },
		  to: { transform: 'translateX(-50%)' },
		},
		wiggle: {
		  '0%, 100%': { transform: 'rotate(0deg)' },
		  '25%': { transform: 'rotate(-3deg)' },
		  '75%': { transform: 'rotate(3deg)' },
		},
	  },
	},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
