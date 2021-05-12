var isImportant = false;
var detailsVisible = true;
var idx = 0;
var serverURL = "http://fsdi.azurewebsites.net/api";

function toggleImportant() {
  if (isImportant) {
    $("#imp-star").removeClass("fas").addClass("far");
    isImportant = false;
  } else {
    $("#imp-star").removeClass("far").addClass("fas");
    isImportant = true;
  }
}

function saveTask() {
  // get the values from controls
  let title = $("#txtTitle").val();
  let desc = $("#txtDesc").val();
  let date = $("#dateDue").val();
  let alert = $("#selAlert").val();
  let location = $("#txtLocation").val();

  // create an object
  let aTask = new Task(title, desc, isImportant, date, alert, location);

  // console log the object
  console.log(aTask);
  console.log(JSON.stringify(aTask));
  // send task to server
  $.ajax({
    url: serverURL + "/tasks", // '/tasks' is endpoint of server
    type: "POST",
    data: JSON.stringify(aTask),
    contentType: "application/json",
    success: function (res) {
      console.log(`Server says`, res);
      displayTask(res);
    },
    error: function (error) {
      console.error(`Error saving: ${error}`);
    },
  });

  clear();
}

function clear() {
  $("#txtTitle").val("");
  $("#txtDesc").val("");
  $("#dateDue").val("");
  $("#selAlert").val(1);
  $("#txtLocation").val("");
  if (isImportant) {
    $("#imp-star").removeClass("fas").addClass("far");
    isImportant = false;
  }
}

function displayTask(task) {
  let alert = "";
  switch (task.alertText) {
    case "1":
      alert = "Don't forget to:";
      break;
    case "2":
      alert = "Stop:";
      break;
    case "3":
      alert = "Start:";
      break;
    case "4":
      alert = "Get more coffee and then:";
      break;
  }
  let syntax = `
    <div class="displayed-task" id="task${idx}">
      <div class="task-header">`;
  if (task.important === true) {
    syntax += `<i class="fas fa-star important"></i>
    <alert class="important">${alert} ${task.title}</alert>`;
  } else {
    syntax += `
    <alert>${alert} ${task.title}</alert>`;
  }
  syntax += `
      </div>
      <div class="task-detail">
        ${task.description}
      </div>
      <div class="task-location">
        ${task.location}
      </div>
      <div class="due-date">
        ${task.dateDue}
      </div>
      <div class="del-btn-cont">
        <button class="btn btn-dark btn-sm" onclick="delTask(${idx})">Delete</button>
      </div>
      `;

  $("#tasksContainer").append(syntax);
  idx++;
  // put actual task display here.  Divide task display into divs?
}

function delTask(index) {
  $(`#task${index}`).remove();
}

function retrieveTasks() {
  $.ajax({
    url: serverURL + "/tasks",
    type: "GET",
    success: function (list) {
      console.log("retrieve", list);

      for (let i = 0; i < list.length; i++) {
        let task = list[i];

        if (task.user === "Todd") {
          displayTask(task);
        }
      }
    },
    error: function (err) {
      console.error("Error!", err);
    },
  });
}

function init() {
  //load data
  retrieveTasks();
  //hook events
  $("#imp-star").click(toggleImportant);
  $("#details-btn").click(function () {
    $("#details").toggle();
  });
  $("#save-btn").click(saveTask);
}

window.onload = init;

function testRequest() {
  // uses jQuery AJAX created by MS around 2002-2005.  Asyncrhonous JavaScript in XML.  Parameter is object literal/configuration object
  $.ajax({
    url: "https://restclass.azurewebsites.net/api/test",
    type: "GET",
    success: function (response) {
      console.log(`Success!  :D  Server responded with ${response}.`);
    },
    error: function (errorDetails) {
      console.error(`Error.  :(  Server responded with ${errorDetails}`);
    },
  });
}
