export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
