import CovidStats from "./covid_control.js";

// Display National or State data
const buttons = document.querySelectorAll(".custom");
buttons.forEach(button =>
    button.addEventListener("click", function(){
        if(button.value === "state"){
            // show state select option
            document.getElementById("stateSelectInput").style.visibility = "visible";
            const state = document.getElementById("selectedState");
            
            // display stats on change
            state.addEventListener("change", function(){
            const stateStatsCurrent = new CovidStats(button.value, "current", state.value);
            stateStatsCurrent.showAllData();
            const stateStatsHistoric = new CovidStats(button.value, "daily", state.value);
            stateStatsHistoric.showAllData();
            });
        }
        else {
            document.getElementById("stateSelectInput").style.visibility = "hidden";
            const statsCurrent = new CovidStats(button.value, "current");
            statsCurrent.showAllData();
            const statsHistoric = new CovidStats(button.value, "daily");
            statsHistoric.showAllData();
        }
}));

