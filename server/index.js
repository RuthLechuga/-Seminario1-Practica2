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
    host: '3.15.202.112',
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

app.get('/getUser', function(re,res){
    const datos = req.body;
    const idUser = datos.idUser;
    let sql = `SELECT * FROM USER WHERE idUser=${idUser}`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/login', (req, res) => {
    const { nickname, password } = req.body;
    let sql = `SELECT * FROM USER WHERE nickname='${nickname}' AND password='${password}'`;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length === 1) {
            res.send({ auth: true, results} );
        } else {
            res.send({ auth: false });
        }
    });
});

app.post('/register', upload.single('photo'), (req, res) => {
   const datos = req.body;
   const nombre = datos.nombre;
   const nickname = datos.nickname;
   const password = datos.password;

   if(req.file){
	console.log(req.file.filename);

	var uploadParams = { Bucket: 'usocialg10/FotosUsuario', Key: '', Body: '' };
    	var file = './uploads/' + req.file.filename;

   	var fileStream = fs.createReadStream(file);
    	fileStream.on("error", function (err) {
      		console.log("File Error", err);
    	});

    	uploadParams.Body = fileStream;

    	var path = require('path');
    	uploadParams.Key = path.basename(file);

    	s3.upload(uploadParams, function (err, data) {
      		if (err) {
        		console.log("Error", err);
      		} if (data) {
        		let  sql = `INSERT INTO USER(nombre,nickname,password,url_photo) VALUES ('${nombre}','${nickname}','${password}','${data.Location}');`;
			let query = conn.query(sql, (err,results) => {
				if(err){
					res.send({ 'success': false});
				} else {
					res.send({ 'success': true });
				}
			});
      		}
    	});

   }
   else {
	let sql = `INSERT INTO USER(nombre,nickname,password) VALUES ('${nombre}','${nickname}','${password}');`;
	let query = conn.query(sql, (err,results) => {
		if (err) {
            		res.send({ 'success': false });
        	} else {
            		res.send({ 'success': true });
        	}
	});
   }

});

app.get('/getPublicaciones', (req,res) => {
	let sql = `SELECT P.text, P.image_url, U.nickname, P.fechahora FROM POST P, USER U WHERE P.idUser = U.idUser ORDER BY fechahora DESC;`;
	let query = conn.query(sql, (err,results) => {
		if(err){
			res.send([]);
		} else {
			res.send(results);
		}
	});
});

app.post('/setPublicacion', upload.single('photo'), (req, res) => {
   const datos = req.body;
   const idUser = datos.idUser;
   const text = datos.text;

   if(req.file){
     console.log(req.file.filename);

     var uploadParams = { Bucket: 'usocialg10/FotosPublicacion', Key: '', Body: '' };
     var file = './uploads/' + req.file.filename;

      var fileStream = fs.createReadStream(file);
       fileStream.on("error", function (err) {
        console.log("File Error", err);
      });

      uploadParams.Body = fileStream;

      var path = require('path');
      uploadParams.Key = path.basename(file);

      s3.upload(uploadParams, function (err, data) {
          if (err) {
            console.log("Error", err);
          } if (data) {
            let  sql = `INSERT INTO POST(text,image_url,idUser) VALUES ('${text}','${data.Location}',${idUser});`;
      let query = conn.query(sql, (err,results) => {
        if(err){
          res.send({ 'success': false});
        } else {
          res.send({ 'success': true });
        }
      });
          }
      });

   }
   else {
  let sql = `INSERT INTO POST(text,idUser) VALUES ('${text}',${idUser});`;
  let query = conn.query(sql, (err,results) => {
    if (err) {
                res.send({ 'success': false });
          } else {
                res.send({ 'success': true });
          }
  });
   }

});


app.post('/modifyUser', upload.single('photo'), (req, res) => {
   const datos = req.body;
   const idUser = datos.idUser;
   const nombre = datos.nombre;
   const nickname = datos.nickname;
   const password = datos.password;

   if(req.file){
    console.log(req.file.filename);

    var uploadParams = { Bucket: 'usocialg10/FotosUsuario', Key: '', Body: '' };
        var file = './uploads/' + req.file.filename;

    var fileStream = fs.createReadStream(file);
        fileStream.on("error", function (err) {
            console.log("File Error", err);
        });

        uploadParams.Body = fileStream;

        var path = require('path');
        uploadParams.Key = path.basename(file);

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log("Error", err);
            } if (data) {
                let  sql = `UPDATE USER SET nombre='${nombre}', nickname='${nickname}', url_photo='${data.Location}' WHERE idUser=${idUser} AND password='${password}';`;
            let query = conn.query(sql, (err,results) => {
                if(err){
                    res.send({ 'success': false});
                } else {
                    res.send({ 'success': true });
                }
            });
            }
        });

   }
   else {
    let  sql = `UPDATE USER SET nombre='${nombre}', nickname='${nickname}' WHERE idUser=${idUser} AND password='${password}';`;
    let query = conn.query(sql, (err,results) => {
        if (err) {
                    res.send({ 'success': false });
            } else {
                    res.send({ 'success': true });
            }
    });
   }

});
