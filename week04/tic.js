// var to keep track of click counts (to represent player turns)
let clickCount = 0;
function turn(){
    // Alternate betwen X and O turns. X plays first.
    if (clickCount % 2 === 0){
        this.innerHTML = 'X';
    }
    else{
        this.innerHTML = 'O';
    }
    
    clickCount++;
}
function reset(){
    document.querySelectorAll('#board td').forEach(cell => cell.innerHTML = " ");
    clickCount = 0;
}

// Add event listener to each cell in table
document.querySelectorAll('#board td').forEach(e => e.addEventListener("touchend",turn));

// Add event listener for reset button
document.getElementById('resetButton').addEventListener('touchend', reset);