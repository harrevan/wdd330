fetch("https://covidtracking.com/api/v1/us/current.json")
.then(response =>response.json())
.then(data => console.log(data));