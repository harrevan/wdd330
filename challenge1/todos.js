import { getDOMContent } from './utilities.js'
import { saveToList, retrieveList, updateChecked, updateRemove } from './ls.js'

export default class ToDo {
    constructor(){
        this.completed = false;
        this.id = Date.now();
    }

    getContent(){
        this.content = getDOMContent();
    }

    checkOff(){
        this.completed = true;
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
        renderToDo(this);
    }

    showToDoList(){
        //this.parentElement.innerHTML = "";
        if(this.getToDoList() != null){
            renderToDoList(document.getElementById("toDoList"), this.getToDoList());
            this.addCheckedListener();
            this.addRemoveListener();
        }
    }

    addCheckedListener(){
        const toDoArray = document.querySelector('ul');
        toDoArray.addEventListener('click', function(e){
            if(e.target.tagName === 'LI'){
                //console.log('e.id: ' + e.target.id);
                updateChecked(e.target.id);
                location.reload();
                //e.currentTarget.dataset.checkOff();
                //console.log(e.currentTarget.dataset)
            }
        });
        console.log(toDoArray);
    }

    addRemoveListener(){
        const toDoArray = document.querySelector('span');
        toDoArray.addEventListener('click', function(e){
            console.log('span: e.dataset: ' + e.currentTarget.dataset.id);
            //updateRemove(e.target.id);
            //location.reload();
        });
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
        renderToDo(toDo);
       // addCheckBoxEventListener(toDo);
    });}

function renderToDo(toDo){
    const item = document.createElement("li");
    item.id = toDo.id;
    const text = document.createTextNode(toDo.content + " " + toDo.completed);

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
    span.className = "close";
    span.id = "remove";
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

