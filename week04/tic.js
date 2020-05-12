let clickCount = 0;
function turn(){
    if (clickCount % 2 === 0){
        this.innerHTML = 'X';
    }
    else{
        this.innerHTML = 'O';
    }
    clickCount++;
}
function reset(){
    location.reload();
}

// Add event listener to each cell in table
document.querySelectorAll('#board td').forEach(e => e.addEventListener("touchend",turn));
document.getElementById('resetButton').addEventListener("touchend", reset);