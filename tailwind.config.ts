import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#090b0e",
        secondary: "#1b1c21",
        textColor: "#646464",
        lightPurple: "#9F57F8",
        darkPurple: "#9038FF",
      },
      transitionTimingFunction: {
        "out-quad": "cubic-bezier( 0.250,  0.460,  0.450,  0.940 )",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
