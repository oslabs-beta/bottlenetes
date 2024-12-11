/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "signup.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      screens: {
        "md-lg": "900px",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(45deg, #0F172A 55%, #1B274D 70%, #2F3E5C 85%, #0F172A)",
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

//"linear-gradient(45deg, #0f172a 30%, #082f49 55%, #172554 77%, #0f172a 100%)",
// "linear-gradient(135deg, #1E293B, #312E81, #3B4D71, #415A77)",
// "linear-gradient(135deg, #1C2A3A, #2A2E61, #224D52, #364156)",
// "linear-gradient(135deg, #1B264F, #283A73, #3D2C59, #2F3E5C)",
