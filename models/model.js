/**
  @author Rohan Patil
  @description MVC - model file for getting data, applying business logic and returning it to controller 
*/

/*
	@description require 'fs' module
*/
const fs = require('fs');
var arrayOfObjects;

//global db object
var db;

/*
	@function mongo()
	@description mongoDB connection function
*/
function mongo() {
	return new Promise(function(resolve, reject){
		const uri = 'mongodb://localhost:27017/todoDB'; 
		MongoClient.connect(uri,{ useNewUrlParser: true }, function (err, client) {
	  	if(err) throw err;
	   	//success
	   	db = client.db('todoDB');
	   	// console.log(db);
	   	return resolve(null);
	  });
	})
}

/*
	@function showTodo(callback)
	@description callback function read JSON file and sending back array
	@param {callback object}
*/
function showTodo(callback) {
	console.log("env",process.env.NODE_ENV);
	return new Promise(function(resolve, reject) {
		mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
		   	collection.find().toArray(function(err, items) {
		      if(err) throw err; 
		      //success     
		      resolve(items);          
		  	});
		  });
		})
		.catch(function(err) {
			console.log(err);
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
		//mongo
		mongo().then(function(){
	   	db.collection('todoTB', function (err, collection) {
				timestamp = new Date().getTime();
		  	// var arrayOfObjects = JSON.parse(data);
			  var tmpArrayOfObjects = {
				  todo: task , 
				  id: timestamp,
				  activeStatus: true
				};
				// arrayOfObjects.push(tmpArrayOfObjects);
				collection.insert({ id: timestamp, todo: task, activeStatus: true });
				resolve(tmpArrayOfObjects);
			});
		})
		.catch(function(err) {
			console.log(err);
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
		//mongo
		mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
     		try {
		     	collection.deleteOne({"id":id});
		    }
	     	catch(e) {
	     		console.log(e);
	     	}
      	resolve(taskDestroy);
     	});
		})
		.catch(function(err) {
			console.log(err);
		});
  })   
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
    mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
				collection.update(
					{"id": id}, 
					{$set:{activeStatus:stat}}, 
					function(err, result){
	        if(err) throw err;    
	        console.log('Document Updated Successfully');//resolve(items);
	        resolve("success"); 
				});
			});	
		})
		.catch(function(err) {
			console.log(err);
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
    mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
				collection.updateMany(
					{}, 
					{$set:{activeStatus:stat}}, 
					function(err, result){
	        if(err) throw err;    
	        console.log('Document Updated Successfully');//resolve(items);
	        resolve("success"); 
				});
			});	
		})
		.catch(function(err) {
			console.log(err);
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
	mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
		   	collection.deleteMany({"activeStatus": false},function(err, items) {
		      if(err) throw err; 
		      //success     
		      resolve("deleted");          
		  	});
		  });
		})
		.catch(function(err) {
			console.log(err);
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
		mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
		   	collection.find({activeStatus:true}).toArray(function(err, items) {
		      if(err) throw err; 
		      //success    
		      console.log(items); 
		      resolve(items);          
		  	});
		  });
		})
		.catch(function(err) {
			console.log(err);
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
		mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
		   	collection.find({activeStatus:false}).toArray(function(err, items) {
		      if(err) throw err; 
		      //success    
		      console.log(items); 
		      resolve(items);          
		  	});
		  });
		})
		.catch(function(err) {
			console.log(err);
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
	console.log("model",id);
	console.log("model",tmpT);
	return new Promise(function(resolve, reject) {
		mongo().then(function(){
			db.collection('todoTB', function (err, collection) {
				collection.update(
					{"id":id}, 
					{$set:{todo:tmpT}}, 
					function(err, result){
	        if(err) throw err;    
	        console.log('Document Updated Successfully');//resolve(items);
	        resolve("success"); 
				});
			});	
		})
		.catch(function(err) {
			console.log(err);
		});
  })//PROMISE   
}


/**
  @description exporting objects to be used in other files
*/
module.exports = {showTodo , addTodo , deleteTodo , toggleStatus , toggleAll , clearCompleted , getActive , getCompleted , alterTask};





