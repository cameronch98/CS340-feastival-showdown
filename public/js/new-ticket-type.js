// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addTicketTypeForm = document.getElementById('new-ticket-type-form');
    console.log(addTicketTypeForm);

    // Modify the objects we need
    addTicketTypeForm.addEventListener("submit", async function (e) {
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
        
        // Fetch response from post request
        const response = await fetch('/ticket-types/new-ticket-type/fetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful insertion
            alert("Ticket type added successfully!");
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
            console.error("Error adding ticket type");
        }
    })
});