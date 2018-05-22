/**
  @author Rohan Patil
  @description MVC - model file for getting data, applying business logic and returning it to controller 
*/

/*
	@description require 'fs' module
*/
const fs = require('fs');
var arrayOfObjects;

/*
	@function showTodo(callback)
	@description callback function read JSON file and sending back array
	@param {callback object}
*/
function showTodo(callback) {
	fs.readFile('./todo.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  // obj = JSON.parse(data);
	  callback(data)
	});
}

/*
	@function addTodo(callback)
	@description callback function to read JSON file and write new task into JSON file
	@param {callback object}
*/
function addTodo(task , callback) {
	timestamp = new Date().getTime();
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
	callback(tmpArrayOfObjects);
}

/*
	@function deleteTodo(callback)
	@description callback function to read JSON file and delete task from JSON file
	@param {callback object}
*/
function deleteTodo(taskDestroy,callback) {
	//to remove element
  function remove(array, element) {
    return array.filter(e => e.id !== element);
	}
	fs.readFile('./todo.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  // obj = JSON.parse(data);
	  var todoArray = JSON.parse(data);
		console.log(todoArray);
		console.log("ghkgk",todoArray);
		console.log("----------",taskDestroy);
		var todoArrayAfterDelete = remove(todoArray, JSON.parse(taskDestroy.id));
		console.log("from delete",todoArrayAfterDelete);
		obj = todoArrayAfterDelete;
		console.log(obj);
		write(obj);
		callback("task deleted success");
	});
}

/*
	@function toggleStatus(callback)
	@description callback function to read JSON file and update task status
	@param {callback object}
*/
function toggleStatus(updateStatus , callback) {
	console.log(updateStatus);
	fs.readFile('./todo.json', 'utf8', function (err, data) {
		if (err) throw err;
		console.log("print data",data);
		data=JSON.parse(data)
		//function to iterate json array and update status
		function changeDesc(id) {
			//traversing array to delete
	   	for (var i in data) {
	     	if (data[i].id == updateStatus.id) {
	     		if(data[i].activeStatus == false) {
	     			data[i].activeStatus = true;
	     		}
	     		else {
	     			data[i].activeStatus = false;
	     		}
	        break; //Stop this loop, we found it!
	     	}		
   		}
   		console.log("data after update",data);	
   		console.log("updated",data);
   	var obj = data;
   	//now write updated array in file after updation
		fs.writeFile('todo.json', JSON.stringify(obj), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
	  });
   	}   	
   	changeDesc ( updateStatus);
		callback("Status updated");
	});
}

/*
	@function toggleAll(callback)
	@description callback function to mark all complete in JSON
	@param {callback object}
*/
function toggleAll(condition,callback) {
	fs.readFile('./todo.json', 'utf8', function (err, data) {
		if (err) throw err;

		data=JSON.parse(data);
		data.map(function(item) {
			console.log(condition);
			if (condition == 'false') {
				return item.activeStatus = true;
			}
			else {
				return item.activeStatus = false;
			}
    	// return item.activeStatus = false;                   
		});
		console.log("markall",data);
		var obj = data;
		write(obj);
	});
	callback("marked all");
}


/*
	@function clearCompleted(callback)
	@description callback function to clear all all complete in JSON
	@param {callback object}
*/
function clearCompleted(callback) {
	function remove(array, element) {
    return array.filter(e => e.activeStatus !== element);
	}
	fs.readFile('./todo.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  // obj = JSON.parse(data);
	  data = JSON.parse(data);
		var todoArrayAfterDelete = remove(data, false);
		console.log("after delete",todoArrayAfterDelete);
		var obj = todoArrayAfterDelete;
		console.log(obj);
		write(obj);
		callback("completed tasks deleted success");
	});
}


/*
	@function getActive(callback)
	@description callback function to get active tasks
	@param {callback object}
*/
function getActive(callback) {
	function remove(array, element) {
    return array.filter(e => e.activeStatus !== element);
	}
	fs.readFile('./todo.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  // obj = JSON.parse(data);
	  data = JSON.parse(data);
		var activeArray = remove(data, false);
		callback(activeArray);
	});
}


/*
	@function getCompleted(callback)
	@description callback function to get completed tasks
	@param {callback object}
*/
function getCompleted(callback) {
	function remove(array, element) {
    return array.filter(e => e.activeStatus !== element);
	}
	fs.readFile('./todo.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  // obj = JSON.parse(data);
	  data = JSON.parse(data);
		var completedArray = remove(data, true);
		callback(completedArray);
	});
}


/*
	@function write(obj)
	@description function to write to JSON file
	@param {callback object}
*/
function write(obj) {
	fs.writeFile('todo.json', JSON.stringify(obj), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
      console.log('task deleted');
      console.log("fresh array",obj);
  		
  });
}

/**
  @description exporting objects to be used in other files
*/
module.exports = {showTodo , addTodo , deleteTodo , toggleStatus , toggleAll , clearCompleted , getActive , getCompleted};