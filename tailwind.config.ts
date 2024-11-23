import type { Config } from "tailwindcss";
import plugin from "tailwindcss-animate";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Urbanist, sans-serif",
      },
      colors: {
        pprimary: {
          60: "#703BF7",
          65: "#8254F8",
          70: "#946CF9",
          75: "#A685FA",
          90: "#DBCEFD",
          95: "#EDE7FE",
          97: "#F4F0FE",
          99: "#FBFAFF",
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
          17: "#2A2A2A",
          20: "#333333",
          30: "#4D4D4D",
          40: "#666666",
          50: "#808080",
          60: "#999999",
        },
      },
      screens: {
        "2xl": "1700px",
        tablet: "700px",
        laptop: "1245px",
        desktop: "1700px",
      },
    },
  },
  plugins: [plugin],
} satisfies Config;
