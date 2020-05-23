export default function saveList(list){
    const toDoListName = "myToDos";

    console.log(list[0]);
    console.log(window.closed);
    window.localStorage.clear;
    //console.log(JSON.parse(localStorage.getItem(toDoListName)));
}