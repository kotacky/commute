const Client = require('pg').Client;
const pgConnection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'easy',
    port: 5432
});
module.exports = pgConnection;