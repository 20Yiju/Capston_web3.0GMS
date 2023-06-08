var mysql = require('mysql');
const db = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'Mcnl2021!',
    database : 'root'
});

module.exports = db;
