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
    let array = JSON.parse(localStorage.getItem(toDoListName));
    console.log('Array[0]:')
    console.log(array[0]);
    array.forEach((task, index)=> {
        console.log('task: ')
        console.log(task);
        console.log("index: " + index)
        if(task[index].id === todo.id){
            task[index] = todo;
        }
    });
}


