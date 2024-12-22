import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import image from '@rollup/plugin-image';
import babel from 'vite-plugin-babel';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      jsx: 'react-jsx',
    }),
    createHtmlPlugin({
      entry: '/src/index.js',
      template: '/public/index.html',
    }),
    image(),
    babel({
      babelConfig: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic', // Set JSX runtime to automatic
            },
          ],
        ],
      },
    }),
    tsconfigPaths(),
  ],
  esbuild: {
    jsx: 'automatic',
  },
});
