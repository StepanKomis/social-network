const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const cp = require('./features/createPost');
const dbConnection = require('./database/connection');
const app = express();
const port = 5000;

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//viewport
app.set('view engine', 'ejs');

//database connection
let con = dbConnection.con;

con.connect((err) => {
    if (err) throw(err);
});
const newTopic = {
    name: "test topic",
    description:"This is test description."
}

con.query('INSERT INTO topics (topicName, topicDescription) VALUES ("'+newTopic.name+'","'+newTopic.description+'");');

//routes
app.get('/postCreate', (req, res) => {
    res.render('createPost');
});

//post methods
app.post("/createPost", (req, res) => {
    cp.cp(req.body.author, req.body.text, req.body.postName);
    console.log(req.body);
    res.send('ok');     
});

//listen on port
app.listen(port);