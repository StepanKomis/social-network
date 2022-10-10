const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
const ct = require('../features/createTopic');
const { promiseImpl } = require('ejs');

const con = dbConnection.con;

//topics
router.get('/', (req, res) => {
    let query = 'SELECT * FROM topics ORDER BY id DESC LIMIT 10;';
    con.query(query,(err, result) =>{
        res.render('topics', {topicData: result});

    });
});

//topic create
router.get('/create', (req, res) => {
    res.render('createTopic');
});

//topic
router.get('/:id', (req, res) => {
    topic = req.url;
    topic = topic.split('/')[1];
    const query = 'SELECT * FROM topics WHERE addressName="'+topic+'";';
    con.query(query,(err, result) =>{
        res.render('topic', {name: topic});
        console.log(result);
    });
});

//creating a new topics
router.post("/create", (req, res) => {
    const name = req.body.topicName;
    let addressName = name
    //getting rid of the diacritics from the name of topic
    addressName = name.normalize("NFD").replace(/[\u0300-\u036f-\ ]/g, "");
    //checking if topic is already in the database
    const query = 'SELECT * FROM topics WHERE addressName="'+addressName+'";';    
    con.query(query, function(err, result) {
        console.log(result);
        if (result.length > 0) {
            res.send("topic already exists");
            return;
        }
         else{
            ct.createTopic(name, req.body.topicDescription, addressName);
            res.send('ok');
         }
        });    
});

module.exports = router;