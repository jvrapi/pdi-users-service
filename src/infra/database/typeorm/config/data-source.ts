import 'dotenv/config';
import { DataSource } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const { NODE_ENV, DATABASE_URL } = process.env;

const sqliteConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './test',
};

const mysqlConfig: MysqlConnectionOptions = {
  type: 'mysql',
  url: DATABASE_URL,
};

const configToUse =
  NODE_ENV.toLowerCase() === 'test' ? sqliteConfig : mysqlConfig;

export const dataSourceOptions = {
  ...configToUse,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
