module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["/node_modules/(?!query-string)/"],
  // Usar el transformIgnorePatterns cuando nos salga el error:
  // error SyntaxError: Cannot use import statement outside a module
};
