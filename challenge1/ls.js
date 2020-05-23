export default function saveList(list){
    const toDoListName = "myToDos";
    localStorage.setItem(toDoListName, JSON.stringify(list));
    console.log(JSON.parse(localStorage.getItem(toDoListName)));
}