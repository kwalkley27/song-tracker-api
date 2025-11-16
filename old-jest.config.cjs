const { pathsToModuleNameMapper } = require('ts-jest');
const { readFileSync } = require('fs');
const { parse } = require('jsonc-parser');

const tsconfig = parse(readFileSync('./tsconfig.test.json', 'utf8'));
const compilerOptions = tsconfig.compilerOptions || {};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  //preset: 'ts-jest',
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/*.test.ts',
    '**/*.spec.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      //useESM: false
      useESM: true
    }]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',  // Map .js imports to TypeScript files
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' })
  },
};