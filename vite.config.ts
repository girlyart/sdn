import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          profil: fileURLToPath(new URL('./profil.html', import.meta.url)),
          guru: fileURLToPath(new URL('./guru.html', import.meta.url)),
          kelas: fileURLToPath(new URL('./kelas.html', import.meta.url)),
          fasilitas: fileURLToPath(new URL('./fasilitas.html', import.meta.url)),
          galeri: fileURLToPath(new URL('./galeri.html', import.meta.url)),
          berita: fileURLToPath(new URL('./berita.html', import.meta.url)),
          artikel: fileURLToPath(new URL('./artikel.html', import.meta.url)),
          prestasi: fileURLToPath(new URL('./prestasi.html', import.meta.url)),
          ekstrakurikuler: fileURLToPath(new URL('./ekstrakurikuler.html', import.meta.url)),
          agenda: fileURLToPath(new URL('./agenda.html', import.meta.url)),
          ppdb: fileURLToPath(new URL('./ppdb.html', import.meta.url)),
          kontak: fileURLToPath(new URL('./kontak.html', import.meta.url)),
          notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
