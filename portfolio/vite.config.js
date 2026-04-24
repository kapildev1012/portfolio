import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Increase chunk warning limit
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Smart chunk splitting — heavy libs get their own chunks
        manualChunks: {
          // Core React
          'vendor-react': ['react', 'react-dom'],
          // Animation libraries
          'vendor-motion': ['framer-motion', 'motion'],
          // GSAP
          'vendor-gsap': ['gsap'],
          // 3D (heaviest — isolated so it loads separately)
          'vendor-3d': ['@splinetool/react-spline'],
          // UI libraries
          'vendor-ui': ['lucide-react'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild',
  },
})
