// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addTicketTypeForm = document.getElementById('new-ticket-type-form-ajax');
    console.log(addTicketTypeForm);

    // Modify the objects we need
    addTicketTypeForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newTicketType = document.getElementById("ticket-type");

        // Get the values from the form fields
        let ticketTypeValue = newTicketType.value;

        // Put our data we want to send in a javascript object
        let data = {
            ticketType: ticketTypeValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-ticket-type-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newTicketType.value = '';

                // Redirect to the ticket types page
                window.location.href ='/ticket-types';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});