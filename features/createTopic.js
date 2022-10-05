const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const dbBoiler = require('../database/boilerplate');
const dbConnection = require('../database/connection');
const express = require('express');
const app = express();

let con = dbConnection.con;

//creating topic section
exports.createTopic = (name, description) => {
    console.log('test');
    console.log('topic name:' + name + ', '+ 'description' + description);
    con.query('INSERT INTO topics (topicName, topicDescription) VALUES ("'+name+'","'+description+'");');
};
