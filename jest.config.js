module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  // Test spec file resolution pattern
  // filename should contain `.test`.
  testMatch: [
    // Run all specs
    '**/**/*.spec.+(ts|tsx|js)',
    // Run single spec
    // '**/**/login.spec.tsx'
  ],

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Use babel config
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
};
