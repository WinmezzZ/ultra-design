import path from 'path'
import fs from 'fs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const componentsPath = path.join(__dirname, 'src/components')

const files = fs.readdirSync(componentsPath)

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const componentEnties = files.map(name => {
  const comPath = path.join(componentsPath, name)
  const entry = path.join(comPath, 'index.ts')

  const stat = fs.statSync(comPath)
  if (!stat.isDirectory()) return null

  const hasFile = fs.existsSync(entry)
  if (!hasFile) return null
  
  return entry
}).filter(c => c)

/** @type{import('rollup').RollupOptions*/
const config = {
  external: ['react', 'react-dom'],
  input: componentEnties,
  output: [
    {
      format: 'commonjs',
      exports: 'named',
      preserveModules: false,
      dir: 'lib',
    },
    {
      format: 'es',
      preserveModules: true,
      dir: 'es',
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'runtime'
    }),
    resolve({
      extensions
    }),
    commonjs()
  ]
}

export default config
