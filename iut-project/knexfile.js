// knexfile.js
'use strict';

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || '0.0.0.0',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'hapi',
            database: process.env.DB_DATABASE || 'user',
            port: process.env.DB_PORT || 3306
        }
    },
    production: {
        client: 'mysql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};