import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#272829",
          secondary: "#7895CB",
          accent: "#A0BFE0",
          neutral: "#F9FAFB",
          "base-100": "#ffffff",
          warning: "#cfd8dc",
        },
        dark: {
          primary: "#ffffff",
          secondary: "#dddddd",
          accent: "#bbbbbb",
          neutral: "#0E0E0E",
          "base-100": "#181818",
          warning: "#2B2B2B",
        },
      },
    ],
  },
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  darkMode: "class",
  plugins: [daisyui],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//     screens: {
//       xxs: "200px",
//       xs: "540px",
//       sm: "640px",
//       md: "1024px",
//       lg: "1280px",
//       xl: "1920px",
//     },
//   },
//   darkMode: "class",
//   plugins: [],
// };

