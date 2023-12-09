// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addCompetitorRegForm = document.getElementById('new-competitor-registration-form');
    console.log(addCompetitorRegForm);

    // Modify the objects we need
    addCompetitorRegForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get data from form fields
        const data = getFormFields();

        try {
            // Fetch response from post request
            const response = await fetch('/competitor-registrations/new-competitor-registration/fetch', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            // Check for http/sql errors
            if (!response.ok) {
                // Handle errors
                const error = await response.json();

                // Fetch competitor name and event year
                const competitorResponse = await fetch(`/competitors/get-competitor?id=${data.competitorId}`);
                const eventYearResponse = await fetch(`/event-years/get-event-year?id=${data.eventYearId}`);

                // Get JSON from response
                const competitor = await competitorResponse.json();
                const eventYear = await eventYearResponse.json();

                // Handle specific errors
                let errorMsg = document.getElementById("error-msg");
                if (error.sqlError == 1062) {
                    errorMsg.textContent = `${competitor.competitor_name} is already registered to a team for ${eventYear.year}!`;
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
    let newCompetitorId = document.getElementById("competitor");
    let newTeamId = document.getElementById("team");
    let newEventYearId = document.getElementById("year");

    // Get id values from the info arrays
    let competitorIdValue = newCompetitorId.value;
    let teamIdValue = newTeamId.value;
    let eventYearIdValue = newEventYearId.value;

    // Put our data we want to send in a javascript object
    let data = {
        competitorId: competitorIdValue,
        teamId: teamIdValue,
        eventYearId: eventYearIdValue
    }

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
        window.location.href = '/competitor-registrations';
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