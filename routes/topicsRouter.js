const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
let con = dbConnection.con;



//topics
router.get('/', (req, res) => {
    let query = 'select * from topics LIMIT 10;';
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
    res.render('topic', {name: topic});
    console.log(topic);
});


module.exports = router;