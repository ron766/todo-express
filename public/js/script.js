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
  newTodo = { data: $('#new-todo').val()}
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
  @description to mark tasks complete/incomplete
*/
var clicked = false;
$(document).on('click', '#toggle-all', function() {
	debugger;
  if($('body #ckecklist').hasClass('complete')) {
    $('body #ckecklist').removeClass('complete');
    $(".toggle").prop("checked", !clicked);
    clicked = !clicked;
  }
  else {
    $('body #ckecklist').addClass('complete');
      $(".toggle").prop("checked", !clicked);
      clicked = !clicked;
    }
});

/**
  @function on('click', '#toggle-none', function() {}
  @description to unmark all tasks
*/
$(document).on('click', '#toggle-none', function() {
	debugger;
	$('body #ckecklist').removeClass('complete');
    $(".toggle").prop("checked" , false);
    clicked = !clicked;
});

/**
  @function on('click', '#checkbox', function() {}
  @description to mark task completed by checkbox through ajax call
*/
$(document).on('change', '#checkbox', function() {
  if ($(this).is(':checked')) {
   	//get text of marked task
   	var markText = $(this).parent().next().children().attr('data-id');
   	console.log(markText);
   	//ajax call to send data to server for status update
   	var self=this;
   	$.ajax({
            url: '/update',
            type: 'PUT',    
            data: {id:markText},
            success: function(result) {
              console.log("data sent to server for status update");
              $(self).parent().next().children().addClass('complete');
            },
            error: function (err) {
	   					console.log(err);
	   				}
        });
  }
 	else {
  	$(this).parent().next().children().removeClass('complete');
 	}
});

/**
  @function on('click', '#checkbox', function() {}
  @description to to clear all completed tasks
*/
$(document).on('click', '#clear-completed', function() {
	$("#checkbox:checked").each(function () {
    $(this).closest(".input-group-lg").remove();
  });
});