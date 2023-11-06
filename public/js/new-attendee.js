// Get the objects we need to modify
let addAttendeeForm = document.getElementById('new-attendee-form-ajax');


// Modify the objects we need
addAttendeeForm.addEventListener("submit", function (e) {
    console.log("submit was pressed")
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let newName = document.getElementById("name");
    let newEmail = document.getElementById("email");
    let newPhone = document.getElementById("phone");

    // Get the values from the form fields
    let nameValue = newName.value;
    let emaiValue = newEmail.value;
    let phoneValue = newPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emaiValue,
        phone: phoneValue
    }
    console.log("this is data:", data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-attendee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            newName.value = '';
            newEmail.value = '';
            newPhone.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
// Function to add a single row to the table
addRowToTable = (data) => {
    // Parse the response data (the new attendee)
    console.log("receieved: ", data)
    let newRow = JSON.parse(data).newAttendee;

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("attendee-table");

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");

    // Fill the cells with correct data
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;

    // Add the cells to the row 
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
