/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,ts,js}",
    "./layouts/**/*.{vue,ts,js}",
    "./pages/**/*.{vue,ts,js}",
    "./plugins/**/*.{ts,js}",
    "./app.vue",
    "./nuxt.config.ts",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
