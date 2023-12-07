// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addTicketSale = document.getElementById('new-ticket-sale-form-ajax');
    console.log(addTicketSale);

    // Modify the objects we need
    addTicketSale.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newAttendeeId = document.getElementById("attendee");
        let newTicketId = document.getElementById("ticket");
        let newDiscountId = document.getElementById("discount");

        // Get the values from the form fields
        let attendeeIdValue = newAttendeeId.value;
        let ticketIdValue = newTicketId.value;
        let discountIdValue = newDiscountId.value;

        // Put our data we want to send in a javascript object
        let data = {
            attendeeId: attendeeIdValue,
            ticketId: ticketIdValue,
            discountId: discountIdValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/ticket-sales/new-ticket-sale/fetch", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newAttendeeId.value = '';
                newTicketId.value = '';
                newDiscountId.value = '';

                // Redirect to the ticket sales page
                window.location.href ='/ticket-sales';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});