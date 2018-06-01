/**
  @author Rohan Patil
  @description MVC - model file for getting data, applying business logic and returning it to controller 
*/

/*
	@description requiring schema model with DB
*/
var {todoTb} = require('./schemaModel');
var assert = require('assert');

/*
	@function showTodo(callback)
	@description callback function read JSON file and sending back array
	@param {callback object}
*/
function showTodo(callback) {
	console.log("env",process.env.NODE_ENV);
	return new Promise(function(resolve, reject) {
		todoTb.find({})
	    .exec(function (err, todos) {
        if (err) {
            reject('error occured')
        } 
        else {
          console.log(todos);
          resolve(todos); 
        }
	    });
  })//Promise  
}

/*
	@function addTodo(callback)
	@description callback function to add task to db
	@param {callback object}
*/
function addTodo(task , callback) {
	return new Promise(function(resolve, reject) {
		timestamp = new Date().getTime();
		var todoOb = new todoTb ({ "id": timestamp,
															"todo": task,
															"activeStatus" :true 
														});
		todoOb.save(function (err, fluffy) {
			if (err) {
				reject("Schema validation error:",err.errors['id'].message,'ID length should be 13!');
				reject("Schema validation error:",err.errors['todo'].message,'Task input should not be blank!');
				reject("Schema validation error:",err.errors['activeStatus'].message,'Task input should not be blank!');
			}  
			else {
				console.log(fluffy);
		  	resolve(todoOb);
			}
		});		 
  })//promise end   
}

/*
	@function deleteTodo(callback)
	@description callback function to delete a task from db
	@param {callback object}
*/
function deleteTodo(taskDestroy , callback) {
	var id = parseFloat(taskDestroy.id);
	return new Promise(function(resolve, reject) {
		todoTb.find({ id:id }).remove()
			.exec(function (err, todos) {
        if (err) {
          reject("Schema validation error:",err.errors['id'].message,'ID length should be 13!')
        } 
        else {
          console.log(todos);
          resolve(taskDestroy); 
        }
	    });
  })//promise   
}

/*
	@function toggleStatus(callback)
	@description callback function to read JSON file and update task status
	@param {callback object}
*/
function toggleStatus(updateStatus , callback) {
	var id = parseFloat(updateStatus.id);
	var stat = JSON.parse(updateStatus.status);
	return new Promise(function(resolve, reject) {
		todoTb.find({ id:id }).update({activeStatus:stat})
			.exec(function (err, todos) {
        if (err) {
          reject("Schema validation error:",err.errors['id'].message,'ID length should be 13!');
          reject("Schema validation error:",err.errors['activeStatus'].message,'Task input should not be blank!');
        } 
        else {
          console.log(todos);
          resolve("success"); 
        }
	    });
  })//promise   
}

/*
	@function toggleAll(callback)
	@description callback function to mark all complete in JSON
	@param {callback object}
*/
function toggleAll(condition , callback) {
	var stat = JSON.parse(condition.s);
	console.log(stat);
	return new Promise(function(resolve, reject) {
		todoTb.find().updateMany({activeStatus:stat})
			.exec(function (err, todos) {
        if (err) {
          reject("Schema validation error:",err.errors['activeStatus'].message,'Task input should not be blank!');
        } 
        else {
          console.log(todos);
          resolve("success"); 
        }
	    });
  })//promise   
}


/*
	@function clearCompleted(callback)
	@description callback function to clear all all complete in JSON
	@param {callback object}
*/
function clearCompleted(callback) {
	return new Promise(function(resolve, reject) {
		todoTb.find().remove({activeStatus:false})
			.exec(function (err, todos) {
        if (err) {
          reject("Schema validation error:",err.errors['activeStatus'].message,'Task input should not be blank!');
        } 
        else {
          console.log(todos);
          resolve("success"); 
        }
	    });
	});	  
}


/*
	@function getActive(callback)
	@description callback function to get active tasks
	@param {callback object}
*/
function getActive(callback) {
	return new Promise(function(resolve, reject) {
		todoTb.find({activeStatus:true})
	    .exec(function (err, todos) {
        if (err) {
          reject("Schema validation error:",err.errors['activeStatus'].message,'Task input should not be blank!');
        } 
        else {
          console.log(todos);
          resolve(todos); 
        }
	    });
  })//promise   
}


/*
	@function getCompleted(callback)
	@description callback function to get completed tasks
	@param {callback object}
*/
function getCompleted(callback) {
	return new Promise(function(resolve, reject) {
		todoTb.find({activeStatus:false})
	    .exec(function (err, todos) {
        if (err) {
          reject("Schema validation error:",err.errors['activeStatus'].message,'Task input should not be blank!');
        } 
        else {
          console.log(todos);
          resolve(todos); 
        }
	    });
  })//PROMISE   
}


/*
	@function alterTask(callback)
	@description callback function update task
	@param {callback object}
*/
function alterTask(taskId , text , callback) {
	var id = parseFloat(taskId);
	var txt = text;
	var tmpT = txt.txt;
	return new Promise(function(resolve, reject) {
		todoTb.find({ id:id }).update({todo:tmpT})
			.exec(function (err, todos) {
        if (err) {
          reject("Schema validation error:",err.errors['id'].message,'ID length should be 13!');
					reject("Schema validation error:",err.errors['todo'].message,'Task input should not be blank!');
        } 
        else {
          console.log(todos);
          resolve("success"); 
        }
	    });
  })//PROMISE   
}


/**
  @description exporting objects to be used in other files
*/
module.exports = {showTodo , addTodo , deleteTodo , toggleStatus , toggleAll , clearCompleted , getActive , getCompleted , alterTask};





