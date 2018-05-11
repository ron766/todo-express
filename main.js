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

/*global variables*/
//for array
var obj;
//for timestamp
var date = new Date();
var timestamp;
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
	});

});

//todo
app.delete('/destroy' , (req,res) => {
	//refer global var obj for ref
	var taskDestroy = req.body;

	//to remove element
  function remove(array, element) {
    return array.filter(e => e.todo !== element);
	}
	var todoArray = obj;
	var todoArrayAfterDelete = remove(todoArray, taskDestroy.todo);
	console.log("from delete",todoArrayAfterDelete);
	obj = todoArrayAfterDelete;
	console.log(obj);

	//now write updated array in file after deletion
	fs.writeFile('todo.json', JSON.stringify(obj), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
      console.log('task deleted');
      console.log("fresh array",obj);
    });
    res.status(200).send("success"); 
});

/*function to change status of array object*/
app.put('/update' , (req,res) => {
	var updateStatus = req.body;
	console.log(updateStatus);
	//traversing array to delete
	var todoArray = obj; //stored current array in todoArray
	function changeDesc(id) {
   	for (var i in todoArray) {
     	if (todoArray[i].id == updateStatus.id) {
        todoArray[i].status = "completed";
        break; //Stop this loop, we found it!
     	}		
   	}
   	obj = todoArray;
   	//now write updated array in file after deletion
		fs.writeFile('todo.json', JSON.stringify(obj), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
	  });
   	res.send("success");
	}
	changeDesc ( updateStatus);
	console.log("after update",obj);
});

//todo add task
app.post('/addtask' , (req,res) => {
	/*timestamp*/
	timestamp = date.getTime();
  var task = req.body.data;
  console.log('task from call', req.body);
  var arrayOfObjects = require('./todo.json');
  console.log(arrayOfObjects);
  var tmpArrayOfObjects={
    todo: task , 
    id: timestamp ,
    status: "active"
  };
  arrayOfObjects.push(tmpArrayOfObjects);
  // res.send("success");
  fs.writeFile('todo.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
      console.log('new task added');
    });
    res.send(tmpArrayOfObjects);
});


//port running
app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
});
