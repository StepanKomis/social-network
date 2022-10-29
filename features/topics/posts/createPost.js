const dbConnection = require('../../../database/connection');
const express = require('express');
const { query } = require('express');
const con = dbConnection.con;

function getDate (){
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    date = year + '/' + month + '/' + day;
    return date;
};

exports.createPost = (text, name, author, topicName) =>{
    const date = getDate();
    console.log('topic name: '+topicName)
    const query = 'INSERT INTO posts (postName, postText, author, topicName, creationDate) VALUES ("'+name+'","'+text+'","'+author+'", "'+topicName+'","'+date+'");';
    con.query(query, (err, result) => {
        if(err){
            console.log(err);
        };
    });
};