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

export function updateList(id){
    let array = JSON.parse(localStorage.getItem(toDoListName));
    //console.log('Array[0]:')
    //console.log(array[0]);
    for(let i = 0; i < array.length; i++){
        console.log('passed id: ' + id);
        console.log(array[0].id);
        if(parseInt(array[i].id, 10) === parseInt(id, 10)){
            
            array[i].completed = true;
            console.log(array[i]);
        }
    }

    localStorage.setItem(toDoListName, JSON.stringify(array));
    //array = array.map(function(task){
        //console.log('task: ');
        //console.log(task);
        //console.log("index: " + index);
        //console.log('array[index]');
        //console.log(array[index]);
      //  if(task.id === todo.id){
          //  task = todo;
        //}
 //   });
}


