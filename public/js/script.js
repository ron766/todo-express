/**
  @author Rohan Patil
  @description client side script
*/
var newTodo;

/**
  @function $("#addToDo").on("click") - add button
  @description send data to server through ajax call for adding new task
*/
$("#addToDo").on("click", function() {
  $('.checksRow').removeClass('disp');
  newTodo = { data: $('#new-todo').val().trim()}
  if (newTodo.data === "") {
  	alert("Task cannot be blank");
  }
  else {
    $.ajax({
      type: 'POST',
			data: JSON.stringify(newTodo),
			contentType: 'application/json',
      url: '/addtask',
      success: function(data) {
        console.log('success');
        console.log("from script" + data.id);
        $(".checksRow").append("<div class='col-sm-8 col-sm-offset-2'><div class='input-group input-group-lg'><span class='input-group-addon'><input class='toggle' type='checkbox' id='checkbox'> </span> <form>  <input class='edit form-control input-lg' id='ckecklist' value="+JSON.stringify(newTodo.data)+" data-id="+JSON.stringify(data.id)+">  </form> <span class='input-group-btn'> <button class='btn btn-default btn-lg destroy'><i class='glyphicon glyphicon-remove'></i> </button> </span> </div> </div>");
  			$('#new-todo').val("");
      },
      error: function (err) {
        console.log(err);
      }
    });
  }
});


/**
  @function $('.clearTextBtn').on('click') - clear button
  @description to clear input text box
*/
$('.clearTextBtn').on('click', () => {
  debugger;
  $('#new-todo').val("");
});


/**
  @function on('click', '.destroy', function() {}
  @description to clear a task through ajax call
*/
$(document).on('click', '.destroy', function() {
  var destroyText = $(this).parent().prev().children().attr('data-id');
  console.log(destroyText);
  //ajax to fetch array
  var self=this;
  $.ajax({
	  type: 'delete',
	  data: {id:destroyText},
	  url: '/destroy',
	  success: function(msg) {
	  	debugger;
	   	console.log($(self)); 

	   	console.log(JSON.stringify(msg)); 
	   	$(self).closest(".input-group-lg").remove();
	  },
	  error: function (err) {
	   	console.log(err);
	  }
	});
});


/**
  @function on('click', '#toggle-all', function() {}
  @description to mark all tasks complete
*/
var clicked = false;
$(document).on('click', '#toggle-all', function() {
	debugger;
    $.ajax({
      url: '/markall?s='+false,
      type: 'PUT',    
      success: function(result) {
        debugger;
        console.log("data sent to server for status update");
        $('body #ckecklist').addClass('complete');
        $(".toggle").prop("checked", !clicked);
        clicked = !clicked;
      },
      error: function (err) {
        console.log(err);
      }
    });
  });


/**
  @function on('click', '#toggle-none', function() {}
  @description to unmark all tasks
*/
$(document).on('click', '#toggle-none', function() {
	debugger;
  if ($('body #ckecklist').hasClass('complete')) {
    $.ajax({
      url: '/markall?s='+true,
      type: 'PUT',    
      success: function(result) {
        console.log("data sent to server for status update");
        $('body #ckecklist').removeClass('complete');
        $('body #ckecklist').attr("readonly",false)
        $(".toggle").prop("checked" , false);
        clicked = !clicked;
      },
      error: function (err) {
        console.log(err);
      }
    }); 
  }
});


/**
  @function on('click', '#checkbox', function() {}
  @description to mark/unmark task completed by checkbox through ajax call
*/
$(document).on('change', '#checkbox', function() {
  var markText;
  if ($(this).is(':checked')) {
   	//get text of marked task
   	markText = $(this).parent().next().children().attr('data-id');
   	console.log(markText);
   	//ajax call to send data to server for status update
   	var self=this;
   	$.ajax({
      url: '/markdone',
      type: 'PUT',    
      data: {id:markText,status:false},
      success: function(result) {
        debugger;
        console.log("data sent to server for status update");
        $(self).parent().next().children().addClass('complete');
        $(self).parent().next().children().attr('readonly', 'true');
      },
      error: function (err) {
					console.log(err);
				}
    });
  }
 	else {
    markText = $(this).parent().next().children().attr('data-id');
    console.log(markText);
    //ajax call to send data to server for status update
    var self=this;
    $.ajax({
      url: '/markdone',
      type: 'PUT',    
      data: {id:markText,status:true},
      success: function(result) {
        console.log("data sent to server for status update");
        $(self).parent().next().children().removeClass('complete');
        $(self).parent().next().children().attr('readonly', false);
      },
      error: function (err) {
        console.log(err);
      }
    });
 	}
});


/**
  @function on('click', '#checkbox', function() {}
  @description to to clear all completed tasks
*/
$(document).on('click', '#clear-completed', function() {
	$("#checkbox:checked").each(function () {
    var self=this;
    $.ajax({
      type: 'delete',
      url: '/clearCompleted',
      success: function(msg) {
        $(self).closest(".input-group-lg").remove();
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});


/**
  @function on('click', '.active', function() {}
  @description to show active tasks
*/
$(document).on('click', '.activeBtn', function() {
  debugger;
  $('.showActive').removeClass('disp');
  $('.showAll').addClass('disp');
  $('.showCompleted').addClass('disp');
  $('.checksRow').addClass('disp');
  $('.showCompleted').html('');
  /*active class*/
  $('.activeBtn').addClass('aactive');
  $('.allBtn').removeClass('aactive');
  $('.completedBtn').removeClass('aactive');
  //ajax call
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: '/active',
    success: function(msg) {
      $('.showActive').html('');
      for(var i=0; i < msg.length; i++) {
        $(".checksRowActive").append("<div class='col-sm-8 col-sm-offset-2'><div class='input-group input-group-lg'><span class='input-group-addon'><input class='toggle' type='checkbox' id='checkbox'> </span> <form>  <input class='edit form-control input-lg' id='ckecklist' value="+JSON.stringify(msg[i].todo)+">  </form> <span class='input-group-btn'> <button class='btn btn-default btn-lg destroy'><i class='glyphicon glyphicon-remove'></i> </button> </span> </div> </div> <br>");
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
});


/**
  @function on('click', '.completedBtn', function() {}
  @description to show completed tasks
*/
$(document).on('click', '.completedBtn', function() {
  debugger;
  $('.showCompleted').removeClass('disp');
  $('.showActive').addClass('disp');
  $('.showAll').addClass('disp');
  $('.checksRowActive').html('');
  /*active class*/
  $('.completedBtn').addClass('aactive');
  $('.allBtn').removeClass('aactive');
  $('.activeBtn').removeClass('aactive');
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: '/completed',
    success: function(msg) {
      console.log(msg); 
      $('.showCompleted').html('');
      for(var i=0; i < msg.length; i++) {
        $(".showCompleted").append("<div class='col-sm-8 col-sm-offset-2'><div class='input-group input-group-lg'><span class='input-group-addon'><input class='toggle' type='checkbox' id='checkbox' checked> </span> <form>  <input class='edit form-control input-lg complete' id='ckecklist' value="+JSON.stringify(msg[i].todo)+" readonly>  </form> <span class='input-group-btn'> <button class='btn btn-default btn-lg destroy'><i class='glyphicon glyphicon-remove'></i> </button> </span> </div> </div> <br>");
      }  
    },
    error: function (err) {
      console.log(err);
    }
  });
});


/**
  @function on('click', '.allBtn', function() {}
  @description to show all tasks
*/
$(document).on('click', '.allBtn', function() {
  $('.showAll').removeClass('disp');
  $('.showActive').addClass('disp');
  $('.showCompleted').addClass('disp');
  $('.checksRow').removeClass('disp');
  $('.checksRowActive').html(''); 
  $('.showCompleted').html('');
  /*active class*/
  $('.activeBtn').removeClass('aactive');
  $('.allBtn').addClass('aactive');
  $('.completedBtn').removeClass('aactive');
});


/**
  @function on('focusout', '#ckecklist', function() {}
  @description to edit existing task
*/
$(document).on('focusout', '#ckecklist', function(e) {
  var textId = $(this).attr('data-id');
  var text = $(this).val();
  console.log(textId,text);

  var self=this;
  $.ajax({
    url: '/updateTask/'+textId,
    type: 'PUT',    
    data: {txt:text},
    success: function(result) {
      debugger;
      console.log("data sent to server for status update",result);
      $(this).text(result.txt);
    },
    error: function (err) {
      console.log(err);
    }
  });
});