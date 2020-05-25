export default function getDOMContent(){
    const content = document.getElementById('addToDo').value;
    if(content != ""){
        return content;
    }
}