export function getDOMContent(){
    const content = document.getElementById('addToDo').value;
    return content;
}

export function addCheckBoxEventListener(todo){
    const checkbox = document.getElementById(todo.id);
    checkbox.addEventListener('change', function(){
        if(this.checked){
            todo.completed = true;
        }
        else{
            todo.completed = false;
        }
    console.log(todo.id + " " + todo.completed);
    });
}