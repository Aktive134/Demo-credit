import type { Knex } from "knex";
import dotenv from "dotenv";
import configuration from "../config/index"
dotenv.config();

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      database: configuration.Database.database,
      host: configuration.Database.host,
      port: configuration.Database.port,
      user: configuration.Database.user,
      password: configuration.Database.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: "mysql2",
    connection: {
      host: configuration.Production.host,
      port: configuration.Production.port,
      user: configuration.Production.user,
      password: configuration.Production.password,
      database: configuration.Production.database,
    },
    migrations: {
      tableName: "migrations",
      directory: "../../dist/database/migrations",
    },
  },

  test: {
    client: "mysql2",
    connection: {
      database: configuration.dbtest,
      host: configuration.Database.host,
      port: configuration.Database.port,
      user: configuration.Database.user,
      password: configuration.Database.password
    },
    migrations: {
      tableName: "migrations",
      directory: "../../dist/database/migrations",
    },
  },
};

export default config
