import getDOMContent from './utilities.js'
import saveList from './ls.js'

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
        toDoList.push(this);
        saveList(toDoList);
    }

    getToDoList(){
        return toDoList;
    }

/*     removeToDo(id){
        toDoList.forEach(todo => {
            if(todo === id){
                delete todo;
            }
        }); 
    } */
}
