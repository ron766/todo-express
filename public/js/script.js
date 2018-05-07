//function to add data to todo list
$("#addToDo").on("click", function() {
  $('.checksRow').removeClass('disp');
  var newTodo = { data: $('#new-todo').val()}
  if (newTodo == "") {
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
        console.log("from script" + JSON.stringify(data));
      },
      error: function (err) {
        console.log(err);
      }
    });

  	$(".checksRow").append("<div class='col-sm-8 col-sm-offset-2'><div class='input-group input-group-lg'><span class='input-group-addon'><input class='toggle' type='checkbox' id='checkbox'> </span> <form>  <input class='edit form-control input-lg' id='ckecklist' value="+newTodo.data+">  </form> <span class='input-group-btn'> <button class='btn btn-default btn-lg destroy'><i class='glyphicon glyphicon-remove'></i> </button> </span> </div> </div>");
  	$('#new-todo').val("");
  }
});

//function to clear text from
$('.clearTextBtn').on('click', () => {
  debugger;
  $('#new-todo').val("");
});

//function to remove a todo
$(document).on('click', '.destroy', function() {
  $(this).closest(".input-group-lg").remove();
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

//function for textbox 
$(document).on('change', '#checkbox', function() {
  debugger;
   if ($(this).is(':checked')) {
     $(this).parent().next().children().addClass('complete')
   }
   else {
     $(this).parent().next().children().removeClass('complete');
   }
});
