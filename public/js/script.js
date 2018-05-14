var newTodo;

//function to add data to todo list
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

//function to clear text from input add box
$('.clearTextBtn').on('click', () => {
  debugger;
  $('#new-todo').val("");
});

//function to remove a todo
$(document).on('click', '.destroy', function() {
  debugger;
  var destroyText = $(this).parent().prev().children().val();
  console.log(destroyText);

  //ajax to fetch array
  var self=this;
  $.ajax({
	  type: 'delete',
	  data: {todo:destroyText},
	  url: '/destroy',
	  success: function(msg) {
	   	console.log(JSON.stringify(msg)); 
	   	$(self).closest(".input-group-lg").remove();
	  },
	  error: function (err) {
	   	console.log(err);
	  }
	});
});

//mark all complete
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

/*unmark all*/
$(document).on('click', '#toggle-none', function() {
	debugger;
	$('body #ckecklist').removeClass('complete');
    $(".toggle").prop("checked" , false);
    clicked = !clicked;
});

//function to mark input completed with checkbox 
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

//function to clear Completed
$(document).on('click', '#clear-completed', function() {
	$("#checkbox:checked").each(function () {
    $(this).closest(".input-group-lg").remove();
  });
});