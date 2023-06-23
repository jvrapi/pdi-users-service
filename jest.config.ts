import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testEnvironment: 'node',
  setupFiles: ['./test/jest-setup.ts'],
  testRegex: '.spec.ts$',
  coverageDirectory: './coverage',
};

export default config;
