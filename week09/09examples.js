// Global variable is a property of the window object
globalVar = "Hello, I'm a global variable.";
console.log(window.globalVar);

// Timing Functions Example
const squareElement = document.getElementById('square');
let angle = 0;
    window.setInterval( () => {
    angle = (angle + 2) % 360;
    squareElement.style.transform = `rotate(${angle}deg)`
}, 1000/60);
