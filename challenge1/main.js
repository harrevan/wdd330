import ToDo from './todos.js';
//import Hikes from './todos.js';

const addButton = document.getElementById("add");
addButton.addEventListener("click", function(){
    //console.log(todo);
    const todo = new ToDo();
    todo.addToList();
    todo.showToDoList();
});

window.addEventListener('load', () => {
    todo.showToDoList();
  });



