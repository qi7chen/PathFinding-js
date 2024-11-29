import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';



// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
    ],
    resolve: {
        extensions: ['.mjs', '.js'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
