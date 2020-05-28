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
            console.log("child " + child.nodeName);
            console.log("childs child: " + child.childNodes)
            child.addEventListener("change", e =>{
                if(child.checked){
                    e.currentTarget.dataset.completed = true;
                    console.log("e " + e.nodeName);
                    
                }
                else{
                    e.currentTarget.dataset.completed = false;
                    console.log(e.currentTarget.dataset);
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
    const item = document.createElement("INPUT");
    item.setAttribute("type", "checkbox");
    item.setAttribute("id", toDo.id);

    // Display To Do
    item.innerHTML = toDo.content;

    // Display close button
    const span = document.createElement("SPAN");
    const text = document.createTextNode("\u00D7");
    span.appendChild(text);
    item.appendChild(span);

    return item;
}


