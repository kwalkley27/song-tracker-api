import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';
import { parse } from 'jsonc-parser';
import type { JestConfigWithTsJest } from 'ts-jest';

const tsconfig = parse(readFileSync('./tsconfig.test.json', 'utf8'));
const compilerOptions = tsconfig.compilerOptions || {};

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm', // ESM preset
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
      useESM: true
    }]
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      useESM: true
    }
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',  // Map .js imports to TypeScript files
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' })
  },
  verbose: true
};

export default config;
