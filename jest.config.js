module.exports = {
  transform: { '.*': '<rootDir>/test-preprocessor' },
  'unmockedModulePathPatterns': [
    '<rootDir>/node_modules/react',
    '<rootDir>/node_modules/react-dom',
    '<rootDir>/node_modules/react-addons-test-utils',
  ],
  'automock':true,
  'testPathIgnorePatterns': [
    '<rootDir>/__tests__/ui',
  ],
}
