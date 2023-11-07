// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editEventYearForm = document.getElementById('edit-event-year-form-ajax');
    console.log(editEventYearForm);

    // Modify the objects we need
    editEventYearForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let eventYearId = document.getElementById('yearId')
        let newYear = document.getElementById("year");

        // Get the values from the form fields
        let updatedId = eventYearId.value
        let yearValue = newYear.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: updatedId,
            year: yearValue,
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/edit-event-year-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                window.location.href ='/event-years';  
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});