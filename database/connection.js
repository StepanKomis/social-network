const mysql = require('mysql');

exports.con = mysql.createConnection({
    host:"localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'socialNetwork'
});