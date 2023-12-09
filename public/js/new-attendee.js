// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addAttendeeForm = document.getElementById('new-attendee-form');
    console.log(addAttendeeForm);

    // Modify the objects we need
    addAttendeeForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get data from form fields
        const data = getFormFields();

        try {
            // Fetch response from post request
            const response = await fetch('/attendees/new-attendee/fetch', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            // Check for http/sql errors
            if (!response.ok) {
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

                // Notify user of error with failure popup
                failurePopup();
            } else {
                // Notify user of success with success popup
                successPopup();
            }
        } catch(error) {
            // Append fetch network error to DOM tree
            let errorMsg = document.getElementById("error-msg");
            errorMsg.textContent = error;
            console.log(error);

            // Notify user of error with failure popup
            failurePopup();
        }
    })
});

/**
 * Gets html form fields and returns object containing all information
 * @returns JSON object with form fields
 */
function getFormFields() {

    // Get form fields we need to get data from
    let newName = document.getElementById("name");
    let newEmail = document.getElementById("email");
    let newPhone = document.getElementById("phone");

    // Get the values from the form fields
    let nameValue = newName.value;
    let emailValue = newEmail.value;
    let phoneValue = newPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue
    };

    // Log and return data
    console.log("this is data:", data)
    return data
};

function successPopup() {
    // Get correct popup and open it
    let popup = document.getElementById("success-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close and redirect on click
    let button = document.getElementById("success-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
        window.location.href = '/attendees';
    });
};

function failurePopup() {
    // Get correct popup and open it
    let popup = document.getElementById("failure-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close on click
    let button = document.getElementById("failure-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
    });
};


