/*@author Rohan Patil
  @description Test file for testing the application
*/

const route = require('../routes/routes');
var request = require('supertest');
var expect = require('expect');
var {app} = require('../main.js');


/*
	@function describe('GET TASKS')
	@description to test showTodo function
*/


/*
	@function describe('ADD TASKS')
	@description to test addTodo function
*/
// describe('ADD TASKS',() => {
// 	//if input is right
// 	it('With valid input',(done) => {
// 		var data = "demo";
//     request(app)
// 	    .post('/addtask')
// 	    .send({data})
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	expect(res.body.todo).toBe(data);
// 	    })
// 	    .end(done);
//   });
//   //if input is wrong
//   it('With empty input',(done) => {
// 		var data ="";
//     request(app)
// 	    .post('/addtask')
// 	    .send({data})
// 	    .expect(422)
// 	    .expect((res) => {
// 	    	expect(res.body).toBe(res.body);
// 	    })
// 	    .end(done);
//   });
//   //if input is blank space
//   it('With blank space',(done) => {
// 		var data =" ";
//     request(app)
// 	    .post('/addtask')
// 	    .send({data})
// 	    .expect(422)
// 	    .expect((res) => {
// 	    	expect(res.body).toBe(res.body);
// 	    })
// 	    .end(done);
//   });
// })

// /*
// 	@function describe('DELETE TASKS')
// 	@description to test deleteTodo function
// */
// describe('DELETE TASKS',() => {
// 	//if input is valid
// 	it('With valid input',(done) => {
// 		var data = "1527578067782";
//     request(app)
// 	    .delete('/destroy')
// 	    .send({id:data})
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	expect(res.body.id).toBe(data.id);
// 	    })
// 	    .end(done);
//   });
//   //if input is wrong
//   it('With empty input',(done) => {
// 		var data ="";
//     request(app)
// 	    .delete('/destroy')
// 	    .send({data})
// 	    .expect(422)
// 	    .expect((res) => {
// 	    	expect(res.body).toBe(res.body);
// 	    })
// 	    .end(done);
//   });
// });


// /*
// 	@function describe('UPDATE ALL TASKS')
// 	@description to test toggleAll function
// */
// describe('UPDATE TASK STATUS',() => {
// 	//mark all done
// 	it('With valid input',(done) => {
//     request(app)
// 	    .put('/markall?s='+true)
// 	    // .send(data)
// 	    .expect(200)
// 	    // .expect((res) => {
// 	    // 	expect(res.body.id).toBe(data.id);
// 	    // })
// 	    .end(done);
//   });
//   //unmark all
// 	it('With valid input',(done) => {
//     request(app)
// 	    .put('/markall?s='+false)
// 	    // .send(data)
// 	    .expect(200)
// 	    // .expect((res) => {
// 	    // 	expect(res.body.id).toBe(data.id);
// 	    // })
// 	    .end(done);
//   });
// });


// /*
// 	@function describe('UPDATE TASK STATUS')
// 	@description to test toggleStatus function
// */
// describe('UPDATE TASK STATUS',() => {
// 	//if input is valid
// 	it('With valid input',(done) => {
// 		var data = 1527589453195;
//     request(app)
// 	    .put('/markdone')
// 	    .send({id:data})
// 	    .expect(200)
// 	    // .expect((res) => {
// 	    // 	expect(res.body.id).toBe(data.id);
// 	    // })
// 	    .end(done);
//   });
// });

// /*
// 	@function describe('CLEAR ALL COMPLETED')
// 	@description to test clearCompleted function
// */
// describe('CLEAR ALL COMPLETED',() => {
// 	it('With valid input',(done) => {
//     request(app)
// 	    .delete('/clearCompleted')
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	expect(res.body).toBe(true);
// 	    })
// 	    .end(done);
//   });
// });


// /*
// 	@function describe('SHOW ALL ACTIVE TASKS')
// 	@description to test getActive function
// */
// describe('SHOW ALL ACTIVE TASKS',() => {
// 	it('With valid input',(done) => {
//     request(app)
// 	    .get('/active')
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	var tmp = res.body;
// 	    	var tmp2;
// 	    	for(i=0; i<tmp.length; i++) {
// 					tmp2 = tmp[i].activeStatus;
// 				}
// 	    	 expect(tmp2).toBe(true);
// 	    })
// 	    .end(done);
//   });
// });

/*
	@function describe('SHOW ALL COMPLETED TASKS')
	@description to test getCompleted function
*/
describe('SHOW ALL COMPLETED TASKS:',() => {
	it('With valid input',(done) => {
    request(app)
	    .get('/completed')
	    .expect(200)
	    .expect((res) => {
	    	var tmp = res.body;
	    	var tmp2;
	    	for(i=0; i<tmp.length; i++) {
					tmp2 = tmp[i].activeStatus;
				}
				console.log("aa",tmp2);
	    	expect(tmp2).toBe(false);
	    })
	    .end(done);
  });
});

/*
	@function describe('UPDATE TASK')
	@description to update task
*/
// describe('UPDATE TASK',() => {
// 	it('With valid input',(done) => {
// 		var textId = 1527589453195;
// 		var text = "mm"
//     request(app)
// 	    .put('/updateTask/'+textId)
// 	    .send({txt:text})
// 	    .expect(200)
// 	    .expect((res) => {
// 	    	console.log("test",res.body);
// 	    	expect(res.body.txt).toBe(text);
// 	    })
// 	    .end(done);
//   });
// });