import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "info-box": "url('/images/info-box.png')",
        "btn-menu": "url('/images/btn-menu.png')",
        overlay: "url(/assets/overlay.png)",
      },
      colors: {
        primary: "#FC9B53",
        accent: "#929292",
        gray: {
          10: "#ffffff",
          20: "#b5b5b5",
          30: "#5a5a5a",
          40: "#2e2d2b",
          50: "#393939",
          60: "#4C4638",
          90: "#999999",
        },
        orange: {
          10: "#fffeec",
          20: "#eeedd8",
          30: "#ffedbb",
          40: "#fda043",
          50: "#fd742d",
          60: "#F7F6DC",
          90: "#5e5745",
        },
        blue: {
          10: "#dcf2ff",
          20: "#76b4ee",
          30: "#4d6dcc",
          40: "#3d4ea6",
        },
        red: {
          10: "#e3b695",
          20: "#f08267",
          30: "#f74751",
          40: "#a61d47",
          50: "#4e322f",
        },
        yellow: {
          10: "#ffed93",
          20: "#fed65a",
          30: "#e1b93b",
        },
        mint: {
          10: "#99e7d9",
          20: "#74d3cb",
          30: "#619c88",
        },
      },
      fontSize: {
        bodyXs: "10px",
        bodySm: "12px",
        bodyMd: "14px",
        bodyLg: "16px",
        bodyXl: "20px",
      },
      lineHeight: {
        bodyXs: "12px",
        bodySm: "16px",
        bodyMd: "20px",
        bodyLg: "24px",
        bodyXl: "28px",
      },
      boxShadow: {
        "bottom-2xl": "0px -4px 0px 0px #cccbbd inset",
        "bottom-xl": "0px -2px 0px 0px #cccbbd inset",
        "bottom-2xl-orange-20": "0px -4px 0px 0px #eeedd8 inset",
        "bottom-xl-orange-20": "0px -2px 0px 0px #eeedd8 inset",
        "bottom-xl-gray-20": "0px -2px 0px 0px #b5b5b5 inset",
        "bottom-2xl-gray-20": "0px -4px 0px 0px #b5b5b5 inset",
      },
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-stroke"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-black-border": {
          textShadow: `
            -1px -1px 0 #000,
             1px -1px 0 #000,
            -1px  1px 0 #000,
             1px  1px 0 #000
          `,
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
