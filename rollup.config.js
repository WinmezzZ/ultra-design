import path from 'path'
import fs from 'fs'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const componentsPath = path.join(__dirname, 'src/components')

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}


const files = fs.readdirSync(componentsPath)

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const config = files.map(name => {
  const comPath = path.join(componentsPath, name)
  const entry = path.join(comPath, 'index.ts')

  const stat = fs.statSync(comPath)
  if (!stat.isDirectory()) return null

  const hasFile = fs.existsSync(entry)
  if (!hasFile) return null
  
  /** @type{import('rollup').RollupOptions*/
  const config = {
    external: ['react', 'react-dom'],
    input: {
      [name]: entry
    },
    output: [
      {
        format: 'commonjs',
        exports: 'named',
        dir: 'lib',
        globals,
      },
      {
        format: 'es',
        exports: 'named',
        dir: 'es',
        globals,
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        extensions,
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        babelHelpers: 'inline'
      }),
      resolve({
        browser: true,
        extensions
      })
    ]
  }

  return config
}).filter(c => c)

console.log(config)

export default config

// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     outDir: '',
//     rollupOptions: {
//       // 确保外部化处理那些你不想打包进库的依赖
//       external: ['react', 'react-dom'],
//       input: componentEnties,
//       output: [
//         {
//           format: 'commonjs',
//           exports: 'named',
//           dir: 'lib',
//           globals,
//         },
//         {
//           format: 'es',
//           exports: 'named',
//           dir: 'es',
//           globals,
//         }
//       ]
//     }
//   },
//   plugins: [react()]
// })
