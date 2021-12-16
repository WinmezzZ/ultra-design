const esModules = ['lodash-es', '@emotion/react'].join('|');

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['./tests/setup.ts'],
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },
  transformIgnorePatterns: [`./node_modules/(?!${esModules})`],
  testRegex: '.*\\.(test|spec)\\.(j|t)sx?$',
  collectCoverageFrom: ['./components/**/*.(ts,tsx)'],
  // testMatch: ['./components/**/__tests__/**/*.{spec,test}.{ts,tsx}', './components/**/*.{spec,test}.{ts,tsx}'],
  moduleNameMapper: {
    'tests/(.*)$': './tests/$1',
    '^lodash-es$': 'lodash',
    components: './components/index.ts',
  },
};
