const baseURL = "https://covidtracking.com/";

export function getCovidData(path){
    return fetch(baseURL + path)
    .then(response =>response.json());
}