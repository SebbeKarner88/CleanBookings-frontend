module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    roots: ["<rootDir>/src"],
    transform: {},
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
