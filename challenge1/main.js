import ToDo from './todos.js';
//import Hikes from './todos.js';

const todo = new ToDo();
const addButton = document.getElementById("add");
addButton.addEventListener("click", function(){
    //console.log(todo);
    todo.addToList();
    todo.showToDoList();
});

window.addEventListener('load', () => {
    todo.showToDoList();
  });



