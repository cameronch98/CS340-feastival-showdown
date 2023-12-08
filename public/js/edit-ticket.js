// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTicketForm = document.getElementById('edit-ticket-form');
    console.log(editTicketForm);

    // Modify the objects we need
    editTicketForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById('id')
        let newPrice = document.getElementById("price");
        let newTicketTypeId = document.getElementById("ticket-type");
        let newEventYearId = document.getElementById("year");

        // Get the values from the form fields
        let ticketID = updateID.value;
        let priceValue = newPrice.value;
        let ticketTypeIdValue = newTicketTypeId.value;
        let eventYearIdValue = newEventYearId.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: ticketID,
            price: priceValue,
            ticketTypeId: ticketTypeIdValue,
            eventYearId: eventYearIdValue
        }
        console.log("this is data:", data)
        
        // Fetch response from put request
        const response = await fetch('/tickets/edit-ticket/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful edit
            alert("Ticket edited successfully!");
            window.location.href = '/tickets';
        } else {
            // Handle errors
            const error = await response.json();

            // Fetch ticket type and event year
            const ticketTypeResponse = await fetch(`/ticket-types/get-ticket-type?id=${data.ticketTypeId}`);
            const eventYearResponse = await fetch(`/event-years/get-event-year?id=${data.eventYearId}`);

            // Get JSON from response
            const ticketType = await ticketTypeResponse.json();
            const eventYear = await eventYearResponse.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`A ${ticketType.ticket_type.toLowerCase()} ticket is already on sale for ${eventYear.year}!`);
            };

            // Send generic error message
            console.error("Error editing ticket");
        }
    })
});