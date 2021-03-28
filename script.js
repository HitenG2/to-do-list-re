let addMessage = document.querySelector(".message"),
  addButton = document.querySelector(".todo-list__add"),
  todo = document.querySelector(".todo");
let todoList = [];

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  displayMessages();
}

addButton.addEventListener("click", function () {
  if (!addMessage.value) return;
  let newTodo = {
    todo: addMessage.value,
    checked: false,
  };
  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem("todo", JSON.stringify(todoList));
  addMessage.value = "";
});

function displayMessages() {
  let displayMessage = "";
  if (todoList.length === 0) todo.innerHTML = "";
  todoList.forEach(function (item, i) {
    displayMessage += `
		<li class="todo__line">
			<input type="checkbox" class="todo__checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
			<label for="item_${i}">${item.todo}</label>
			<!--<i id="item_${i}" class="bi bi-trash"></i>-->
		</li>
		`;
    todo.innerHTML = displayMessage;
		/*let biTrash = document.querySelector(".bi-trash");
		biTrash.addEventListener('click', function (e) {
			let valueLabel = todo.querySelector("[for=" + e.target.id + "]").innerHTML;
  		todoList.forEach(function (item, i) {
    		if (item.todo === valueLabel) todoList.splice(i, 1);
    		displayMessages();
    		localStorage.setItem("todo", JSON.stringify(todoList));
  		});
		})*/
  });
}


todo.addEventListener("change", function (e) {
  let valueLabel = todo.querySelector("[for=" + e.target.id + "]").innerHTML;
  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

todo.addEventListener('contextmenu', function(e){
	e.preventDefault();
	todoList.forEach(function(item, i){
		if(item.todo === e.target.innerHTML){
			if(e.ctrlKey) todoList.splice(i, 1);
		}
		displayMessages();
		localStorage.setItem('todo', JSON.stringify(todoList));
	})
})


