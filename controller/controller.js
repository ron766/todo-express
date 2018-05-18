/**
  @author Rohan Patil
  @description MVC - controller file for getting data and passing it to model for business logic
*/
var model = require('./../models/model');

/*
	@function showTodo(req,res)
	@description function to get data from model show existing tasks on server load
	@param {server object request , server object response}
*/
function showTodo(req,res) {
	// model.showTodo();	
	model.showTodo(function(data) {
		res.render('todo.html' , {
		welcomeMessage: 'To-Do Checklist App' ,
		todoFileTxtShow: data
		});
	});
}

/*
	@function addTodo(req,res)
	@description function to get data from client, pass it to model to add in JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function addTodo(req,res) {
	task = req.body.data;
	console.log('task from call', req.body);
	if(task.data === "") {
		throw err;
	}
	else {
		model.addTodo(function(data){
			res.send(data);
		});
	}
}

/*
	@function deleteTodo(req,res)
	@description function to get data from client, pass it to model to delete from JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function toggleStatus(req,res) {
	//refer global var obj for ref
	taskDestroy = req.body;
	console.log("asfsfsfsf",taskDestroy);
	model.deleteTodo(function(data){
			res.status(200).send("success");
		});   
}

/*
	@function deleteTodo(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function toggleStatus(req,res) {
	var updateStatus = req.body;
	console.log(updateStatus);
	//traversing array to delete
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

/**
  @description exporting objects to be used in other files
*/
module.exports = {showTodo , addTodo , deleteTodo , toggleStatus};

