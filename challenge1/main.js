import ToDo from './todos.js';
//import Hikes from './todos.js';

const addButton = document.getElementById("add");
addButton.addEventListener("click", function(){
    const todo = new ToDo();
    //console.log(todo);
    todo.addToList();
   // console.log(todo.getToDoList()[0]);
});



