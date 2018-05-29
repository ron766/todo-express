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
	console.log("env",process.env.NODE_ENV);
	return new Promise(function(resolve, reject){
		//mongo
		MongoClient.connect("mongodb://localhost:27017/todoDB", function (err, client) {
    	if(err) throw err;
     	//success
     	var db = client.db('todoDB');
     	db.collection('todoTB', function (err, collection) {
       	collection.find().toArray(function(err, items) {
          if(err) throw err;    
          console.log(items);  
          resolve(items);          
      	});
    	});
		});//mongo end
  })  
}

/*
	@function addTodo(callback)
	@description callback function to read JSON file and write new task into JSON file
	@param {callback object}
*/
function addTodo(task , callback) {
	return new Promise(function(resolve, reject) {
		//mongo
		MongoClient.connect("mongodb://localhost:27017/todoDB", function (err, client) {
    	if(err) throw err;
     	//success
     	var db = client.db('todoDB');
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
		});//mongo end
  })//promise end   
}

/*
	@function deleteTodo(callback)
	@description callback function to read JSON file and delete task from JSON file
	@param {callback object}
*/
function deleteTodo(taskDestroy , callback) {
	console.log("cnt",taskDestroy.id)
	//to remove element
  function remove(array, element) {
    return array.filter(e => e.id !== element);
	}
	return new Promise(function(resolve, reject) {
		//mongo
		MongoClient.connect("mongodb://localhost:27017/todoDB", function (err, client) {
    	if(err) throw err;
     	//success
     	var db = client.db('todoDB');
     	db.collection('todoTB', function (err, collection) {
     		collection.deleteOne({id:taskDestroy.id} , {w:1} , function(err, result) {
          if(err) throw err;          
          console.log('Document Removed Successfully');
        });
     	});
    });
  })   
}

/*
	@function toggleStatus(callback)
	@description callback function to read JSON file and update task status
	@param {callback object}
*/
function toggleStatus(updateStatus , callback) {
	return new Promise(function(resolve, reject) {
    fs.readFile(dev, 'utf8', function (err, data) {
	    if (err) reject(err);
	    //success
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
		   	var obj = data;
		   	//now write updated array in file after updation
				write(obj);
	   	}   	
	   	changeDesc ( updateStatus);
      resolve("success");
		});
  })   
}

/*
	@function toggleAll(callback)
	@description callback function to mark all complete in JSON
	@param {callback object}
*/
function toggleAll(condition , callback) {
	return new Promise(function(resolve, reject) {
    fs.readFile(dev, 'utf8', function (err, data) {
	    if (err) reject(err);
	    //success
			data=JSON.parse(data);
			data.map(function(item) {
				if (condition.s == 'false') {
					return item.activeStatus = true;
				}
				else {
					return item.activeStatus = false;
				}
	    	// return item.activeStatus = false;                   
			});
			var obj = data;
			write(obj);
      resolve(data);
		});
  })   
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
	return new Promise(function(resolve, reject) {
    fs.readFile(dev, 'utf8', function (err, data) {
	    if (err) reject(err);
	    //success
	    data = JSON.parse(data);
			var todoArrayAfterDelete = remove(data, false);
			var obj = todoArrayAfterDelete;
			write(obj);
      resolve(obj);
		});
  })   
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
	return new Promise(function(resolve, reject) {
    fs.readFile(dev, 'utf8', function (err, data) {
	    if (err) reject(err);
	    //success
	    data = JSON.parse(data);
	 		var activeArray = remove(data, false);
      resolve(activeArray);
		});
  })   
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
	return new Promise(function(resolve, reject) {
    fs.readFile(dev, 'utf8', function (err, data) {
	    if (err) reject(err);
	    //success
	    data = JSON.parse(data);
	 		var completedArray = remove(data, true);
	 		console.log("mod",completedArray);
      resolve(completedArray);
		});
  })   
}


/*
	@function alterTask(callback)
	@description callback function update task
	@param {callback object}
*/
function alterTask(taskId , text , callback) {
	console.log("model",taskId);
	return new Promise(function(resolve, reject) {
    fs.readFile(dev, 'utf8', function (err, data) {
	    if (err) reject(err);
	    //success
	    data=JSON.parse(data)
			//function to iterate json array and update status
			function changeDesc(id,text) {
				//traversing array to delete
		   	for (var i in data) {
		     	if (data[i].id == id) {
		     		data[i].todo = text.txt
		        break; //Stop this loop, we found it!
		     	}		
	   		}
	   		console.log("data after update",data);	
		   	var obj = data;
		   	//now write updated array in file after updation
				fs.writeFile(dev, JSON.stringify(obj), 'utf-8', function(err) {
		      if (err) res.status(400).send(err)
			  });
	   	}   	
	   	changeDesc (taskId,text);
      resolve(text);
		});
  })   
}


/*
	@function write(obj)
	@description function to write to JSON file
	@param {callback object}
*/
function write(obj) {
	fs.writeFile(dev, JSON.stringify(obj), 'utf-8', function(err) {
      if (err) res.status(400).send(err)
      console.log("fresh array",obj);
  		
  });
}

/**
  @description exporting objects to be used in other files
*/
module.exports = {showTodo , addTodo , deleteTodo , toggleStatus , toggleAll , clearCompleted , getActive , getCompleted , alterTask};





