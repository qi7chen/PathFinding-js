import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import legacy from '@vitejs/plugin-legacy';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        legacy()
    ],
    resolve: {
        extensions: ['.mjs', '.js'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
