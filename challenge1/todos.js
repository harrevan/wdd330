import { getDOMContent, resetDOMContent } from './utilities.js'
import { saveToList, retrieveList, updateChecked, updateRemove, retrieveFilteredList } from './ls.js'

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
            resetDOMContent();
        }
    }

    getToDoList(filter){
        const list = retrieveList(filter);
        console.log("list retrieved");
        console.log(list);
        return list;
    }

    getFilteredList(status){
        const list = retrieveFilteredList(status);
        return list;
    }

    showToDo(){
        renderToDo(this);
    }

    showToDoList(filter){
        //this.parentElement.innerHTML = "";
        if(this.getToDoList(filter) != null){
            renderToDoList(document.getElementById("toDoList"), this.getToDoList(filter));
            this.addCheckedListener();
            this.addRemoveListener();
        }
        countRemainingTodos(this.getToDoList(document.getElementById("numTasksLeft"), this.getToDoList(false)));
    }

    showFilteredList(status){
        if(this.getToDoList() != null){
            renderToDoList(document.getElementById("toDoList"), this.getFilteredList(status));
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
        const toDoArray = document.getElementsByClassName("close");
        console.log(toDoArray);
        for(let i = 0; i < toDoArray.length; i++){
            toDoArray[i].addEventListener('click', function(e){
               // console.log('e: ' + e.target.id);
                updateRemove(e.target.id);
                location.reload();
            });

        }  
        //console.log("span size:" + toDoArray.length)
        //toDoArray.forEach(todo => {
           //todo.addEventListener("click", function(e){
             //   console.log('span: e.dataset: ' + e.currentTarget.dataset.id);
          //      this.updateRemove(e.target.id);
           //     location.reload();
             //});

        //});
    }

    addFilterEventListener(){
        const toDo = this;
        const filters = document.getElementsByClassName("filter")
        for(let i = 0; i < filters.length; i++){
            filters[i].addEventListener('click', function(e){
                console.log('e: ' + e.target.id);
                if(e.target.id === "active"){
                    //filterList(false);
                    //this.showFilteredList(false);
                    //applyFilter(false);
                    toDo.showToDoList(false);
                }
                else if(e.target.id === "completed"){
                    toDo.showToDoList(true);
                }
                else{
                   toDo.showToDoList("all");
                }
            });
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

function applyFilter(filter){
    return filter;
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
    if(toDo.completed){
        item.className = "complete";
    }
    
    const text = document.createTextNode(toDo.content);

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
    span.id = toDo.id;
    item.appendChild(span);
    //return item;
}

function countRemainingTodos(domLocation, list){
    const count = list.length;
    domLocation.innerText = count + " tasks left";
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

