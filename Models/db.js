const mysql = require('mysql2/promise');
const db = mysql. createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Connection to database Succes");
        connection.release();
    } catch (error) {
        console.error('Database Connection Failed', error.message)
    }
})();

module.exports = db;