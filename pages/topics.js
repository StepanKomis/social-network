const mysql = require('mysql');
const express = require('express');
const dbConnection = require('../database/connection');
const app = express();
const con = dbConnection.con;

exports.topicRender =  (res) => {
    con.query('SELECT * FROM topics;',(err, result) =>{
        console.log(result);
        res.render('topics');
    });
};