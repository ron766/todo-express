
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//here I define a Schema
var Schema = mongoose.Schema;

// db.once('open', function() {
//   // we're connected!
  var todoSchema = mongoose.Schema( {
			"id": Number,
			"todo": String,
			"activeStatus" : Boolean
		}
	);

	var todoTb = mongoose.model('todoTB', todoSchema,'todoTB');


	module.exports = {todoTb}
	//console.log(db);
	// var todo = mongoose.model('Todo', todoSchema);
	// var todoOb = new todo({ "id": 1122334455667788,
	// 												"todo": "String",
	// 												"activeStatus" :true 
	// 											});
	//save
	// todoOb.save(function (err, fluffy) {
	// 	if (err) return console.error(err);
 //    console.log(fluffy);
	// });

	//find
// 	var todo = mongoose.model('Todo', todoSchema);
// 	// todo.find(function(err, docs){
//  //  	console.log(docs); //correct logging of all comments
// 	// });
// 	Book.find({})
//         .exec(function (err, books) {
//             if (err) {
//                 res.send('error occured')
//             } else {
//                 console.log(books);
//                 res.json(books);
//             }
//         });

// });

// var schJson = require("../schemas/todoSchema.json");




	