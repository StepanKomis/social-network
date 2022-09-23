const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const dbBoiler = require('./../database/boilerplate');
const express = require('express');
const app = express();



exports.cp = () => {
    (author, text, postName) => {
        dbBoiler.generate();
    }
}