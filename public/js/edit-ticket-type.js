// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTicketTypeForm = document.getElementById('edit-ticket-type-form');
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
            // Handle successful edit with success popup
            let popup = document.getElementById("success-popup");
            openPopup(popup);

            // Trigger modal close and redirect on OK click
            let button = document.getElementById("success-button");
            button.addEventListener('click', () => {
                closePopup(popup);
                window.location.href = '/ticket-types';
            });
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            let errorMsg = document.getElementById("error-msg");
            if (error.sqlError == 1062) {
                errorMsg.textContent = `${data.ticketType} tickets are already available!`;
            };

            // Open failure popup with correct error message
            let popup = document.getElementById("failure-popup");
            openPopup(popup);

            // Trigger modal close on OK click
            let button = document.getElementById("failure-button");
            button.addEventListener('click', () => {
                closePopup(popup);
            });

            // Send generic error message
            console.error("Error editing ticket type");
        }
    })
});

function openPopup(popup) {
    popup.classList.add("open-popup");
};

function closePopup(popup) {
    popup.classList.remove("open-popup");
};