import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        basicSsl(),
        VitePWA({
            workbox: {
                sourcemap: true,
            },
            registerType: 'autoUpdate',
            manifest: {
                name: 'Clockify Time Tracker',
                short_name: 'Clockwise',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                lang: 'en',
                scope: '/',
                icons: [
                    {
                        src: '/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
                theme_color: '#ffffff',
            },
        }),
    ],
    server: {
        port: 3000,
        https: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./.test/setup.js'],
        include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*',
        ],
    },
})
