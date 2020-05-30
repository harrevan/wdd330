import ToDo from './todos.js';
//import Hikes from './todos.js';

const addButton = document.getElementById("add");
addButton.addEventListener("click", function(){
    //console.log(todo);
    const todo = new ToDo();
    todo.addToList();
    todo.showToDoList();
    todo.addFilterEventListener();
});


window.addEventListener('load', () => {
    const todo = new ToDo();
    todo.showToDoList();
    todo.addFilterEventListener();
    
  });



