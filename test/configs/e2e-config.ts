import { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import { config as dotEnvConfig } from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { join } from 'node:path';
import { readdirSync, unlinkSync } from 'node:fs';

dotEnvConfig({ path: '.env.test' });

export default class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
  }

  async setup() {
    this.clearDatabaseFolder();
  }

  async teardown() {
    this.clearDatabaseFolder();
  }

  clearDatabaseFolder() {
    const databaseFolderPath = join(__dirname, '../databases');
    const files = readdirSync(databaseFolderPath);
    files.forEach((file) => {
      unlinkSync(join(databaseFolderPath, file));
    });
  }
}
