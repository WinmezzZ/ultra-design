module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./tests/setup.ts'],
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },
  // testRegex: '.*\\.(test|spec)\\.(j|t)sx?$',
  // collectCoverageFrom: ['./components/**/*.(ts,tsx)'],
  testMatch: ['**/__tests__/**/*.{spec,test}.[jt]s?(x)'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    components: './components/index.ts',
  },
};
