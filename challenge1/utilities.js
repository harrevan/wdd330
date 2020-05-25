export default function getDOMContent(){
    const content = document.getElementById('addToDo').value;
    if(content != ""){
        // Empty text input
        document.getElementById('addToDo').value = "";

        // return content if there is anything
        return content;
    }
}