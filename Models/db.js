const mysql = require('mysql2');
const db = mysql. createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

db.getConnection((err, connection) => {
    if(err){
        console.error('Database Connection Failed', err.message)
    } else {
        console.log('Connection to database...');
        connection.release();
    }
})

module.exports = db;