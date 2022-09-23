const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const mysql = require('mysql');
const cp = require('./features/createPost')
const dbBoiler = require('./database/boilerplate');
const app = express()
const port = 5000

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//viewport
app.set('view engine', 'ejs');

//database connection
const con = mysql.createConnection({
    host:"localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'socialNetwork'
});

con.connect((err) => {
    if (err) throw(err);
});

//routes
app.get('/postCreate', (req, res) => {
    res.render('createPost');
});

//post methods
app.post("/createPost", (req, res) => {
    cp.cp(req.body.author, req.body.text, req.body.postName);

    console.log(req.body.postText);
    res.send('ok');     
});

//listen on port
app.listen(port);