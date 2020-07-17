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
class CovidStats{
    constructor(type, time) {
        this.type = type;
        this.time = time;
        this.timePath = "";
        this.typePath = "";

        if(this.type === "usa"){
            this.typePath = "api/v1/us/";
        }
        else{
            this.typePath = "api/v1/states/"  + selectedState;
        }

        if(this.time === "current"){
            this.timePath = "current.json";
        }
        else{
            this.timePath = "daily.json";
        }
      }

      separateStats(id, label){
        getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.time, response, label));
      }
/*       showDataDate(id, label){
          getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.time, response, label));
      }

      showPositiveTests(id, label){
        //console.log(this.typePath, this.timePath);
          getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.time, response, label));
     }

      showDeathCount(id, label){
          getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.time, response, label));
      }

      showRecoveries(id, label){
         getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.time, response, label));
      }
      
      showHospitalized(id, label){
         getCovidData(this.typePath + this.timePath).then(response => displayStat(id, this.time, response, label));
      } */

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
            const historicalStatLocation = document.querySelectorAll(".charts");
            this.separateStats(historicalStatLocation[0].id);
        }
      }
}

//testing
//const stat = new CovidStats("usa", "current");
const stat = new CovidStats("usa", "daily");
stat.showAllData();
function displayStat(id, time, stat, label){
    if(time === "current"){
        displayCurrentStats(id, stat, label);
    }
    else{
        //console.log(stat);
        displayHistoricalStats(id, stat, label);
    }
}

function displayStateStats(){

}

function displayCurrentStats(elemId, stat, label){ 
    const id = document.getElementById(elemId);
    const statId = id.id;
    id.innerHTML = label + formatNumber(stat[0][statId]);
}

function formatNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayHistoricalStats(elemId, stat, label){
    const chartElemId = document.getElementById(elemId);
    const statId = chartElemId.id;
    const newStatId = statId.replace("Chart", "");
    console.log("newStatId " + newStatId);

    console.log(stat);

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function(){drawChart(newStatId, stat, chartElemId);});

}




// Draw the chart and set the chart values
function drawChart(stat, statArray, elemId) {
  console.log("stat: " + stat);
  console.log(elemId)
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Date");
  data.addColumn("number", stat);
  console.log(statArray[0].date)
  let dayCounter = 1;
  for (let i = statArray.length-1; i > 1; i--){
      data.addRows([[dayCounter.toString(), statArray[i][stat]]]);
      dayCounter ++;
  }
  //data.addcolumn("number", currentDataArray.)


  var options = {
    title: "Total Count Per Day",
    //chartArea: {  width: "100%", height: "100%" },
    legend: {position: "none"},
    width: 450,
    height: 500,
    hAxis: {
      title: "Day Count"
    },
    vAxis: {
      title: "Count",
      scaleType: "log",
      ticks: [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000]
    }
  };
  
  //var chart2 = new google.charts.Line(document.elemId); 
  console.log("elemid" + elemId)
  var chart2 = new google.visualization.LineChart(document.getElementById("tester"));
  var chart = new google.visualization.LineChart(elemId);

  chart.draw(data, options);
  
  
  chart2.draw(data, options);

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