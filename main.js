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

//todo task
app.post('/addtask' , (req,res) => {
  var task = req.body.data;
  // var task = newTodo;
  console.log('task from call', req.body);
  var arrayOfObjects = require('./todo.json');
  console.log(arrayOfObjects);
  arrayOfObjects.push({
    todo: task
  });
  res.send("success");
  fs.writeFile('todo.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
        if (err) throw err
        console.log('new user added');
        console.log(arrayOfObjects);
    });
    res.send("success");
});

//port running
app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
});





  // fs.readFile('todo.json' 'utf-8', function(err, jsonfile) {
  //
  // };


	// var resp = {
	// 	todo: task
	// }
	// var jason = JSON.stringify(resp);
	// fs.appendFile('todo.json', jason, function (err) {
	//   	if (err) throw err;
	//   	console.log('The "data to append" was appended to file!');
	//  });
	//  res.status(201).end();
