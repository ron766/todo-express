const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const htmlparser = require('htmlparser2');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var router = express.Router();

//PORT
const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//to set view engine to html and include ejs module
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);

//to use css and html
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+'/public'))
//to read JSON file
var todoFile = fs.readFileSync('todo.json' , 'utf-8');

//todo page
app.get('/' , (req,res) => {
  res.render('todo.html' , {
    welcomeMessage: 'To-Do Checklist App' ,
    todoFileTxtShow: todoFile
  });
});

//todo task append data to json file
app.get('/addtask' , (req,res) => {
  var task = req.query.taskInput;
  var writer = fs.createWriteStream('todo.json');
  res = {
  	todo: task
  }
  var jason = JSON.stringify(res);
  fs.appendFile('todo.json', jason, function (err) {
   	if (err) throw err;
   	console.log('The "data to append" was appended to file!');
	});
  console.log(jason);
});


//port running
app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
 });
