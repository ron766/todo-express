ADD
//   fs.readFile(dev, 'utf8', function (err, data) {
		//   if (err) reject(err);
		//   //success
		//   timestamp = new Date().getTime();
		//   var arrayOfObjects = JSON.parse(data);
		//   var tmpArrayOfObjects = {
		// 	  todo: task , 
		// 	  id: timestamp,
		// 	  activeStatus: true
		// 	};
		// 	arrayOfObjects.push(tmpArrayOfObjects);
		// 	// res.send("success");
		// 	write(arrayOfObjects);
  //     resolve(tmpArrayOfObjects);
		// });

SHOW
fs.readFile(dev, 'utf8', function (err, data) {
		  if (err) reject(err);
		  //success
      //resolve(data);
		});

DELETE
	//to remove element
  function remove(array, element) {
    return array.filter(e => e.id !== element);
	}
 //   fs.readFile(dev, 'utf8', function (err, data) {
	 //    if (err) reject(err);
	 //    //success
	 //    var todoArray = JSON.parse(data);
		// 	var todoArrayAfterDelete = remove(todoArray, JSON.parse(taskDestroy.id));
		// 	console.log("from delete",todoArrayAfterDelete);
		// 	obj = todoArrayAfterDelete;
		// 	write(obj);
  //     resolve(taskDestroy);
		// });

TOGGLE STATUS
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

TOGGLE ALL
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

CLEAR COMPLETED	
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

ACTIVE
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

COMPLETED  
	function remove(array, element) {
		console.log("remove",array, element);
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

UPDATE TASK
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

