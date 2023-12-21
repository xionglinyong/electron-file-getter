import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'

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
      typescript({module: 'ESNext', tsconfig: './tsconfig.rollup.json'}),
      json()
    ],
    external: ['electron', 'ext-name']
  }
]