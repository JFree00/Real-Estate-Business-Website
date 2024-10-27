import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: "Urbanist, sans-serif",
      },
      colors: {
        primary: {
          60: "#FF7A00",
          65: "#1A64FF",
          70: "#FF9533",
          75: "#FFCa99",
          90: "#FFE4CC",
          95: "#FFF1E5",
          97: "#FFF7F0",
          99: "#FFFCFA",
        },
        swhite: {
          90: "#E4E4E7",
          95: "#F1F1F3",
          97: "#F7F7F8",
          99: "#FCFCFD",
        },
        sgrey: {
          8: "#141414",
          10: "#1A1A1A",
          15: "#262626",
          20: "#333333",
          30: "#4D4D4D",
          40: "#666666",
          50: "#808080",
          60: "#999999",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
