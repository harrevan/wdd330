var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

//To paint in real life, brush must be saturated with paint. Similar concept here
context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";

//Use coordinates to tell where drawing should begin and the width/height of the drawing (0,0) is the upper left corner
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

// GRADIENTS
function drawGradient(){
    var canvas = document.getElementById("demo2");
    var context = canvas.getContext("2d");
    context.strokeStyle = "red";
    //Use gradient as fill style
    var gradient = context.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "blue");
    gradient.addColorStop(1, "white");
    context.fillStyle = gradient;
    context.fillRect(10, 10, 100, 100);
    context.strokeRect(10, 10, 100, 100);
}
drawGradient();

// CIRCLES
function drawCircle(canvas){
    var context = canvas.getContext("2d");

    //Paths create a blueprint for lines, arcs and shapes.
    context.beginPath();

    // Create an arc (segment of the circle). Signature is: arc(x, y, radius, startAngle, endAngle, anticlockwise).
    context.arc(50, 50, 30, 0, Math.PI*2, true);

    // Need to close path
    context.closePath();

    // Stroke or fill to see!!
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 3;
    context.fill();
    context.stroke();
}
drawCircle(document.getElementById("demo3"));

//SAVE
drawCircle(document.getElementById("demo4"));
function saveDrawing() {
    var canvas4 = document.getElementById("demo4");
    window.open(canvas4.toDataURL("image/png"));
}
var button = document.getElementById("saveButton");
button.addEventListener("click", saveDrawing, false);

//DRAW IMAGE TO CANVAS
window.addEventListener("load", drawImageToCanvas, false);
function drawImageToCanvas() {
    var canvas = document.getElementById("demo5");
    var context = canvas.getContext("2d");
    var image = document.getElementById("imageElem");

    //Draw image function to draw our image, needs to be correctly positioned
    context.drawImage(image, 68, 68);
}

//MANIPULATE IMAGE: CONVERT TO BLACK AND WHITE
window.addEventListener("load", manipulateImage, false);
function manipulateImage() {
    var canvas = document.getElementById("demo6");
    var context = canvas.getContext("2d");
    var image = document.getElementById("imageElem");
    context.drawImage(image, 68, 68);

        // use getImageData to manipulate pixles
        var imageData = context.getImageData(0, 0, 200, 200);
        var red, green, blue, greyscale;
    
        //increment by 4 because each pixle takes up 4 values in the array.
        for (var i = 0; i < imageData.data.length; i += 4) {
            red = imageData.data[i];
            green = imageData.data[i + 1];
            blue = imageData.data[i + 2];
    
            //formula to determine grayscale
            grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
            imageData.data[i] = grayscale;
            imageData.data[i + 1] = grayscale;
            imageData.data[i + 2] = grayscale;
        }      
        context.putImageData(imageData, 0, 0);
}


