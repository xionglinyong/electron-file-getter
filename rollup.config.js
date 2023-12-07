import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        sourcemap: false,
        // plugins: [terser()],
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({module: 'ESNext'}),
      json()
    ],
    external: ['electron', 'ext-name']
  },
  {
    input: 'preload/index.ts',
    output: [
      {
        dir: 'dist/preload',
        format: 'cjs',
        entryFileNames: '[name].cjs',
        sourcemap: false,
        // plugins: [terser()],
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({module: 'ESNext'}),
      json(),
      copy({
        targets: [
          {src: 'preload/index.html', dest: 'dist/preload'}
        ],
      }),
    ],
    external: ['electron']
  }
]