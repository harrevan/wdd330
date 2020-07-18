import { getCovidData } from "./data.js";

//const usaDeaths = document.getElementById("usCases");
//const usaCases = document.getElementById("usDeaths");
//const usaRecoveries = document.getElementById("usRecoveries");
//const usaHospitalized = document.getElementById("usHospitalized");

//const stateDeaths = document.getElementById("stateCases");
//const stateCases = document.getElementById("stateDeaths");
//const stateRecoveries = document.getElementById("stateRecoveries");
//const stateHospitalized = document.getElementById("stateHospitalized");
//const selectedState = document.getElementById("selectedState").value;
//const currentStatsLocation = document.querySelectorAll(".collapsed");
//const dailyStatsLocation = document.querySelectorAll(".card-body");
export default class CovidStats{
    constructor(type, time, state) {
        this.type = type;
        this.time = time;
        this.timePath = "";
        this.typePath = "";

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
        getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.type, this.time, response, label));
      }

      showAllData(){
        if(this.time === "current"){
            const currentStatLocation = document.querySelectorAll(".collapsed");
            //this.showDataDate(currentStatLocation[0].id);
            //console.log(currentStatLocation[0].id);
            this.separateStats(currentStatLocation[0].id, "Total positive tests: ");
            this.separateStats(currentStatLocation[1].id, "Total deaths: ");
            this.separateStats(currentStatLocation[2].id, "Total currently hospitalized: ");
            this.separateStats(currentStatLocation[3].id, "Total recovered: ");

        }
        else {
            const historicalStatLocation = document.querySelectorAll(".card-body");
            //console.log("stat2"+ historicalStatLocation[1].id);
            this.separateStats(historicalStatLocation[0].id);

            this.separateStats(historicalStatLocation[1].id);
            this.separateStats(historicalStatLocation[2].id);
            this.separateStats(historicalStatLocation[3].id);
        }
      }
}

//testing
//const stat = new CovidStats("usa", "current");
//const stat = new CovidStats("usa", "daily");
//stat.showAllData();
function displayStat(id, type, time, stat, label){
    if(time === "current"){
        displayCurrentStats(id, type, stat, label);
    }
    else{
        //console.log(stat);
        displayHistoricalStats(id, type, stat, label);
    }
}

function displayStateStats(){

}

function displayCurrentStats(elemId, type, stat, label){ 
    const id = document.getElementById(elemId);
    console.log(stat);
    const statId = id.id;
    console.log(statId);
    console.log(stat[0]);
    if(type === "usa"){
        id.innerHTML = label + formatNumber(stat[0][statId]);
    }
    if(type === "state"){
      id.innerHTML = label + formatNumber(stat[statId]);
    }

}

function formatNumber(number){
    if(number){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else{
      return "currently NA";
    }

}

function displayHistoricalStats(elemId, type, stat, label){
    console.log(stat);
    const chartElemId = document.getElementById(elemId);
    const statId = chartElemId.id;
    const newStatId = statId.replace("Chart", "");
    console.log("newStatId " + newStatId);

    console.log(stat);

    google.charts.load('current', {'packages':['annotationchart']});
    google.charts.setOnLoadCallback(function(){drawChart(newStatId, stat, chartElemId);});

}

// Draw the chart and set the chart values
function drawChart(stat, statArray, elemId) {
  console.log("stat: " + stat);
  console.log(elemId)
  var data = new google.visualization.DataTable();
  data.addColumn("date", "Date");
  data.addColumn("number", stat);
  console.log(statArray[0].date)
  //let dayCounter = 1;
  for (let i = 0; i < statArray.length; i++){
      data.addRows([[formatDate(statArray[i].date.toString()), statArray[i][stat]]]);
      //dayCounter ++;
  }
  //data.addcolumn("number", currentDataArray.)

  const startDate = formatDate(statArray[0].date.toString());
  const endDate = formatDate(statArray[statArray.length - 1].date.toString());
  var options = {
    //chartArea: { width: "20%", height: "50%" },
    displayLegendDots: false,
    //legend: {position: "none"},
    width: 380

  };
  
  //var chart2 = new google.charts.Line(document.elemId); 
  console.log(elemId);
  //var chart2 = new google.visualization.LineChart(document.getElementById("tester"));
  //chart2.draw(data, options);
  var chart = new google.visualization.AnnotationChart(elemId);
  chart.draw(data, options);
  
  

  //var chart3 = new google.visualization.LineChart(document.getElementById("testing"));
  //chart3.draw(data, options);

// Display the chart inside the <div> element with id="piechart"
//var chart = new google.visualization.PieChart(document.getElementById('positiveChart'));
//chart.draw(data, options);
}

//google.charts.setOnLoadCallback(drawChart);

// Redirect to National or State Data
const buttons = document.querySelectorAll(".custom");
buttons.forEach(button =>
    button.addEventListener("click", function(){
    location.href = button.id + ".html";
}));

function formatDate(dateString){
    console.log(dateString);
    const year = parseInt(dateString.substr(0,4));
    const month = parseInt(dateString.substr(4,2));
    const day = parseInt(dateString.substr(6,2));
    console.log(year + " " + month + " " + day)

    const date = new Date(year, month, day);
    return date;
}