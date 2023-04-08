import { Config } from 'jest';

import jestConfig from './jest.config';

const config: Config = {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  testRegex: '.e2e.spec.ts$',
  coverageDirectory: './coverage/e2e',
};

export default config;
