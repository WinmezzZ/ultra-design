import path from 'path'
import fs from 'fs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}

fs.rmSync('./lib', { recursive: true, force: true })
fs.rmSync('./es', { recursive: true, force: true })

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
      preserveModules: true,
      dir: 'lib',
      globals
    },
    {
      format: 'es',
      exports: 'named',
      preserveModules: true,
      dir: 'es',
      globals
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'runtime',
      presets: [
        [
          '@babel/preset-env', 
          {
            "modules": false,
            "useBuiltIns": false
          }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      plugins: [
        '@babel/plugin-transform-runtime'
      ]
    }),
    resolve({
      extensions
    }),
    commonjs()
  ]
}

export default config
