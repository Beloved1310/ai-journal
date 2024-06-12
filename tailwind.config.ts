import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
       poppins:["var(--font-poppins)", "sans-serif"],
       montserrat:["var(--font-montserrat)", "sans-serif"]
      },
    },
  },
  plugins: [],
} satisfies Config;
