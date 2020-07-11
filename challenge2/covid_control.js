import { getCovidData } from "./data.js";

// Redirect to National or State Data
const buttons = document.querySelectorAll(".custom");
buttons.forEach(button =>
    button.addEventListener("click", function(){
    location.href = button.id + ".html";
}));
console.log("hello");

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
            this.typePath = "api/v1/states/"
        }

        if(this.time === "current"){
            this.timePath = "current.json"
        }
        else{
            this.timePath = "daily.json"
        }
      }
      getDataDate(){
        getCovidData(this.typePath + this.timePath).then(response => console.log("date " + response[0].dateChecked));
      }

      getDeathCount(){
         getCovidData(this.typePath + this.timePath).then(response => console.log("dead" + response[0].death));
      }

      getRecoveries(){
        getCovidData(this.typePath + this.timePath).then(response => console.log("recovered" + response[0].recovered));
      }
      
      getHospitalized(){
        getCovidData(this.typePath + this.timePath).then(response => console.log("hospitalized" + response[0].hospitalizedCurrently));
      }

      getPositiveTests(){
        getCovidData(this.typePath + this.timePath).then(response => console.log("+ tests" + response[0].positive));
      }

}

//testing
const stat = new CovidStats("usa", "daily");
stat.getDataDate();
stat.getDeathCount();
stat.getHospitalized();
stat.getRecoveries();
stat.getPositiveTests();

//console.log(stat.getPositiveTests() + " " + stat.getDeathCount() + " " + stat.getHospitalized);
   
