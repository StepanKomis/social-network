const mysql = require('mysql');
const express = require('express');
const dbConnection = require('../database/connection');
const app = express();
const con = dbConnection.con;

function databaseFetch () {

};

exports.databaseFetch= () => {
    
    let queryResult = con.query('SELECT * FROM topics;', (err, result, fields) =>{
        let queryResult = result;
        return queryResult;
    });
};