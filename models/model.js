/*
	@author Rohan Patil
	@description model file business logic
*/
var obj;
const fs = require('fs');


function showTodo(cb){
	var todoFile = fs.readFileSync('todo.json' , 'utf-8');
	fs.readFile('./todo.json', 'utf8', function (err, data) {
	  if (err) throw err;
	  obj = JSON.parse(data);
	});
}

module.exports = {showTodo};