// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addTicketSale = document.getElementById('new-ticket-sale-form');
    console.log(addTicketSale);

    // Modify the objects we need
    addTicketSale.addEventListener("submit", async function (e) {
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
        
        // Fetch response from post request
        const response = await fetch('/ticket-sales/new-ticket-sale/fetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful insertion
            alert("Ticket sale added successfully!");
            window.location.href = '/ticket-sales';
        } else {
            // Send generic error message
            console.error("Error adding ticket sale");
        }
    })
});