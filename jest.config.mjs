export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "@swc/jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleDirectories: ["node_modules", "src"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
      isolatedModules: true,
    },
  },
  transformIgnorePatterns: ["/node_modules/(?!(@testing-library/jest-dom)/)"],
};
