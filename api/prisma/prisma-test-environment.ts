import type { Config } from '@jest/types';
import { exec } from 'child_process';
import dotenv, { config } from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { createConnection } from 'mysql2/promise';
import util, { promisify } from 'util';
import crypto from 'crypto';
import {JestEnvironmentConfig} from '@jest/environment';

config({ path: '.env.testing' });
const execSync = promisify(exec)

const prismaBinary = './node_modules/.bin/prisma';

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
    const dbName = process.env.DATABASENAME;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;

    this.schema = `test_`;
    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync(`${prismaBinary} migrate deploy`);

    return super.setup();
  }

  async teardown() {
    const connection = await createConnection(this.connectionString);

    await connection.execute(`DROP DATABASE mapif_test`);

    await connection.end();
  }
}