const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
const ct = require('../features/createTopic');

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
    topic = getTopic(topic);
    res.render('topic', {name: topic});
    console.log(topic);
});

//post methods
router.post("/create", (req, res) => {
    ct.createTopic(req.body.topicName, req.body.topicDescription);
    res.send('ok');     
});



module.exports = router;




function getTopic(link) {
    con.query('SELECT * FROM Customers WHERE adressName='+link+';', (err, result) => {
        if(err){
            console.log(err);
            return;
        }
        else{
            topic = result.rows;
            console.log(topicData);
            return topic;
        }     
})};