import path from 'path';
import fs from 'fs';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const external = [...Object.keys(pkg.devDependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

// IMPORTANT DO THIS!!!
// see https://www.npmjs.com/package/@rollup/plugin-babel/v/5.2.1#babelhelpers
external.push(/@babel\/runtime/);

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

fs.rmSync('./lib', { recursive: true, force: true });
fs.rmSync('./es', { recursive: true, force: true });

const componentsPath = path.join(__dirname, 'components');

const files = fs.readdirSync(componentsPath);

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const componentEnties = files
  .map(name => {
    const comPath = path.join(componentsPath, name);
    const entry = path.join(comPath, 'index.ts');

    const stat = fs.statSync(comPath);

    if (!stat.isDirectory()) return null;

    const hasFile = fs.existsSync(entry);

    if (!hasFile) return null;

    return entry;
  })
  .filter(c => c);

/** @type{import('rollup').RollupOptions*/
const config = {
  external: external,
  input: componentEnties,
  output: [
    {
      format: 'cjs',
      preserveModules: true,
      dir: 'lib',
      exports: 'named',
      globals,
    },
    {
      format: 'es',
      preserveModules: true,
      dir: 'es',
      globals,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'runtime',
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-typescript-to-proptypes'],
    }),
    resolve({
      extensions,
    }),
    commonjs(),
  ],
};

export default config;
