import path from 'path';
import fs from 'fs';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const external = ['react', 'react-dom'];

// https://www.npmjs.com/package/@rollup/plugin-babel/v/5.2.1#babelhelpers
const esExtelrnals = [...external, /@emotion\/react/, /@babel\/runtime/];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

fs.rmSync('./lib', { recursive: true, force: true });
fs.rmSync('./es', { recursive: true, force: true });
fs.rmSync('./dist', { recursive: true, force: true });

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

const entryInput = path.resolve('components/index.ts');

componentEnties.push(entryInput);

/** @type{import('rollup').OutputOptions[]}*/
const output = [
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
  {
    format: 'umd',
    file: 'dist/index.js',
    name: 'UltraDesign',
    globals: {
      ...globals,
      '@emotion/react/jsx-runtime': 'jsxRuntime',
      '@emotion/react': 'react$1',
    },
  },
];

const configs = output.map(item => {
  /** @type{import('rollup').RollupOptions*/
  const config = {
    external: item.format === 'umd' ? external : esExtelrnals,
    input: item.format === 'umd' ? entryInput : componentEnties,
    output: item,
    plugins: [
      babel({
        exclude: 'node_modules/**',
        extensions,
        babelHelpers: 'runtime',
        ignore: ['node_modules/**'],
        presets: [
          ['@babel/preset-env', { modules: false }],
          ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }],
          '@babel/preset-typescript',
        ],
        plugins: [['@babel/plugin-transform-runtime', { useEsModules: item.format === 'es' }]],
      }),
      resolve({
        browser: true,
        extensions,
      }),
      commonjs(),
    ],
  };

  return config;
});

export default configs;
