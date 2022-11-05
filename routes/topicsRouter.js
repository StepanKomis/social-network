const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
const ct = require('../features/topics/createTopic');
const validate = require("validatorjs");
const { promiseImpl } = require('ejs');
const { application } = require('express');
const cp = require('./../features/topics/posts/createPost');  
const func = require('./../features/topicFunctions');
const { result, floor, ceil } = require('lodash');

const con = dbConnection.con;

//topics
router.get('/', (req, res) => {
    let query = 'SELECT * FROM topics ORDER BY id DESC LIMIT 10;';
    con.query(query,(err, result) =>{
        let topics = result;
        query = 'SELECT COUNT(*) as numberOfTopics FROM topics'
        con.query(query,(err, result) =>{    
            let pages = ceil(result[0].numberOfTopics/10);
            res.render('topics/topics', {topicData: topics, numberOfPages: pages});
        });
    });
});

//topic create
router.get('/create', (req, res) => {
    res.render('topics/createTopic');
});

//topic
router.get('/:topic', (req, res) => {
    topic = req.url;
    topic = topic.split('/')[1];
    adrName = topic;
    let query = 'SELECT * FROM topics WHERE addressName="'+topic+'";';
    con.query(query,(err, result) =>{
        const name = result[0].topicName;
        const description = result[0].topicDescription
        query = 'SELECT * FROM posts WHERE topicName = "'+topic+'" ORDER BY id DESC LIMIT 15';
        con.query(query, (err, result) =>{
            const postData = result;
            postData.forEach(element => {
                element.postText = func.short(element.postText, 150);
                let test = element.postText;
            });
            
            res.render('topics/topic', {
                name: name,
                description: description,
                adrName: adrName,
                postData: result
            });
        });
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
        //getting rid of the diacritics from thFROMe name of topic
        addressName = topicData.name.normalize("NFD").replace(/[\u0300-\u036f-\ ]/g, "");
        //checking if topic is already in the database
        const query = 'SELECT * FROM topics WHERE addressName="'+addressName+'";';
        con.query(query, function(err, result) {
            if (result.length > 0) {
                res.send("topic already exists");
                return;
            }
            else{
                ct.createTopic(topicData.name, topicData.description, addressName);
                res.redirect('/');

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
            cp.createPost(data.text, data.name, data.author, data.topic);
            res.redirect('/t/'+req.params.topic);
        }
    })
});

router.get('/:topic/p/:identifier', (req, res)=>{
    const data = {
        topic: req.params.topic,
        post: req.params.post,
    }
    let query = 'SELECT * FROM posts WHERE topicName = "'+data.topic+'" AND id = '+data.post+'';
    con.query(query,(err, result) =>{
        if (result != undefined) {
            let postData = result[0];
            query = 'SELECT topicName, addressName FROM topics WHERE addressName = "'+data.topic+'"';
            con.query(query,(err, result) =>{
                let topicData = result[0];
                res.render('posts/post', {postData: postData, topicData: topicData});
            });
        }
        else{
            res.send('no such post');
        }
    });
});
router.get('/pg/:pageNum', (req, res) =>{
    const data = {
        pageNum: parseInt(req.params.pageNum)*10-10,
    }
    let query = 'SELECT * FROM topics ORDER BY id DESC LIMIT '+data.pageNum+', 10';
    con.query(query, (err, result)=>{
        if (result.length !== 0){
            let topics = result;
            query = 'SELECT COUNT(*) as numberOfTopics FROM topics';
            con.query(query,(err, result) =>{    
                let pages = ceil(result[0].numberOfTopics/10);
                res.render('topics/topics', {topicData: topics, numberOfPages: pages});
            });        }
        else{
            res.send('to much pages');
        }
    });
})
router.get('/:topic/pg/:pageNum', (req, res) =>{
    const data = {

    }

})

module.exports = router;