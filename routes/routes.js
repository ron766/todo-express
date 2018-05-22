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
	@function get('/', controller.showTodo)
  @description routing to controller to get Json array
  @param {url , callback(controller function)}
*/
router.get('/', controller.showTodo);


/**
	@function post('/addtask', controller.addTodo)
  @description routing to controller to add to Json array
  @param {url , callback(controller function)}
*/
router.post('/addtask', controller.addTodo);


/**
	@function delete('/destroy', controller.deleteTodo)
  @description routing to controller to delete from Json array
  @param {url , callback(controller function)}
*/
router.delete('/destroy', controller.deleteTodo);


/**
	@function put('/markdone', controller.toggleStatus)
  @description routing to controller to update status of a single task
  @param {url , callback(controller functions)}
*/
router.put('/markdone', controller.toggleStatus);


/**
	@function put('/markall', controller.toggleAll);
  @description routing to controller to update status all tasks
  @param {url , callback(controller function)}
*/
router.put('/markall', controller.toggleAll);


/**
	@function delete('/destroy', controller.deleteTodo)
  @description routing to controller delete tasks that are comnpleted
  @param {url , callback(controller function)}
*/
router.delete('/clearCompleted', controller.clearCompleted);


/**
	@function get('/active', controller.getActive)
  @description routing to controller to get active tasks
  @param {url , callback(controller function)}
*/
router.get('/active', controller.getActive);


/**
	@function get('/completed', controller.getCompleted)
  @description routing to controller to get active tasks
  @param {url , callback(controller function)}
*/
router.get('/completed', controller.getCompleted);


/**
  @description exporting objects to be used in other files
*/
module.exports =  router