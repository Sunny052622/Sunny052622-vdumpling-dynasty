import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'helmet-vendor': ['react-helmet-async'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification (using esbuild which is faster and built-in)
    minify: 'esbuild',
    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline small assets (< 4kb)
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps for production
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
