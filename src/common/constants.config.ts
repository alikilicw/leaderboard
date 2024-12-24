import { config } from 'dotenv'

config()

type IConstants = {
    DB_URL: string
    ACCESS_TOKEN_SECRET_KEY: string
    MAIL: string
    MAIL_HOST: string
    MAIL_PORT: string
    MAIL_USER: string
    MAIL_PASS: string
    PORT: string
    REDIS_HOST: string
    REDIS_PORT: string
    DEFAULT_PAGINATION_PAGE: number
    DEFAULT_PAGINATION_LIMIT: number
}

export const Constants: IConstants = {
    DB_URL: process.env.DB_URL,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
    MAIL: process.env.MAIL,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    PORT: process.env.PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    DEFAULT_PAGINATION_PAGE: 0,
    DEFAULT_PAGINATION_LIMIT: 15
}
