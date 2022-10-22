const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const dbBoiler = require('../../database/boilerplate');
const dbConnection = require('../../database/connection');
const express = require('express');
const app = express();

let con = dbConnection.con;

//creating topic section
exports.createTopic = (name, description, addressName) => {
            console.log('topic name:' + name + ', description: ' + description + ', addressName: ' + addressName);
            con.query('INSERT INTO topics (topicName, topicDescription, addressName) VALUES ("'+name+'","'+description+'","'+addressName+'");');
};