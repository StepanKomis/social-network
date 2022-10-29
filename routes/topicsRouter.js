const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
const ct = require('../features/topics/createTopic');
const validate = require("validatorjs");
const { promiseImpl } = require('ejs');
const { application } = require('express');
const cp = require('./../features/topics/posts/createPost');  

const con = dbConnection.con;

//topics
router.get('/', (req, res) => {

    let query = 'SELECT * FROM topics ORDER BY id DESC LIMIT 10;';
    con.query(query,(err, result) =>{
        res.render('topics/topics', {topicData: result});
    });
});

//topic create
router.get('/create', (req, res) => {
    res.render('topics/createTopic');
});

//topic
router.get('/:id', (req, res) => {
    topic = req.url;
    topic = topic.split('/')[1];
    adrName = topic;
    console.log(adrName);
    const query = 'SELECT * FROM topics WHERE addressName="'+topic+'";';
    con.query(query,(err, result) =>{
        const name = result[0].topicName;
        const description = result[0].topicDescription
        res.render('topics/topic', {name: name, description: description, adrName: adrName});
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
        console.log(addressName);
        //checking if topic is already in the database
        const query = 'SELECT * FROM topics WHERE addressName="'+addressName+'";';
        con.query(query, function(err, result) {
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

router.get('/:topic/new', (req, res) => {
    res.render('posts/createNew', {topicName: req.params.topic});
});

router.post('/:topic/created', (req, res) => {
    const postName = req.body.postName;
    console.log(postName);
    const uniqueQuery = 'SELECT * FROM posts WHERE postName="'+postName+'";';
    con.query(uniqueQuery,(err, result) =>{
        if (result.length > 0) {
            res.send("post already exists");
            return;
        }
        else{
            const data = {
                topic: req.params.topic,
                name: req.body.postName,
                author: req.body.author,
                text: req.body.postText
            }
            
            if (data.author === undefined || data.author ===''){
                data.author = 'Anonimous';
            }
            console.log(data);
            cp.createPost(data.text, data.name, data.author, data.topic);
        
            const idQuery = 'SELECT id FROM posts WHERE postName = "'+data.name+'"';
            con.query(idQuery,(err, result) =>{
                id = result[0].id;
                console.log('id: '+id);
                res.redirect('/t/'+req.params.topic+'/p/'+id);
            });
        }
    })
});
    

router.get('/:topic/p/:post', (req, res)=>{
    res.send('lol')
});


module.exports = router;