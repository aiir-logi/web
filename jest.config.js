module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    testPathIgnorePatterns: ["/testE2e/"],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    reporters: [ 'default',
      ['jest-junit', {
        suiteName: "unit tests",
        suiteNameTemplate: "{filename}",
        outputDirectory: '<rootDir>/build/test-results/units',
        outputName: 'unit-results.xml'
      }] ],
    testResultsProcessor: "jest-sonar-reporter",
    collectCoverageFrom: [
        "**/*.ts",
        "!**/*.mock.ts",
        "!**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/src/testE2e/ts/**",
        "!**/src/main/webapp/main.ts",
        "!**/src/main/webapp/polyfills.ts",
        "!**/*environment*.ts",
        "!**/*module.ts"
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/*.ts"
    ],
    coverageDirectory: '<rootDir>/build/reports/units/coverage'
}
