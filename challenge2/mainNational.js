import CovidStats from "./covid_control.js";

window.addEventListener("load", function(){
    const nationalStatsCurrent = new CovidStats("usa", "current");
    nationalStatsCurrent.showAllData();

    const nationalStatsHistoric = new CovidStats("usa", "daily");
    nationalStatsHistoric.showAllData();
});

