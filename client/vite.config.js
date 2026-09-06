import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // The project's .env / .env.example live one level up, at project-1/,
  // not inside client/. This tells Vite to look there instead of its
  // default (the client folder itself).
  envDir: path.resolve(__dirname, '..'),
  server: {
    port: 5173,
  },
});
