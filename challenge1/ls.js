const toDoListName = "myToDos";

export function saveToList(todo){
    console.log("setting local storage...");
    if(!localStorage.getItem(toDoListName)){
        var storageArray = [];
        storageArray.push(todo);
        localStorage.setItem(toDoListName, JSON.stringify(storageArray));
    }
    else{
        var storageArray = JSON.parse(localStorage.getItem(toDoListName));
        storageArray.push(todo);
        localStorage.setItem(toDoListName, JSON.stringify(storageArray));
        console.log(storageArray);

    }
}

export function retrieveList(){
    console.log(JSON.parse(localStorage.getItem(toDoListName)));
    return JSON.parse(localStorage.getItem(toDoListName));
}

export function updateList(todo){
    const array = localStorage.getItem(toDoListName);
    const newArray = JSON.parse(array).map(task=> {
        if(task.id === todo.id){
            task.completed = todo.completed;
        }
        console.log(newArray);
    });
    console.log("retrieve list: " + retrieveList()[0].completed);
    localStorage.setItem(toDoListName, array);
}


