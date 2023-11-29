import { defineConfig } from 'vite';
import path from "path"
// const path = require("path");

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist'
    },
    resolve: {
        alias: {
            '@style': path.resolve(__dirname, './src/styles'),
        }
    }
});
