// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTicketTypeForm = document.getElementById('edit-ticket-type-form-ajax');
    console.log(editTicketTypeForm);

    // Modify the objects we need
    editTicketTypeForm.addEventListener("submit", async function (e) {
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
        
        // Fetch response from put request
        const response = await fetch('/ticket-types/edit-ticket-type/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful deletion
            alert("Ticket type edited successfully!");
            window.location.href = '/ticket-types';
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`${data.ticketType} tickets are already available!`);
            };

            // Send generic error message
            console.error("Error editing ticket type");
        }
    })
});