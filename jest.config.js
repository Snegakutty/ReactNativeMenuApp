// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  // Tell Jest where to find your test files
  testMatch: ['**/src/tests/**/*.test.ts'],
  // Coverage configuration
  collectCoverage: false, // Set to true to collect coverage by default
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  // Files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.test.ts',
    '!src/**/*.d.ts',
    '!src/tests/**',
    '!src/app.ts', // Exclude app.ts (mostly setup code)
    '!src/config/db.ts', // Exclude db.ts (infrastructure/config code, MySQL path not testable)
  ],
  // Coverage thresholds (optional - uncomment to enforce minimum coverage)
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // }
};