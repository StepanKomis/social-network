const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
const ct = require('../features/topics/createTopic');
const validate = require("validatorjs");
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
        const name = result[0].topicName;
        const description = result[0].topicDescription
        res.render('topic', {name: name, description: description});
        console.log(result);
    });
});

//creating a new topics
router.post("/create", (req, res) => {
    //parsing data from post method
    const topicData = {
        name: req.body.topicName,
        description: req.body.topicDescription
    };
    let addressName = topicData.name;

    const valRules = {
        name: 'required|string',
        description:'required|string'
    }

    //validating post data
    const validation = new validate(topicData, valRules);
    
    //if validation was succsesful
    validation.passes(()=>{
        //getting rid of the diacritics from the name of topic
        addressName = topicData.name.normalize("NFD").replace(/[\u0300-\u036f-\ ]/g, "");

        //checking if topic is already in the database
        const query = 'SELECT * FROM topics WHERE addressName="'+addressName+'";';
        con.query(query, function(err, result) {
            console.log(result);
            if (result.length > 0) {
                res.send("topic already exists");
                return;
            }
            else{
                ct.createTopic(topicData.name, topicData.description, addressName);
                res.send('ok');
            }
        });
    });
    //if validation was unsuccsesful
    validation.fails(()=>{
        res.send('validation failed');
    });
});

module.exports = router;