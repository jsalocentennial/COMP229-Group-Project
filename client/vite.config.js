// import react from '@vitejs/plugin-react'    //default layout for vite.config.js
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        manifest: true,
        rollupOptions: {
            input: "./src/main.jsx",
        },
    },
});