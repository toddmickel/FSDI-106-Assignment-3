// Variables at the top; no logic outside functions

// Supporting functions
function saveToDo() {
    let input = $('#todo-text');
    let item = input.val();
    let syntax = "<div class='todo-item'><h6>" + item + "</h6></div>";
    $('#pending-list').append(syntax);
    input.val("").focus();
}

// Challenge: Create functionality to delete on click

// Always use an initializing function (at bottom of code)
function init(){
    // load data

    // hook events
    $("#add-btn").click(saveToDo);
    $("#todo-text").keypress(function(e) {
        if(e.keyCode === 13) {
            saveToDo();
        }
    });
}
// Always load the initializing function on window load
window.onload = init;