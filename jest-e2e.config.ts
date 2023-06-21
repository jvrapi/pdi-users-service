import { Config } from 'jest';

import jestConfig from './jest.config';

const config: Config = {
  ...jestConfig,
  testEnvironment: './test/configs/e2e-config.ts',
  testRegex: '.e2e.spec.ts$',
  coverageDirectory: './coverage/e2e',
};

export default config;
