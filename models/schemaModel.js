//requiring mongoose
var mongoose = require('mongoose');

//connecting mongoose to db
mongoose.connect('mongodb://localhost:27017/todoDB');
var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

//requiring validator
var Validator = require('schema-validator');

//here I define a Schema
var Schema = mongoose.Schema;

//Initializing and validating the schema
var todoSchema = mongoose.Schema( 
	{
		id: {type:Number, required: true, length:{min:13,max:13}},
		todo: {type:String, required: true, length:{min:1}},
		activeStatus : {type:Boolean, required: true, length:{min:1}}

	}
);

//using validator
var validator = new Validator(todoSchema);
validator.debug = true;

//acquiring collection by schema
var todoTb = mongoose.model('todoTB', todoSchema,'todoTB');

//exporting database
module.exports = {todoTb}




	