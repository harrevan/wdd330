//Length property
function square(x) {
    return x*x;
}
console.log("Length property of function square(): " + square.length);

// call() Example
function sayHello(greeting="Hello"){
    console.log(`${greeting}, my name is ${this.name}`);
}

const clark = { name: 'Clark' };
const bruce = { name: 'Bruce' };

//use call()
sayHello.call(clark, "How do you do ");
sayHello.call(bruce, "Howdy ");
//use call with no reference to this
console.log(square.call(null, 4));

//IFFE Example
(function(){
    const temp = 'World';
    console.log(`Hello ${temp}`);
})();

// Redefined function
function party(){
    console.log("Wow this is amazing!");
    party = function(){
        console.log("Been there, got the T-shirt!");
    }
}
// First call, shows original message
//party();

// Next calls show rewritten function
//party();
//party();

// Assign original function to another variable, and variable will maintain original function definition.
const beachParty = party;
console.log('beachparty()');
beachParty();
party();
beachParty();

//Example of Recursion
function factorial(n){
    if (n ===0){
        return 1;
    }
    else{
        return n * factorial(n-1);
    }
}

console.log("Factorial of 4 = " + factorial(4));

//Promise example
const dice = {
    sides: 6,
    roll() {
    return Math.floor(this.sides * Math.random()) + 1;
    }
}
console.log('Before the roll');
const roll = new Promise( (resolve,reject) => {
const n = dice.roll();
    if(n > 1){
        setTimeout(()=>{resolve(n)},n*200);
    } else {
        setTimeout(()=>reject(n),n*200);
    }
});
roll.then(result => console.log(`I rolled a ${result}`) )
.catch(result => console.log(`Drat! ... I rolled a ${result}`) );
console.log('After the roll');

//Callbacks: generalized functions.
function random(a,b,callback) {
    if (b === undefined) b = a, a = 1; // if only one argument is supplied, assume the lower limit is 1
        let result = Math.floor((b-a+1) * Math.random()) + a
    if(callback) {
        result = callback(result);
    }
    return result;
}

function square(n){
    return n*n;
}

console.log('generalized: ' + random(1,10,square));

// closure example
function outer() {
    const outside = 'Outside!';
    function inner() {
        const inside = 'Inside!';
        console.log(outside);
        console.log(inside);
    }
    return inner;
}
const closure = outer();
console.log("closure: " + closure());