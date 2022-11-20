const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
const ct = require('../features/topics/createTopic');
const validate = require("validatorjs");


const con = dbConnection.con;


router.get('/:post', (req, res)=>{
    const data = {
        post: req.params.post,
    }
    let query = 'SELECT * FROM posts WHERE id = '+data.post;
    con.query(query,(err, result) =>{
        if (result != undefined) {
            let postData = result[0];
            query = 'SELECT topicName, addressName FROM topics WHERE addressName = "'+postData.topicName+'"';
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
router.get('/new', (req, res)=>{
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

module.exports = router;