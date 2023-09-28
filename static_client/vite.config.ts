import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@views': path.resolve(__dirname, './src/components/views'),
            '@cards': path.resolve(__dirname, './src/components/cards'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    }
})
