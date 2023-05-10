import { exec } from 'child_process';
import { config } from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { createConnection } from 'mysql2/promise';
import { promisify } from 'util';
import { JestEnvironmentConfig } from '@jest/environment';
import { popular} from './popular';

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
  private connectionString: string;

  constructor(config: JestEnvironmentConfig) {
    super(config, undefined);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbName = process.env.DATABASE_NAME;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = Number(process.env.DATABASE_PORT);

    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    await execSync(`mysql -u ${process.env.DATABASE_USER} -p${process.env.DATABASE_PASS} -h ${process.env.DATABASE_HOST} -e "CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE_NAME}"`);
    await execSync(`${prismaBinary} migrate deploy`);
    await execSync(`mysql -u ${process.env.DATABASE_USER} -p${process.env.DATABASE_PASS} -h ${process.env.DATABASE_HOST} -e "USE ${process.env.DATABASE_NAME} ${popular}"`);
    return super.setup();
  }

  async teardown() {
    const connection = await createConnection(this.connectionString);
    await connection.execute(`DROP DATABASE ${process.env.DATABASE_NAME}`);
    await connection.end();
  }
}
