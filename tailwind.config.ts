import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#FFFFFF",
        surface: "#F5F3EE",
        ink: "#1A2620",
        divider: "rgba(26,38,32,0.14)",
        green: {
          100: "#EAF3ED", 200: "#CFE3D6", 300: "#A7CBB6", 400: "#6FA98A",
          500: "#3F8663", 600: "#2A6A4C", 700: "#1B4F37", 800: "#123B28", 900: "#0B2A1C",
        },
        gold: {
          100: "#FDF6E2", 200: "#F8E9BF", 300: "#EED48E", 400: "#DDB855",
          500: "#C79A2E", 600: "#A87E1F", 700: "#856216", 800: "#614710", 900: "#40300B",
        },
        sand: {
          100: "#FCFBF9", 200: "#F1EFE9", 300: "#DCD8CF", 400: "#BEB49B",
          500: "#9C9278", 600: "#7C735E", 700: "#5D5747", 800: "#3F3B30", 900: "#282520",
        },
      },
      fontFamily: { sans: ["var(--font-figtree)", "system-ui", "sans-serif"] },
      borderRadius: { sm: "8px", md: "16px", lg: "28px" },
      maxWidth: { shell: "1240px" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        ringPulse: { "0%,100%": { opacity: "0.25", transform: "scale(1)" }, "50%": { opacity: "0.6", transform: "scale(1.06)" } },
      },
      animation: { rise: "rise .8s ease-out both", ringPulse: "ringPulse 3.2s ease-in-out infinite" },
    },
  },
  plugins: [],
};

export default config;
