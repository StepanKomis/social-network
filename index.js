const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const ct = require('./features/topics/createTopic');
const dbConnection = require('./database/connection');
const topics = require('./pages/topics');
const topicRouter = require('./routes/topicsRouter');


const { request } = require('express');
const app = express();
const port = 5000;


//public folder
app.use(express.static(__dirname + '/public'));



//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//viewport
app.set('view engine', 'ejs');

//database connection
let con = dbConnection.con;

//routes
app.use('/topics', topicRouter);

//post methods


//listen on port
app.listen(port);

