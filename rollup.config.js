import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      sourcemap: false,
      plugins: [terser()],
    },
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].mjs',
      sourcemap: false,
      plugins: [terser()],
    },
    {
      dir: 'dist',
      format: 'umd',
      entryFileNames: '[name].umd.js',
      sourcemap: false,
      name: 'electron-file-getter',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({module: 'ESNext'}),
    json()
  ],
  external: ['electron', 'ext-name']
}