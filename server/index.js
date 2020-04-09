var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const async = require('async')
let AWS = require('aws-sdk');
const mysql = require('mysql');

const conn = mysql.createPool({
    host: '3.22.68.1',
    user: 'userP2',
    password: 'semi123',
    database: 'bduSocial'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

AWS.config.loadFromPath('./config.json');
s3 = new AWS.S3({apiVersion: '2006-03-01'});

const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/getUsers', function(re,res){
    let sql = "SELECT * FROM USER";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/login', (req, res) => {
    const { nickname, password } = req.body;
    let sql = `SELECT 1 FROM USER WHERE nickname='${nickname}' AND password='${password}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.send({ auth: true });
        } else {
            res.send({ auth: false });
        }
    });
});

app.post('/register', (req, res) => {


});
