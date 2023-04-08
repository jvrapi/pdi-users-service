import { Config } from 'jest';

import jestConfig from './jest.config';

const config: Config = {
  ...jestConfig,
  testRegex: '.unit.spec.ts$',
  coverageDirectory: './coverage/unit',
};

export default config;
