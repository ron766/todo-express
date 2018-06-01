//requiring mongoose
var mongoose = require('mongoose');

//connecting mongoose to db
mongoose.connect('mongodb://localhost:27017/todoDB');
var db = mongoose.connection;

//here I define a Schema
var Schema = mongoose.Schema;

//Initializing and validating the schema
var todoSchema = mongoose.Schema( 
	{
		id: {	
					type:Number,
					required:true, 
					validate: {
						validator: function(v) {
							return v.length != 13
						}
					},
					message: 'ID length should be 13!'
				},
		todo: { 
						type:String,
						required:true,
						length:{min:1},
						validate: {
							validator: function(v) {
								return v != null
							}
						},
						message: 'Task input should not be blank!' 
					},
		activeStatus : { 
											type:Boolean, 
											required: true, 
											length:{min:1},
											validate: {
												validator: function(v) {
													return v != null
												}
											},
											message: 'Task status should not be blank!'  
									 }
	}
);

//acquiring collection by schema
var todoTb = mongoose.model('todoTB', todoSchema,'todoTB');

//exporting database
module.exports = {todoTb}




	