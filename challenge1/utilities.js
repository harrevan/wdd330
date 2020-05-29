export function getDOMContent(){
    const content = document.getElementById('addToDo').value;
    return content;
}

export function resetDOMContent(){
    document.getElementById('addToDo').value = "";
}
