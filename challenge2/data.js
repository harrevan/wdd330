
// base URL for the covidtracking API
const baseURL = "https://covidtracking.com/";

// Fetch data from API, return promise for further use.
export function getCovidData(path){
    return fetch(baseURL + path)
    .then(response =>response.json());
}