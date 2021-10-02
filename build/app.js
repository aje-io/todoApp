//Asking the user for a user name
// let userName = prompt(`what is your name?`);
// const title = document.getElementsByClassName("title")[0]; //if you dont add [0], the h1 on the webPage wont be updated
// title.innerText = `${userName}'s ToDo List`;
// if (userName == null) {
//   title.innerText = `ToDo List`;
// }

//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//EventListners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
//adding an event listner to the whole item
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filtertodo);
//function
function addTodo(event) {
  //we have to prevent the button from submitting the results
  event.preventDefault();
  //create a todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //creating an LI
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  //add data to the local storage
  saveLocalTodos(todoInput.value);
  //adding the li to the todo div
  todoDiv.appendChild(newTodo);
  //creating the buttons
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("complete-btn");

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");

  todoDiv.appendChild(checkButton);
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  //adding the todo to the local storage

  //clear todo input
  todoInput.value = "";
}

function deleteCheck(e) {
  //we pass in e as the event and assign the target to a variable named item
  const item = e.target;
  //delete the whole newTodo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    //this event listner will wait for the transition to be over
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    removeLocalStorage(todo);
  }
  //The check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("complete");
  }
}

//adding the fiter options
function filtertodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
//saving the todo to the local storage
function saveLocalTodos(todo) {
  //check if we already have a todo list, because we shouldnot re write one if there is one saved
  let todos;
  if (localStorage.getItem("todos") == null) {
    //creating an array if there is none
    todos = [];
  } else {
    //if an arrray exist, we take the data inside that array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //we push elements inside an array
  todos.push(todo);
  //add the array to the local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //creating an LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;

    //adding the li to the todo div
    todoDiv.appendChild(newTodo);
    //creating the buttons
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("complete-btn");

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.append(checkButton, trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
