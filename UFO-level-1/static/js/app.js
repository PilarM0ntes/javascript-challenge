// from data.js
var tableData = data;

// YOUR CODE HERE!
let tbody = d3.select("tbody");

// This function is triggered when the "Filter Table" button is clicked
function filterDate(){
    let newDate = d3.select("#datetime").property("value");
    console.log(`New value: ${newDate}`);

}

// Populates the table from data.js 
tableData.forEach(function(sighting){
    console.log(sighting.datetime);
    let row = tbody.append("tr");
    Object.entries(sighting).forEach(function ([key, value]) {
        let cell = row.append("td");
        cell.text(value);
    });

});


// Event listener for the "Filter Table" button
d3.select("#filter-btn").on("click", filterDate);
