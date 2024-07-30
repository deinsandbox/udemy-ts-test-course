import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app'
const baseDirTest = '<rootDir>/src/app'

const config : Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`,
    ],
    testMatch: [
        `${baseDirTest}/**/*.test.ts`,
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],

}

export default config