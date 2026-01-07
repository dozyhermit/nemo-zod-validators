module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testMatch: ['**/__tests__/**/*.test.ts'],
  testTimeout: 15000,
};
