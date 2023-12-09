// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editAttendeeForm = document.getElementById('edit-attendee-form');
    console.log(editAttendeeForm);

    // Modify the objects we need
    editAttendeeForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let attendeeId = document.getElementById('id')
        let newName = document.getElementById("name");
        let newEmail = document.getElementById("email");
        let newPhone = document.getElementById("phone");

        // Get the values from the form fields
        let updatedId = attendeeId.value;
        let nameValue = newName.value;
        let emailValue = newEmail.value;
        let phoneValue = newPhone.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: updatedId,
            name: nameValue,
            email: emailValue,
            phone: phoneValue
        };
        console.log("this is data:", data);
        
        // Fetch response from put request
        const response = await fetch('/attendees/edit-attendee/fetch', {
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
                window.location.href = '/attendees';
            });
        } else {
            // Handle errors
            const error = await response.json();

            // Init regex object
            let regex = {
                'email': /Duplicate entry .* for key 'attendee_email'/,
                'phone': /Duplicate entry .* for key 'attendee_phone'/
            }

            // Handle specific errors
            let errorMsg = document.getElementById("error-msg");
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                if (regex.email.test(error.sqlMessage)) {
                    errorMsg.textContent = `The email ${data.email} has already been used to register!`;
                } else if (regex.phone.test(error.sqlMessage)) {
                    errorMsg.textContent = `The phone number ${data.phone} has already been used to register!`;
                }
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
            console.error("Error editing attendee");
        }
    })
});

function openPopup(popup) {
    popup.classList.add("open-popup");
};

function closePopup(popup) {
    popup.classList.remove("open-popup");
};