import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

const isDev = process.env.NODE_ENV === 'development';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/feedback-king.js',
    format: 'umd',
    name: 'FeedbackKing',
    sourcemap: true
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist'
    }),
    postcss({
      extract: true,
      minimize: !isDev
    }),
    isDev && serve({
      open: true,
      contentBase: ['dist', 'demo'],
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }),
    isDev && livereload('dist')
  ].filter(Boolean)
};