import type { Knex } from "knex";
import dotenv from "dotenv";
import configuration from "../config/index"
dotenv.config();

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      database: "demo_credit",
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "Uraynus134"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

export default config
