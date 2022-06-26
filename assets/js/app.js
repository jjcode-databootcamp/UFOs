// load the data from data.js to use here (const=data[...])
const tableData = data;

//see the datain console
// console.log(data);

// get table references
let tbody = d3.select("tbody");


function buildTable(data){
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}


//clear input from form after "filter table" button has been hit 
// const clearInput = () => {
//   const dateInputVal = document.getElementById('datetime');
//   const cityInputVal = document.getElementById('city');
//   const stateInputVal = document.getElementById('state');
//   const countryInputVal = document.getElementById('country');
//   const shapeInputVal = document.getElementById('shape');

//   dateInputVal.value = '';
//   cityInputVal.value = '';
//   stateInputVal.value = '';
//   countryInputVal.value = '';
//   shapeInputVal.value = '';
// }



// 1. Create a variable to keep track of all the filters as anobject.
let filters = {}


// 3. Use this function to update the filters. 
function updateFilters() {

  // 4a. Save the element that was changed as a variable.
  let inputElement = d3.select(this);
  console.log(inputElement);

  // 4b. Save the value that was changed as a variable.
  let inputValue = inputElement.property('value')
  // console.log(inputValue);

  // 4c. Save the id of the filter that was changed as a variable.
  let inputID = inputElement.attr("id")
  // console.log(inputID);
  
  // 5. If a filter valsue was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  inputValue ? filters[inputID] = inputValue : filters = {} ;

  // 6. Call function to apply all filters and rebuild the table
  filterTable(filters);

}

// 7. Use this function to filtser the table when data is entered.
function filterTable(obj){

  // 8. Set the filtered data to the tableData.
  let filteredData = tableData;


  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(obj).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });


  // 10. Finally, rebuild the table using the filtered data
  buildTable(filteredData);

//clear form 
  // clearInput();

}

// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

// //reset
// const reset = () => {
//   clearInput()
// }


// Build the table when the page loads
buildTable(tableData);
