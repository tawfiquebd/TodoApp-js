// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// If input field is empty
function isEmptyField(e) {
  e.preventDefault();
  if (todoInput.value == 0) {
    alert("Input field can not be empty");
    return;
  } else {
  }
}

// Functions
function addTodo(event) {
  // prevent from form submitting
  event.preventDefault();
  // todo Div
  const todoDiv = document.createElement("div"); // create an tag div
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li"); // create tag li
  newTodo.innerText = todoInput.value;
  // checking if the input field is empty
  if (todoInput.value == "") {
    alert("Input field cann't be empty");
    return;
  }
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); // append newTodo li tag inside todo class
  // Add todo to localstorage
  saveLocalTodos(todoInput.value);
  //check mark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = "<i class='fas fa-check'></i>";
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);
  // clear todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; // get parent tag
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);

    // remove completed item from local storage
    removeCompletedData(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;

    todo.classList.toggle("completed"); // onclick add class Again onlick remove it

    // check completed data and save it to localstorage
    checkCompleted(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Check data is Exist in localStorage & save data in localStorage
function saveLocalTodos(todo) {
  // Check -- Hey do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // insert into localstorage
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Get data from localStorage to UI
function getTodos() {
  // Check -- Hey do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //get completed todos
  let complete;
  if (localStorage.getItem("completed") === null) {
    complete = [];
  } else {
    complete = JSON.parse(localStorage.getItem("completed"));
  }

  todos.forEach(function (todo) {
    // todo Div
    const todoDiv = document.createElement("div"); // create an tag div
    todoDiv.classList.add("todo");

    //if it retutn !== -1 then conditon is true
    //this means we have data in completedList
    if (complete.indexOf(todo) !== -1) {
      todoDiv.classList.add("completed");
    }

    //create li
    const newTodo = document.createElement("li"); // create tag li
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); // append newTodo li tag inside todo class
    //check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check -- Hey do i already have thing in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// check completed data and save it to localStorage
function checkCompleted(todo) {
  const todoIndex = todo.children[0].innerText;
  var completed = localStorage.getItem("completed");
  const array = JSON.parse(completed) || [];

  // if array index is not found in the list then push new checked item
  if (array.indexOf(todoIndex) == -1) {
    array.push(todoIndex);
    const data = JSON.stringify(array);
    localStorage.setItem("completed", data);
  } else {
    //remove item from completed
    if (completed === null) {
      completed = [];
    } else {
      completed = JSON.parse(completed);
    }
    completed.splice(completed.indexOf(todoIndex), 1);
    localStorage.setItem("completed", JSON.stringify(completed));
  }
}

// remove completed data from localStorage
function removeCompletedData(todo) {
  const todoIndex = todo.children[0].innerText;
  var completed = localStorage.getItem("completed");
  const array = JSON.parse(completed) || [];

  if (array.indexOf(todoIndex) !== -1) {
    //remove item from completed
    if (completed === null) {
      completed = [];
    } else {
      completed = JSON.parse(completed);
    }
    completed.splice(completed.indexOf(todoIndex), 1);
    localStorage.setItem("completed", JSON.stringify(completed));
  }
}

// localStorage.clear();
