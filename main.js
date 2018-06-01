/**
  @author Rohan Patil
  @description server script
*/

/**
  @description acquiring modules
*/
const express = require('express');
const http = require('http');
const path = require('path');
const https = require('https');
const htmlparser = require('htmlparser2');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
//PORT
const port = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//mongo
MongoClient = require('mongodb').MongoClient;

/**
  @description creating express object in app
*/
var app = express();

/**
  @description basically tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false)
*/
app.use(bodyParser.urlencoded({ extended: false }))

/**
  @description specifying body parser to use json
*/
app.use(bodyParser.json())

/**
  @description to set view engine to html and include ejs module
*/
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);

/**
  @description to set static and view paths to use css and html
*/
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+'/public'))

/**
  @description route path switching on environment (development/testing)
*/
switch(process.env.NODE_ENV) {
  case 'development':
    dev = './todo.json';
    break;

  case 'testing': 
    dev = './testTodo.json';
    break;

  default: 
    console.log("Please provide proper envt");
}

//routes
app.use(require('./routes/routes'));


/**
  @description listening on port & displaying the same
*/
app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
});

//exporting app object
module.exports = {app};