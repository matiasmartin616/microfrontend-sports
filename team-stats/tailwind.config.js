/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // Incluye el archivo HTML principal
    "./src/**/*.{js,jsx}", // Incluye todos los archivos en src con las extensiones relevantes
  ],
  theme: {
    extend: {}, // Aquí puedes extender los temas de Tailwind si lo deseas
  },
  plugins: [],
};
