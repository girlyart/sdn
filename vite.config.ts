import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          profil: path.resolve(__dirname, 'profil.html'),
          guru: path.resolve(__dirname, 'guru.html'),
          kelas: path.resolve(__dirname, 'kelas.html'),
          fasilitas: path.resolve(__dirname, 'fasilitas.html'),
          galeri: path.resolve(__dirname, 'galeri.html'),
          berita: path.resolve(__dirname, 'berita.html'),
          artikel: path.resolve(__dirname, 'artikel.html'),
          prestasi: path.resolve(__dirname, 'prestasi.html'),
          ekstrakurikuler: path.resolve(__dirname, 'ekstrakurikuler.html'),
          agenda: path.resolve(__dirname, 'agenda.html'),
          ppdb: path.resolve(__dirname, 'ppdb.html'),
          kontak: path.resolve(__dirname, 'kontak.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
