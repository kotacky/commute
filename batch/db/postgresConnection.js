var Client = require('pg').Client;
var pgConnection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432
});
module.exports = pgConnection;
//# sourceMappingURL=postgresConnection.js.map