const version = require('./package.json').version

module.exports = {
  preset: 'ts-jest',
  globals: {
    __DEV__: true,
    __VERSION__: version,
    __BROWSER__: false,
    __JSDOM__: true
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/*.ts'],
  watchPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/src/__tests__/**/*spec.ts?(x)']
}
