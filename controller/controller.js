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
	var task = req.body.data;
	console.log('task from call', req.body);
	if(task.data === "") {
		throw err;
	}
	else {
		model.addTodo(task , function(data){
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
function deleteTodo(req,res) {
	//refer global var obj for ref
	var taskDestroy = req.body;
	console.log("asfsfsfsf",taskDestroy);
	model.deleteTodo(taskDestroy,function(data){
			res.status(200).send("success");
		});   
}


/*
	@function toggleStatus(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function toggleStatus(req,res) {
	var updateStatus = req.body;
	console.log(updateStatus);
	model.toggleStatus(updateStatus , function(data){
			res.status(200).send("Status updated");
		}); 
}


/*
	@function toggleAll(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function toggleAll(req,res) {
	var condition = req.query
	console.log(condition)
	model.toggleAll(condition.s , function(data){
			res.status(200).send("Status updated");
		}); 
}


/*
	@function toggleAll(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function clearCompleted(req,res) {
	model.clearCompleted(function(data){
			res.status(200).send("Deleted");
		});
}


/*
	@function getActive(req,res)
	@description function to get active tasks
	@param {server object request , server object response}
*/
function getActive(req,res) {
	model.getActive(function(data){
		console.log(data);
			res.status(200).send(data);
		});
}


/*
	@function getCompleted(req,res)
	@description function to get completed tasks
	@param {server object request , server object response}
*/
function getCompleted(req,res) {
	model.getCompleted(function(data){
		console.log(data);
			res.status(200).send(data);
		});
}


/**
  @description exporting objects to be used in other files
*/
module.exports = {showTodo , addTodo , deleteTodo , toggleStatus , toggleAll , clearCompleted , getActive , getCompleted};

