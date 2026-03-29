import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Fraunces"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
        accent: ['"Fraunces"', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "warm-bg": "#FFF8F0",
        "warm-gray": {
          50: "#FFF8F0",
          100: "#FFF3E4",
          200: "#FFE8D0",
          300: "#D4CABC",
        },
        coral: {
          light: "#F4A698",
          DEFAULT: "#E8725A",
          dark: "#D4614C",
        },
        sage: {
          light: "#B5D4B5",
          DEFAULT: "#7BA87B",
          dark: "#5A8A5A",
        },
        gold: {
          light: "#F2D49B",
          DEFAULT: "#E5A94E",
          dark: "#C08930",
        },
        sky: {
          DEFAULT: "#7EB8D8",
        },
        lavender: {
          DEFAULT: "#B8A9D4",
        },
        "brown-deep": "#2D2319",
        "brown-mid": "#5C4A3A",
        "brown-light": "#8B7355",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "blob-morph": {
          "0%": { clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" },
          "25%": { clipPath: "polygon(20% 10%, 80% 5%, 95% 35%, 90% 75%, 75% 95%, 25% 90%, 5% 65%, 10% 25%)" },
          "50%": { clipPath: "polygon(35% 5%, 75% 10%, 90% 40%, 95% 65%, 65% 95%, 30% 85%, 10% 60%, 5% 30%)" },
          "75%": { clipPath: "polygon(25% 5%, 80% 10%, 100% 25%, 85% 70%, 70% 90%, 20% 95%, 5% 70%, 15% 20%)" },
          "100%": { clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" },
        },
        "gentle-float": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
          "100%": { transform: "translateY(0)" },
        },
        "gentle-sway": {
          "0%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
          "100%": { transform: "rotate(-2deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "blob-morph": "blob-morph 8s ease-in-out infinite",
        "gentle-float": "gentle-float 6s ease-in-out infinite",
        "gentle-sway": "gentle-sway 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
