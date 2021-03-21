module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    testPathIgnorePatterns: ["/testE2e/"],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    testResultsProcessor: "jest-sonar-reporter",
    collectCoverageFrom: [
        "**/*.ts",
        "!**/*.{js,jsx}",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/src/testE2e/ts/**"
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/*.ts"
    ],
    coverageDirectory: '<rootDir>/build/reports/units/coverage',
    testURL: 'http://localhost:8180'
}
