const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const ct = require('./features/createTopic');
const dbConnection = require('./database/connection');
const topics = require('./pages/topics');
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

/*
con.connect((err) => {
    if (err) throw(err);
});
*/

//routes
app.get('/createTopic', (req, res) => {
    res.render('createTopic');
});

app.get('/topics', (req, res) => {
    res.render('topics');
    topics.databaseFetch();
});

//post methods
app.post("/createTopic", (req, res) => {
    ct.createTopic(req.body.topicName, req.body.topicDescription);
    res.send('ok');     
});

//listen on port
app.listen(port);