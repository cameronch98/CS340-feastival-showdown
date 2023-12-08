// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTicketSale = document.getElementById('edit-ticket-sale-form');
    console.log(editTicketSale);

    // Modify the objects we need
    editTicketSale.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById("id")
        let newAttendeeId = document.getElementById("attendee");
        let newTicketId = document.getElementById("ticket");
        let newDiscountId = document.getElementById("discount");

        // Get the values from the form fields
        let ticketID = updateID.value;
        let attendeeIdValue = newAttendeeId.value;
        let ticketIdValue = newTicketId.value;
        let discountIdValue = newDiscountId.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: ticketID,
            attendeeId: attendeeIdValue,
            ticketId: ticketIdValue,
            discountId: discountIdValue
        }
        
        console.log("this is data:", data)
        
        // Fetch response from put request
        const response = await fetch('/ticket-sales/edit-ticket-sale/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful edit
            alert("Ticket sale edited successfully!");
            window.location.href = '/ticket-sales';
        } else {
            // Send generic error message
            console.error("Error editing ticket sale");
        }
    })
});