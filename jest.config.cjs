module.exports = {
    //Use 'ts-jest' to handle TypeScript files.
    preset: 'ts-jest',

    //Use 'jest-environment-jsdom' as test environment. JSDOM simulates a browser environment in Node.js.
    testEnvironment: 'jest-environment-jsdom',

    //Specifies where in the project structure the tests can be found.
    roots: ["<rootDir>/src"],

    //Objects that map file extensions to transformers, used to handle non-JS content or transform code.
    transform: {},

    //Specifies which file extensions to treat as ESM (ECMAScript Modules).
    //It helps Jest understand the import/export syntax of these files.
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],

    //Regular expression to match test files.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

    //List of file extensions Jest should use when trying to resolve modules.
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    //Array of paths to files to run before running the test suites.
    //Here you load additional settings or mocks for your tests.
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};