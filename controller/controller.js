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
	model.showTodo(req).then(
		function(data) {
			res.render('todo.html' , {
				welcomeMessage: 'To-Do Checklist App' ,
				todoFileTxtShow: data
			});//render close
		}
	).catch((err)=>{
		console.log(err)
	})//then close
}


/*
	@function addTodo(req,res)
	@description function to get data from client, pass it to model to add in JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function addTodo(req,res) {
	var task = req.body.data;
	console.log("task:",task);
	if(!task.trim()) {
		res.status(400).send({error:"Enter a valid input"})
	}
	else {
		model.addTodo(task).then(
			function(data) {
				console.log("cnt:",data);
				res.send(data);
			},
			function(err){if(err)throw err;}
		)//then close
	}
}


/*
	@function deleteTodo(req,res)
	@description function to get data from client, pass it to model to delete from JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function deleteTodo(req,res){
	var taskDestroy = req.body;
	if(taskDestroy.id == "") {
		console.log("Enter an id");
	}
	else {
		model.deleteTodo(taskDestroy).then(
			function(data) {
				console.log("cnt",data)
	      res.send("success");
			},
			function(err){if(err)throw err;}
		)//then close
	}
}


/*
	@function toggleStatus(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
// function toggleStatus(req,res) {
// 	var updateStatus = req.body;
// 	console.log(updateStatus);
// 	model.toggleStatus(updateStatus , function(data){
// 			res.status(200).send("Status updated");
// 		}); 
// }
function toggleStatus(req,res) {
	var updateStatus = req.body;
	model.toggleStatus(updateStatus).then(
		function(data) {
      res.send("success");
		},
		function(err){if(err)throw err;}
	)//then close
}


/*
	@function toggleAll(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function toggleAll(req,res) {
	var condition = req.query
	model.toggleAll(condition).then(
		function(data) {
      res.send("success");
		},
		function(err){if(err)throw err;}
	)//then close
}


/*
	@function clearCompleted(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function clearCompleted(req,res) {
	model.clearCompleted().then(
		function(data) {
			var tmp;
			for(i=0; i<data.length; i++) {
				tmp = data[i].activeStatus;
			}
      res.send(tmp);
		},
		function(err){if(err)throw err;}
	)//then close
}


/*
	@function getActive(req,res)
	@description function to get active tasks
	@param {server object request , server object response}
*/
function getActive(req,res){
	model.getActive().then(
		function(data) {
      res.send(data);
		},
		function(err){if(err)throw err;}
	)//then close
}


/*
	@function getCompleted(req,res)
	@description function to get completed tasks
	@param {server object request , server object response}
*/
function getCompleted(req,res){
	model.getCompleted().then(
		function(data) {
      res.send(data);
		},
		function(err){if(err)throw err;}
	)//then close
}


/*
	@function alterTask(req,res)
	@description function to get data from client, pass it to model to update to JSON 
		array/file and get response and send it back to client
	@param {server object request , server object response}
*/
function alterTask(req,res){
	var text = req.body;
	var taskId = req.params.textId;
	console.log(text,taskId);
	model.alterTask(taskId , text).then(
		function(data) {
      res.send(data);
		},
		function(err){if(err)throw err;}
	)//then close
}


/**
  @description exporting objects to be used in other files
*/
module.exports = {showTodo , addTodo , deleteTodo , toggleStatus , toggleAll , clearCompleted , getActive , getCompleted , alterTask};

