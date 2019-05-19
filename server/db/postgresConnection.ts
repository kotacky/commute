const { Client } = require('pg');

const pgConnection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432
})

module.exports = pgConnection;