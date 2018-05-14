const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const htmlparser = require('htmlparser2');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
//PORT
const port = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: true });

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//to set view engine to html and include ejs module
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);


//to use css and html
app.set('views',__dirname+'/views');
app.use(express.static(__dirname+'/public'))


/*global variables*/
//for array
var obj;
//for timestamp
var timestamp;

var todoFile = fs.readFileSync('todo.json' , 'utf-8');

const appRoutes = require('./routes/routes.js')(app)

//port running
app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
});
