import CovidStats from "./covid_control.js";

const state = document.getElementById("selectedState");
state.addEventListener("change", function(){
    const stateStatsCurrent = new CovidStats("state", "current", state.value);
    stateStatsCurrent.showAllData();

    const stateStatsHistoric = new CovidStats("state", "daily", state.value);
    stateStatsHistoric.showAllData();
})


