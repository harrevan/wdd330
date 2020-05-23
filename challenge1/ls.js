export default function saveList(list){
    const toDoListName = "myToDos";

    console.log(list[0]);
    localStorage.setItem("hello", "hi");
    //console.log(JSON.parse(localStorage.getItem(toDoListName)));
}