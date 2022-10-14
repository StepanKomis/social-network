const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const dbConnection = require('../database/connection');
const ct = require('../features/createTopic');
const { promiseImpl } = require('ejs');

