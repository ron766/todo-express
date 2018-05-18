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
function addTodo(callback) {
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
function deleteTodo(callback) {
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
		var todoArrayAfterDelete = remove(todoArray, JSON.parse(taskDestroy.id));
		console.log("from delete",todoArrayAfterDelete);
		obj = todoArrayAfterDelete;
		console.log(obj);
		write(obj);
		callback("task deleted success");
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
module.exports = {showTodo , addTodo , deleteTodo};