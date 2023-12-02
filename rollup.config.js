import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts', // 打包入口
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs.js',
      sourcemap: false, // 是否输出sourcemap,
      plugins: [terser()],
    },
    {
      dir: 'dist',
      format: 'esm',
      entryFileNames: '[name].esm.js',
      sourcemap: false, // 是否输出sourcemap
    },
    {
      dir: 'dist',
      format: 'umd',
      entryFileNames: '[name].umd.js',
      name: 'FE_utils', // umd模块名称，相当于一个命名空间，会自动挂载到window下面
      sourcemap: false,
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