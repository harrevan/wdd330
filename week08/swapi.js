const pplURL = "https://swapi.dev/api/people/";
var nextURL;
var prevURL;
var next;

window.addEventListener("load", () =>{
  getData(pplURL);
});

document.getElementById("next").addEventListener("click", () =>{
  //console.log(getNext());
  getData(getNext());
});

document.getElementById("prev").addEventListener("click", () =>{
  //console.log(getNext());
  getData(getPrev());
});

function setNext(url){
    next = url;
}

function getNext(){
    return next;
}

function setPrev(url){
  prevURL = url;
}

function getPrev(){
  console.log("prevurl: " + prevURL );
  return prevURL;
}

function renderList(list){
  document.getElementById("people").innerHTML = "";
  list.forEach(person => {
    var name = person.name;
    var par  = document.createElement("p");
    par.innerText = name;
    par.addEventListener("click", function(event){
      console.log(person);
      getMoreInfo(person, par);
    });
    document.getElementById("people").appendChild(par);
  })
}

function getData(url){
    console.log(url)
    fetch(url)
    .then( response => response.json())
    .then( data => {
        console.log(data.next);
        if(data.next){
          setNext(data.next);
        }
        if(data.previous){
          setPrev(data.previous);
        }  
        console.log(data.results);
        renderList(data.results);
    })
    .catch( error => console.log('There was an error:', error))
}

function getMoreInfo(person, parent){
  if(parent.hasChildNodes){
    return;
  }
  else{
    var p = document.createElement("p");
    console.log(person);
      p.innerText = "Height: " + person.height + " " +
      "Mass: " + person.mass + " " +
      "Hair Color: " + person.hair_color + " " +
      "Eye Color: " + person.eye_color + " " +
      "Birth Year: " + person.birth_year + " ";
     parent.appendChild(p);
  }
     

}

