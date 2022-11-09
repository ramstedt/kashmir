/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      DMSans: ["DM Sans", "serif"],
      DMSansMedium: ["DM Sans Medium", "serif"],
      DMSansBold: ["DM Sans Bold", "serif"],
      Mulish: ["Mulish", "serif"],
      MulishLight: ["Mulish Light", "serif"],
      MulishMedium: ["Mulish Medium", "serif"],
      MulishBold: ["Mulish Bold", "serif"],
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    screens: {
      xs: "320px",
      // => @media (min-width: 20px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      cm: "810px",
      // => @media (min-width: 810px) { ... }

      bcm: "890px",
      // => @media (min-width: 890px) { ... }

      lg: "1054px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        cobalt: "#32324D",
        spaceCadet: "#615793",
        bluebell: "#706c89",
        honey: "#FFB01D",
        pumpkin: "#FF7B2C",
        cultured: "#F7F7F7",
        hover: "#162ADE",
      },
      boxShadow: {
        shadow:
          "0px 0px 1px rgba(12, 26, 75, 0.03), 0px 4px 20px -2px rgba(50, 50, 71, 0.04);",
      },
    },
  },
  plugins: [],
};
