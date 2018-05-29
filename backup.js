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