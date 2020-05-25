const toDoListName = "myToDos";

export function saveList(list){
    localStorage.setItem(toDoListName, JSON.stringify(list));
    console.log(JSON.parse(localStorage.getItem(toDoListName)));
}

export function retrieveList(){
    return JSON.parse(localStorage.getItem(toDoListName));
}

