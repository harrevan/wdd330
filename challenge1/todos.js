import { getDOMContent } from './utilities.js'
import { saveList, retrieveList } from './ls.js'

const toDoList = [];

export default class ToDo {
    constructor(){
        this.completed = false;
        this.Id = Date.now();
        this.content = getDOMContent();
    }

    checkComplete(){
        this.completed = true;
    }

    addToList(){
        if(this.content != ""){
            toDoList.push(this);
            saveList(toDoList);
        }
    }

    getToDoList(){
        const list = retrieveList();
        console.log(list);
        return list;
    }

    showToDoList(){
        //this.parentElement.innerHTML = "";
        console.log("To do list:" + this.getToDoList());
        renderToDoList(this.parentElement, this.getToDoList());
        console.log(this.parentElement);
    }

/*     removeToDo(id){
        toDoList.forEach(todo => {
            if(todo === id){
                delete todo;
            }
        }); 
    } */
}

function renderToDoList(parent, list){
    list.foreach(toDo => {
        parent.appendChild(renderToDo(toDo))
    });
}

function renderToDo(toDo){
    const item = document.createElement("li");
    item.setAttribute("id", toDo.Id);

    // Display To Do
    item.innerHTML = `<label><input type="checkbox">${toDo.content}</label>`;

    // Display close button
    const span = document.createElement("SPAN");
    const text = document.createTextNode("\u00D7");
    span.appendChild(text);
    item.appendChild(span);
}
