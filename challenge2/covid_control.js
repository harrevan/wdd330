import { getCovidData } from "./data.js";

// Class to represent key covid statistics
export default class CovidStats{
    constructor(type, time, state) {
        this.type = type;
        this.time = time;
        this.timePath = "";
        this.typePath = "";

        // Route to correct url according to type (national or state) and time (current, daily)
        if(this.type === "usa"){
            this.typePath = "api/v1/us/";
        }
        else{
            this.typePath = "api/v1/states/"  + state.toLowerCase() + "/";
        }

        if(this.time === "current"){
            this.timePath = "current.json";
        }
        else{
            this.timePath = "daily.json";
        }
      }

      separateStats(id, label){
            // id's from index.html match stat name from API. Used to determine which stat to display and where
            getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.type, this.time, response, label));
      }

      getStatDate(elemId){
            getCovidData(this.typePath + this.timePath).then(response => displayDate(elemId, this.type, response));
      }

      showAllData(){
        if(this.time === "current"){
            const currentStatLocation = document.querySelectorAll(".currentStats");
            const dateLocation = document.getElementById("date");
            this.getStatDate(dateLocation);
            this.separateStats(currentStatLocation[0].id, "Total positive tests: ");
            this.separateStats(currentStatLocation[1].id, "Total deaths: ");
            this.separateStats(currentStatLocation[2].id, "Total currently hospitalized: ");
            this.separateStats(currentStatLocation[3].id, "Total recovered: ");
            this.separateStats(currentStatLocation[4].id, "Positive test increase from previous day: ");
            this.separateStats(currentStatLocation[5].id, "Death increase from previous day: ");
            this.separateStats(currentStatLocation[6].id, "Hospitalized increase from previous day: ");

        }
        else {
            const historicalStatLocation = document.querySelectorAll(".dailyStats");
            this.separateStats(historicalStatLocation[0].id);
            this.separateStats(historicalStatLocation[1].id);
            this.separateStats(historicalStatLocation[2].id);
            this.separateStats(historicalStatLocation[3].id);
            this.separateStats(historicalStatLocation[3].id);
            this.separateStats(historicalStatLocation[3].id);
            this.separateStats(historicalStatLocation[3].id);
            this.separateStats(historicalStatLocation[4].id);
            this.separateStats(historicalStatLocation[5].id);
            this.separateStats(historicalStatLocation[6].id);
        }
      }
}

// Display date that data was last retrieved
function displayDate(elemId, type, stats){
    if(type === "usa"){
        console.log(stats[0].date)
        elemId.innerHTML = "USA data as of " + formatDate(stats[0].date.toString()).toDateString();
    }
    else if(type === "state"){
        elemId.innerHTML = stats.state + " Data as of " + formatDate(stats.date.toString()).toDateString();
    }
}

// Determine which stat type to display: current or historical
function displayStat(id, type, time, stat, label){
    if(time === "current"){
        displayCurrentStats(id, type, stat, label);
    }
    else{
        displayHistoricalStats(id, stat);
    }
}

// Display current stats
function displayCurrentStats(elemId, type, stat, label){ 
    const id = document.getElementById(elemId);
    const statId = id.id;
    if(type === "usa"){
        id.innerHTML = label + formatNumber(stat[0][statId]);
    }
    if(type === "state"){
      id.innerHTML = label + formatNumber(stat[statId]);
    }
}

// Format displayed statistic in a more readable format
function formatNumber(number){
    if(number > 0){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else if(number === 0){
        return number;
    }
    else{
      return "currently NA";
    }

}

// Display historical stats in form of chart
function displayHistoricalStats(elemId, stat){
    const chartElemId = document.getElementById(elemId);
    const statId = chartElemId.id;
    const newStatId = statId.replace("Chart", "");

    //Use google charts as chart source
    google.charts.load('current', {'packages':['annotationchart']});
    google.charts.setOnLoadCallback(function(){drawChart(newStatId, stat, chartElemId);});
}

// Draw google chart and set the chart values
function drawChart(stat, statArray, elemId) {
  var data = new google.visualization.DataTable();
  data.addColumn("date", "Date");
  data.addColumn("number", stat);
  for (let i = 0; i < statArray.length; i++){
      data.addRows([[formatDate(statArray[i].date.toString()), statArray[i][stat]]]);
  }

  const startDate = formatDate(statArray[0].date.toString());
  const endDate = formatDate(statArray[statArray.length - 1].date.toString());
  var options = {
    width: 460
  };

  var chart = new google.visualization.AnnotationChart(elemId);
  chart.draw(data, options);
}

// Format date string from API as a usable date
function formatDate(dateString){
    const year = parseInt(dateString.substr(0,4));
    const month = parseInt(dateString.substr(4,2));
    const day = parseInt(dateString.substr(6,2));
    const date = new Date(year, month - 1, day);
    return date;
}