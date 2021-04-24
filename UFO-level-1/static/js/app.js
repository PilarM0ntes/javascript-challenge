// from data.js
var tableData = data;

// YOUR CODE HERE!
let tbody = d3.select("tbody");

// This function is triggered when the "Filter Table" button is clicked
function filterDate(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get the date filter value
    let newDate = d3.select("#datetime").property("value");
    console.log(`New value: ${newDate}`);
    // Define the Regex expression that the date should follow
    let dateRegex = new RegExp("\\b(1\/([1-9]|1[0-3])\/2010)\\b");
    // Verify if the value has a correct date format
    if (dateRegex.test(newDate)) {
        console.log("Correct Date format")
        let filterSightings = tableData.filter(sighting => sighting.datetime === newDate);
        //Erase the previous table
        tbody.selectAll("tr").remove();
        //Populate the table with filtered data
        filterSightings.forEach(tableHandler);
    } else {
        console.log(`${newDate} is not between 1/1/2010 and 1/13/2010`)
    }

}

// This funtion creates & modifies the table
function tableHandler(sighting){
    let row = tbody.append("tr");
    Object.entries(sighting).forEach(function ([key, value]) {
        let cell = row.append("td");
        cell.text(value);
    });
}

// Populates the table from data.js 
tableData.forEach(tableHandler);

// Event listener for the "Filter Table" button & click enter on form
d3.select("#filter-btn").on("click", filterDate);

d3.select("#datetime").on("keypress", function(){
    if (d3.event.keyCode === 13){
        filterDate();
    }
});