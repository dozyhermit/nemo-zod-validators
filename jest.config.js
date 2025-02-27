module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
  ],
  transform: {
    transform_regex: [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
      },
    ],
  },
};
