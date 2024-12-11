/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "signup.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(45deg, #0f172a 60%, #082F49 74%, #172554 87%, #0f172a 100%)",
      },
      keyframes: {
        textColorAnimation: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100 50%" },
        },
      },
      animation: {
        textColorAnimation: "textColorAnimation 3s linear infinite",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
