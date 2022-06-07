// *************************************************************************
// ********************************* Example *******************************
// *************************************************************************


// ******************** html ************************
<input type="text">
<button>Add Todo</button>
<ul></ul>





// ******************* js **************************
let inputEl = document.querySelector('input');
let buttonEl = document.querySelector('button');
let ulEl = document.querySelector('ul');
let todos = [];

buttonEl.addEventListener('click', addTodo);


function addTodo() {
	let userInput = inputEl.value;
  if (userInput.trim() == '') {
  	return;
  }
  let newTodo = {
  	id: Math.random(),
    value: userInput
  };
  
  todos.push(newTodo);
  
  let toDoLi = document.createElement('li');
  toDoLi.textContent = userInput;
  toDoLi.addEventListener('click', removeTodo);
  toDoLi.dataset.id = newTodo.id;
  ulEl.appendChild(toDoLi);
  console.log(todos);
}




function removeTodo(event) {
	let clickedLi = event.target;
  let itemId = clickedLi.dataset.id;
  for(let i = 0; i < todos.length; i++) {
  	if (todos[i].id == itemId) {
      todos.splice(i, 1);
      break;
    }
  }  

  clickedLi.parentNode.removeChild(clickedLi);
  console.log(todos);
}










