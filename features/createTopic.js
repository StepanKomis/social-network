const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const dbBoiler = require('../database/boilerplate');
const dbConnection = require('../database/connection');
const express = require('express');
const Latinise = require('../latinise');
const app = express();

let con = dbConnection.con;

//creating topic section
exports.createTopic = (name, description) => {
    let adressName = name
    adressName = name.normalize("NFD").replace(/[\u0300-\u036f-\ ]/g, "");
    console.log('topic name:' + name + ', description: ' + description + ', adressName: ' + adressName);
    con.query('INSERT INTO topics (topicName, topicDescription, adressName) VALUES ("'+name+'","'+description+'","'+adressName+'");');
};
