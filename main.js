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


var obj;
//todo page
app.get('/' , (req,res) => {
  res.render('todo.html' , {
    welcomeMessage: 'To-Do Checklist App' ,
    todoFileTxtShow: todoFile
  });
  //show existing data from Json
	fs.readFile('./todo.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	  console.log(obj);
	});

});

//todo task
app.post('/addtask' , (req,res) => {
  var task = req.body.data;
  console.log('task from call', req.body);
  var arrayOfObjects = require('./todo.json');
  console.log(arrayOfObjects);
  arrayOfObjects.push({
    todo: task
  });
  res.send("success");
  fs.writeFile('todo.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
      console.log('new task added');
      console.log(arrayOfObjects);
    });
    res.status(400).send("success");
});


//port running
app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
});
