import { getDOMContent } from './utilities.js'
import { saveToList, retrieveList, updateList } from './ls.js'

const toDoList = [];

export default class ToDo {
    constructor(){
        this.completed = false;
        this.id = Date.now();
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
        console.log("list retrieved");
        console.log(list);
        return list;
    }

    showToDo(){
        renderToDo();
    }

    showToDoList(){
        //this.parentElement.innerHTML = "";
        if(this.getToDoList() != null){
            renderToDoList(document.getElementById("toDoList"), this.getToDoList());
        }
    }

/*     removeToDo(id){
        toDoList.forEach(todo => {
            if(todo === id){
                delete todo;
            }
        }); 
    } */
    //addCheckBoxEventListener(id){
        //const toDoArray = Array.from(document.getElementById("toDoList").children);
        //toDoArray.forEach(child => {
            //console.log("child " + child.nodeName);
            //console.log("childs child: " + child.childNodes)
      //      document.getElementById.addEventListener("change", e =>{
        //        if(e.checked){
          //          e.currentTarget.dataset.completed = true;
            //        console.log("e " + e.nodeName);
                    
              //  }
               // else{
                //    e.currentTarget.dataset.completed = false;
                //    console.log(e.currentTarget.dataset);
                //}
            //});

       // });
    //}
}

function renderToDoList(parent, list){
    parent.innerHTML = "";
    list.forEach(toDo => {
        renderToDo();
       // addCheckBoxEventListener(toDo);
    });}

function renderToDo(){
    const item = document.createElement("li");
    const text = document.createTextNode(getDOMContent());

    item.appendChild(text);
    document.getElementById("toDoList").appendChild(item);
    //item.setAttribute("type", "checkbox");
    //item.setAttribute("id", toDo.id);

    //item.innerHTML = `<input type="checkbox" id=${toDo.id}>
      //                <label for=${toDo.id}>${toDo.content}</label>`;

    // Display To Do
   // const label = document.createElement("LABEL");
    //label.htmlFor = toDo.id;
    //label.appendChild(document.createTextNode(toDo.content));
    //item.parentElement.appendChild(label);

    // Display close button
    const span = document.createElement("SPAN");
    const removeIndicator = document.createTextNode("\u00D7");
    span.appendChild(removeIndicator);
    item.appendChild(span);
    //return item;
}

function addCheckBoxEventListener(todo){
    //const toDoArray = Array.from(document.getElementById("toDoList").children);
    //toDoArray.forEach(child => {
        //console.log("child " + child.nodeName);
        //console.log("childs child: " + child.childNodes)
        const checkbox = document.getElementById(todo.id)
        checkbox.addEventListener("change", function() {
            if(checkbox.checked){
                todo.checked = true;
                updateList(todo);
            }
            else{
                todo.completed = false;
                updateList(todo);
            }
        });
}

