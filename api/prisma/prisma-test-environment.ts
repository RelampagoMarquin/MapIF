import { exec } from 'child_process';
import { config } from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { createConnection } from 'mysql2/promise';
import { promisify } from 'util';
import { JestEnvironmentConfig } from '@jest/environment';
import { popular} from './popular';

const crypto = require('crypto');
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
  private connection: any
  private db: string;

  constructor(config: JestEnvironmentConfig) {
    super(config, undefined);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = Number(process.env.DATABASE_PORT);

    this.db = `test_${crypto.randomInt(0, 100)}`;
    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${this.db}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    await execSync(`mysql -u ${process.env.DATABASE_USER} -p${process.env.DATABASE_PASS} -h ${process.env.DATABASE_HOST} -e "CREATE DATABASE IF NOT EXISTS ${this.db}"`);
    await execSync(`${prismaBinary} migrate deploy`);
    this.connection = await createConnection(this.connectionString);
    await this.connection.query(`USE ${this.db}`);
    await this.connection.query(popular)
    return super.setup();
  }

  async teardown() {
    await this.connection.execute(`DROP DATABASE ${this.db}`);
    await this.connection.end();
  }
}
