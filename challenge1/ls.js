const toDoListName = "myToDos";

export function saveToList(todo){

    if(!localStorage.getItem(toDoListName)){
        var storageArray = [];
        storageArray.push(todo);
        localStorage.setItem(toDoListName, JSON.stringify(storageArray));
    }
    else{
        var storageArray = JSON.parse(localstorage.getItem(toDoListName));
        storageArray.push(todo);
        localstorage.setItem(toDoListName, JSON.stringify(storageArray));

    }
    
    console.log(JSON.parse(localStorage.getItem(toDoListName)));
}

export function retrieveList(){
    return JSON.parse(localStorage.getItem(toDoListName));
}

