const mysql = require('mysql');
const express = require('express');
const dbConnection = require('../database/connection');
const app = express();
const con = dbConnection.con;

let query = 'SELECT * FROM topics ORDER BY id DESC;';

exports.dataShorter =  (res) => {

    
};