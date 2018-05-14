/*
	@author Rohan Patil
	@description controller file control logic
*/
var model = require('./../models/model');
const fs = require('fs');

var obj;
//for timestamp
var timestamp;

// var todoFile = fs.readFileSync('todo.json' , 'utf-8');

/*
	@description function to show data on load
*/
function showTodo(req,res){
  res.render('todo.html' , {
		welcomeMessage: 'To-Do Checklist App' ,
		todoFileTxtShow: todoFile
	});
}

/*
	@description function to add task
*/
function addTodo(req,res){
	timestamp = new Date().getTime();
	var task = req.body.data;
	console.log('task from call', req.body);
	var arrayOfObjects = require('../todo.json');
	console.log(arrayOfObjects);
	var tmpArrayOfObjects = {
	  todo: task , 
	  id: timestamp,
	  activeStatus: true
	};
	arrayOfObjects.push(tmpArrayOfObjects);
	// res.send("success");
	fs.writeFile('todo.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
    if (err) res.status(400).send(err)
    console.log('new task added');
	});
  res.send(tmpArrayOfObjects);
}

/*
	@description function to delete task
*/
function deleteTodo(req,res){
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
}

/*
	@description function to toggle task status
*/
function toggleStatus(req,res){
	var updateStatus = req.body;
	console.log(updateStatus);
	//traversing array to delete
	var todoArray = obj; //stored current array in todoArray
	function changeDesc(id) {
   	for (var i in todoArray) {
     	if (todoArray[i].id == updateStatus.id) {
        todoArray[i].activeStatus = false;
        break; //Stop this loop, we found it!
     	}		
   	}
   	console.log("updated",todoArray);
   	obj = todoArray;
   	//now write updated array in file after deletion
		fs.writeFile('todo.json', JSON.stringify(obj), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
	  });
   	res.send("success");
	}
	changeDesc ( updateStatus);
}


module.exports = {showTodo , addTodo , deleteTodo , toggleStatus};

