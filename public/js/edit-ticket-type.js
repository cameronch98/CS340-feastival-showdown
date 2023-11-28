// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTicketTypeForm = document.getElementById('edit-ticket-type-form-ajax');
    console.log(editTicketTypeForm);

    // Modify the objects we need
    editTicketTypeForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById('id')
        let ticketType = document.getElementById('ticket-type')

        // Get the values from the form fields
        let ticketTypeID = updateID.value
        let ticketTypeValue = ticketType.value
        
        // Put our data we want to send in a javascript object
        let data = {
            id: ticketTypeID,
            ticketType: ticketTypeValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/ticket-types/edit-ticket-type-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

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