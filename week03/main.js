function doSomething(event){
    //console.log('Something Happened!');
    //console.log(event.type);
    //console.log(event.target);
   // console.log(`screen: (${event.screenX},${event.screenY}),
    //➥ page: (${event.pageX},${event.pageY}), client:
    //➥ (${event.screenX},${event.screenY})`)
    //Mouse Events
    const clickParagraph = document.getElementById('click');
    clickParagraph.addEventListener('click',() =>
    console.log('click'));
    clickParagraph.addEventListener('mousedown',() =>
    console.log('down') );
    clickParagraph.addEventListener('mouseup',() =>
    console.log('up') );  
    const dblclickParagraph = document.getElementById('dblclick');
    dblclickParagraph.addEventListener('dblclick',highlight);
  
}


function highlight(event){
    event.target.classList.toggle('highlight');
}

addEventListener('click', doSomething);
  

// Keyboard Events
addEventListener('keydown',highlight);
addEventListener('keyup', (event) => console.log(`You stopped pressing the key on ${new Date}`));
addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));

