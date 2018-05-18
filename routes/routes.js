/**
  @author Rohan Patil
  @description MVC - router file for routing api calls
*/

/**
  @description acquiring controller file
*/
const controller = require('./../controller/controller');

/**
  @description acquiring router 
*/
const router = require('express').Router();

/**
	@function get(),post(),delete(),put()
  @description acquiring controller file
  @param {url , controller functions}
*/
router.get('/', controller.showTodo);
router.post('/addtask', controller.addTodo);
router.delete('/destroy', controller.deleteTodo);
router.put('/update', controller.toggleStatus);

/**
  @description exporting objects to be used in other files
*/
module.exports =  router