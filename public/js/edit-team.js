// Citation for starter app code
// Date: 12/01/2023
// Adapted from the CS340 starter app tutorials
// This code has been modified heavily at this point. We are using
// fetches now and lots of additional error handling logic. The main
// similarities are getting the form elements and using an event handler
// for form submission.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Citation for the following function: successPopup, failurePopup
// Date: 12/08/2023
// Adapted from youtube video
// Learned the main logic of appending the class and removing it
// to apply different styles and make the popup appear/disappear.
// My popups are for success and failure though. More citations
// and details on the CSS borrowed in the styles sheet and html.
// Source URL: https://www.youtube.com/watch?v=AF6vGYIyV8M

// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTeamForm = document.getElementById('edit-team-form');
    console.log("editTeamForm",editTeamForm);

    // Modify the objects we need
    editTeamForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get data from form fields
        const data = getFormFields();

        try {
            // Fetch response from put request
            const response = await fetch('/teams/edit-team/fetch', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            // Check for http/sql errors
            if (!response.ok) {
                // Handle errors
                const error = await response.json();

                // Handle specific errors
                let errorMsg = document.getElementById("error-msg");
                if (error.sqlError == 1062) {
                    errorMsg.textContent = `${data.name} is already registered as a team!`
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
    let teamId = document.getElementById('id')
    let newName = document.getElementById('name');

    // Get the values from the form fields
    let updatedId = teamId.value
    let nameValue = newName.value;

    // Put our data we want to send in a javascript object
    let data = {
        id: updatedId,
        name: nameValue,
    }

    // Log and return data
    console.log("this is data:", data)
    return data
};

// show and hide overlay for popups
function showOverlay() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
}

function hideOverlay() {
    let overlay = document.getElementById("overlay");
    overlay.style.display = 'none';
}

function successPopup() {
    showOverlay();
    // Get correct popup and open it
    let popup = document.getElementById("success-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close and redirect on click
    let button = document.getElementById("success-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
        hideOverlay();
        window.location.href = '/teams';
    });
};

function failurePopup() {
    showOverlay();
    // Get correct popup and open it
    let popup = document.getElementById("failure-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close on click
    let button = document.getElementById("failure-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
        hideOverlay();
    });
};