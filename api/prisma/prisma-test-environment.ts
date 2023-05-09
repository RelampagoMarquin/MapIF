import { exec } from 'child_process';
import { config } from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { createConnection } from 'mysql2/promise';
import { promisify } from 'util';
import { JestEnvironmentConfig } from '@jest/environment';

config({ path: '.env.testing' });
const execSync = promisify(exec);

// Instale o prisma globalmente para não da erro
const prismaBinary = 'prisma';

export declare type EnvironmentContext = {
  console: Console;
  docblockPragmas: Record<string, string | Array<string>>;
  testPath: string;
};

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string;
  private connectionString: string;

  constructor(config: JestEnvironmentConfig) {
    super(config, undefined);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbName = process.env.DATABASE_NAME;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = Number(process.env.DATABASE_PORT);

    this.schema = `test_`;
    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    await execSync(`mysql -u ${process.env.DATABASE_USER} -p${process.env.DATABASE_PASS} -h ${process.env.DATABASE_HOST} -e "CREATE DATABASE IF NOT EXISTS ${this.schema}"`);
    await execSync(`${prismaBinary} migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const connection = await createConnection(this.connectionString);

    await connection.execute(`DROP DATABASE mapif_test`);

    await connection.end();
  }
}
