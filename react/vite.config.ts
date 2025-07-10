import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins:- [react()],
  resolve: {
    alias: {
      src: "/src",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // NB: everthing in server block is only for dev, not build
  server: {
    // this allows us to proxy requests to /api right to django because we do not use nginx in development
    proxy: {
      '/api': 'http://django-dev:5000',
    }
  }
})
