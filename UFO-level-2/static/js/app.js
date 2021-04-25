// from data.js
var tableData = data;

// Variables
let tbody = d3.select("tbody");
let uniqueOptions = {};

// This function is triggered when the "Filter Table" button is clicked
function filterTable(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Get the filter values
    let newDate = d3.select("#datetime").property("value");
    let filterCity = d3.select("#city").property("value");
    let filterState = d3.select("#state").property("value");
    let filterCountry = d3.select("#country").property("value");
    let filterShape = d3.select("#shape").property("value");
    
    let filterSightings = data;

    //verifies the input values for date:
    if (newDate){
        let dateRegex = new RegExp("\\b(1\/([1-9]|1[0-3])\/2010)\\b");
        // Verify if the value has a correct date format
        if (dateRegex.test(newDate)) {
            console.log("Correct Date format");
            filterSightings = filterSightings.filter(sighting => sighting.datetime === newDate);
        } else {
            console.log(`${newDate} not a valid date: 1/1/2010 and 1/13/2010`);
        }
    }
    
    //verifies the input values for city:
    if (filterCity){
        if (uniqueOptions["city"].includes(filterCity.toLowerCase())){
            console.log("The city is included in our options");
            filterSightings = filterSightings.filter(sighting => sighting.city === filterCity.toLowerCase());
        } else{
            console.log("This city is not included in our database");
        }
    }

    //verifies the input values for state:
    if (filterState){
        if (uniqueOptions["state"].includes(filterState.toLowerCase())){
            console.log("The state is included in our options");
            filterSightings = filterSightings.filter(sighting => sighting.state === filterState.toLowerCase());
        } else{
            console.log("This state is not included in our database");
        }
    }

    if (filterCountry){
        if (uniqueOptions["country"].includes(filterCountry.toLowerCase())){
            console.log("The country is included in our options");
            filterSightings = filterSightings.filter(sighting => sighting.country === filterCountry.toLowerCase());
        } else{
            console.log("This country is not included in our database");
        }
    }

    if (filterShape){
        if (uniqueOptions["shape"].includes(filterShape.toLowerCase())){
            console.log("The shape is included in our options");
            filterSightings = filterSightings.filter(sighting => sighting.shape === filterShape.toLowerCase());
        } else{
            console.log("This shape is not included in our database");
        }
    }


    //Erase previous data
    tbody.selectAll("tr").remove();
    //Populate the table with filtered data
    if (filterSightings.length === 0){
        console.log("No records found with these characteristics");
    } else{
        console.log(`${filterSightings.length} records found!`);
        filterSightings.forEach(tableHandler);
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

// This function gathers all the unique options from every category
function getUniqueOptions(sighting){

    Object.entries(sighting).forEach(function ([key, value]) {
        if (!uniqueOptions[key]){
            uniqueOptions[key] = [];
            uniqueOptions[key].push(value);
        } else if (!uniqueOptions[key].includes(value)){
            uniqueOptions[key].push(value);
        }
    });

}

// Populates the table from data.js 
tableData.forEach(tableHandler);
// Gets the unique option for each category: city, state, country and shape
tableData.forEach(getUniqueOptions);


// Event listener for the "Filter Table" button
d3.select("#filter-btn").on("click", filterTable);

