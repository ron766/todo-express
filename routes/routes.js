const controller = require('./../controller/controller');
// const express = require('express');
// const router = express.Router();

// router.get('/',controller.app);

module.exports = function(app) {
  app.get('/', controller.showTodo),
  app.post('/addtask', controller.addTodo),
  app.delete('/destroy', controller.deleteTodo),
  app.put('/update', controller.toggleStatus)
};