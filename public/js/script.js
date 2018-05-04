//function to add data to todo list
$("#addToDo").on("click", function() {
  $('#todo-form').submit();
  $('.checksRow').removeClass('disp');
  var newTodo = $('#new-todo').val();
  $(".checksRow").append("<div class='col-sm-8 col-sm-offset-2'><div class='input-group input-group-lg'><span class='input-group-addon'><input class='toggle' type='checkbox'> </span> <form>  <input class='edit form-control input-lg' id='ckecklist' value="+newTodo+">  </form> <span class='input-group-btn'> <button class='btn btn-default btn-lg destroy'><i class='glyphicon glyphicon-remove'></i> </button> </span> </div> </div>");
  // $('#ckecklist').val(newTodo);
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

//
