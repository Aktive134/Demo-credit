import * as dotenv from "dotenv";
dotenv.config();

interface IJWT {
    secret: string;
    issuer: string;
    expires: number;
    subject: string;
    algorithm: string;
}
interface IDATABASE {
    database: string,
    host: string,
    port: number,
    user: string,
    password: string
    test: string
}

interface PRODATABASE {
    database: string,
    host: string,
    user: string,
    password: string,
}

interface IConfig {
    serverPort: string
    saltFactor: number
    dbtest: string
    JWT: IJWT
    Database: IDATABASE
    Production: PRODATABASE
}


const Configuration: IConfig = {
    serverPort: process.env.PORT as string,
    saltFactor: Number(process.env.SALT_FACTOR),
    dbtest: process.env.DB_TEST as string, 
    JWT: {
        secret: process.env.JWT_SECRET as string,
        issuer: process.env.JWT_ISSUER as string,
        subject: process.env.JWT_SUBJECT as string,
        algorithm: process.env.JWT_ALGORITHM as string,
        expires: Number(process.env.JWT_EXPIRES)
    },
    Database: {
        database: process.env.MYSQL_DATABASE_NAME as string,
        host: process.env.MYSQL_HOST as string,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER as string,
        password: process.env.MYSQL_PASSWORD as string,
        test: process.env.DB_TEST as string
    },
    Production: {
        database: process.env.PRODUCTION_DATABASE as string,
        host: process.env.PRODUCTION_HOST as string,
        user: process.env.PRODUCTION_USERNAME as string,
        password: process.env.PRODUCTION_PASSWORD as string
    }
}

export default Configuration;
