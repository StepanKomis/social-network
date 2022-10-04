const mysql = require('mysql');
const dotenv = require('dotenv').config();

exports.con = mysql.createConnection({
    host:"localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'socialNetwork'
});