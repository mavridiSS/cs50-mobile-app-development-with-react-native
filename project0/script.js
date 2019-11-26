const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete"
};

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");

function newTodo() {
  const todoText = prompt("TODO text:");
  console.log(todoText);
  addToDo(todoText);
}

function getDeleteButton(id) {
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", classNames["TODO_DELETE"]);
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function() {
    itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) - 1;
    // only decrement unchec  ked count when todo is not checked
    if (!document.getElementById("checkbox" + id).checked) {
      uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1;
    }
    list.removeChild(document.getElementById(id));
  });
  return deleteButton;
}

function getCheckbox(id) {
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "checkbox" + id);
  input.setAttribute("class", classNames["TODO_CHECKBOX"]);
  input.addEventListener("change", function() {
    if (this.checked) {
      uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1;
    } else {
      uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1;
    }
  });
  return input;
}

function getListItem() {
  var li = document.createElement("li");
  li.setAttribute("class", classNames["TODO_ITEM"]);
  var liID = itemCountSpan.innerHTML;
  li.setAttribute("id", liID);
  return li;
}

function getSpan(text) {
  var span = document.createElement("span");
  span.setAttribute("class", classNames["TODO_TEXT"]);
  span.innerText = text;
  return span;
}

function addToDo(text) {
  var li = getListItem();
  li.appendChild(getCheckbox(li.id));
  li.appendChild(getSpan(text));
  li.appendChild(getDeleteButton(li.id));
  list.appendChild(li);
  itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) + 1;
  uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1;
}
