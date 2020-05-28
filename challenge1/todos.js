import { getDOMContent } from './utilities.js'
import { saveToList, retrieveList } from './ls.js'

const toDoList = [];

export default class ToDo {
    constructor(){
        this.completed = false;
        this.Id = Date.now();
    }

    getContent(){
        this.content = getDOMContent();
    }

    addToList(){
        const content = getDOMContent();
        if(content != ""){
            this.content = content;
            saveToList(this);
        }
    }

    getToDoList(){
        const list = retrieveList();
        console.log(list);
        return list;
    }

    showToDoList(){
        //this.parentElement.innerHTML = "";
        if(this.getToDoList() != null){
            console.log(document.getElementById("toDoList"));
            renderToDoList(document.getElementById("toDoList"), this.getToDoList());
            this.addCheckBoxEventListener();
        }
    }

/*     removeToDo(id){
        toDoList.forEach(todo => {
            if(todo === id){
                delete todo;
            }
        }); 
    } */
    addCheckBoxEventListener(){
        const toDoArray = Array.from(document.getElementById("toDoList").children);
        toDoArray.forEach(child => {
            child.addEventListener("change", e =>{
                if(this.checked){
                    e.currentTarget.dataset.completed = true;
                    console.log(child.completed);
                }
                else{
                    e.currentTarget.dataset.completed = false;
                    console.log(child.completed);
                }
            });

        });
    }
}

function renderToDoList(parent, list){
    parent.innerHTML = "";
    console.log("LIST: ");
    console.log(list);
    list.forEach(toDo => {
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

    return item;
}


