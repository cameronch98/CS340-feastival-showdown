// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTicketForm = document.getElementById('edit-ticket-form-ajax');
    console.log(editTicketForm);

    // Modify the objects we need
    editTicketForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById('id')
        let newPrice = document.getElementById("price");
        let newTicketType = document.getElementById("ticket-type");
        let newYear = document.getElementById("year");

        // Get the values from the form fields
        let ticketID = updateID.value;
        let priceValue = newPrice.value;
        let ticketTypeValue = newTicketType.value;
        let yearValue = newYear.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: ticketID,
            price: priceValue,
            ticketType: ticketTypeValue,
            year: yearValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/edit-ticket-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                // newPrice.value = '';
                // newTicketType.value = '';
                // newYear.value = '';

                // Redirect to the tickets page
                window.location.href ='/tickets';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});