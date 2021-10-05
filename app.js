const todoTextInput = document.querySelector(".form__input");
const todoSubmitButton = document.querySelector(".form-button");
const todoListContainer = document.querySelector(".todo-container");
const todoContainer = document.querySelector(".todo-container");

todoSubmitButton.addEventListener("click", addTodo);
todoContainer.addEventListener("click", buttonAction);
document.addEventListener("DOMContentLoaded", retriveTodo);

function localStorageData() {
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
    return todos;
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    return todos;
  }
}

function saveTodo(data) {
  let todos = localStorageData();
  todos.push(data);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createDivButton(input) {
  const todoCard = document.createElement("div");
  todoCard.classList.add("todo");

  const newTodo = document.createElement("ul");

  const newTodoItem = document.createElement("li");
  newTodoItem.classList.add(".todo__text");
  newTodoItem.innerText = todoTextInput.value;

  newTodoItem.innerText = input;

  newTodo.appendChild(newTodoItem);
  todoCard.appendChild(newTodo);
  todoContainer.appendChild(todoCard);
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("buttons");

  const completButton = document.createElement("button");
  completButton.classList.add("button", "completed");
  completButton.innerHTML =
    '<i class="fa fa-check"><span> Completed</span></i>';

  const removeButton = document.createElement("button");
  removeButton.classList.add("button", "remove");
  removeButton.innerHTML = '<i class="fa fa-trash"><span> Remove</span></i>';

  buttonDiv.append(completButton, removeButton);
  todoCard.appendChild(buttonDiv);
}

function addTodo(element) {
  element.preventDefault();
  if (todoTextInput.value != false) {
    createDivButton(todoTextInput.value);
    saveTodo(todoTextInput.value);
  }
  todoTextInput.value = "";
}

function removeLocalStorageTodo(item) {
  const itemToRemove = item.children[0].innerText;
  let localArray = localStorageData();
  const indexofItem = localArray.indexOf(itemToRemove);
  console.log(indexofItem);
  console.log(`before splice ${localArray}`);
  localArray.splice(indexofItem, 1);
  console.log(localArray);
  localStorage.setItem("todos", JSON.stringify(localArray));
}

function buttonAction(button) {
  const actionToPerform = button.target;
  const buttonsDiv = actionToPerform.parentElement;
  const cardToModify = buttonsDiv.parentElement;
  if (actionToPerform.classList[1] == "completed") {
    //the animation part
    cardToModify.classList.toggle("blur");
    //save the element as completed
  }
  if (actionToPerform.classList[1] == "remove") {
    cardToModify.classList.add("swipe");
    cardToModify.addEventListener("transitionend", function () {
      cardToModify.remove();
    });
    removeLocalStorageTodo(cardToModify);
  }
}

function retriveTodo() {
  let localTodo = localStorageData();
  localTodo.forEach(function (item) {
    createDivButton(item);
  });
}
