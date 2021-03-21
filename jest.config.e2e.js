module.exports = {
  testMatch: ["**/testE2e/**/*.spec.ts"],
  verbose: false,
  globalSetup: '<rootDir>/src/testE2e/ts/global-setup.js',
  globalTeardown: '<rootDir>/src/testE2e/ts/global-teardown.js',
  testEnvironment: '<rootDir>/src/testE2e/ts/puppeteer-environment.js',
  setupFilesAfterEnv: ['expect-puppeteer', './jest.setup.timeout.e2e.js'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/src/main/webapp/"
  ],
  testResultsProcessor: 'jest-junit',
  reporters: [ 'default',
    ['jest-junit', {
      suiteName: 'puppeteer e2e tests',
      outputDirectory: '<rootDir>/build/reports/testE2e',
      outputName: 'puppeteer-results.xml'
    }] ]
};
