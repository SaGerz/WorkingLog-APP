const mysql = require('mysql2');
const db = mysql. createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'activity_logs'
})

db.getConnection((err, connection) => {
    if(err){
        console.error('Database Connection Failed', err.message)
    } else {
        console.log('Connection to database...');
        connection.release();
    }
})

module.exports = db;