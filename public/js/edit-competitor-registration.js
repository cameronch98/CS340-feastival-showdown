// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editCompetitorRegForm = document.getElementById('edit-competitor-registration-form-ajax');
    console.log(editCompetitorRegForm);

    // Modify the objects we need
    editCompetitorRegForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById('id');
        let competitorInfo = document.getElementById("competitor");
        let teamInfo = document.getElementById("team");
        let eventYearInfo = document.getElementById("year");

        // Get info arrays with names/year and ids
        let competitorInfoArr = competitorInfo.value.split("|");
        let teamInfoArr = teamInfo.value.split("|");
        let eventYearInfoArr = eventYearInfo.value.split("|");

        // Get id values from the info arrays
        let regID = updateID.value;
        let competitorIdValue = competitorInfoArr[0];
        let teamIdValue = teamInfoArr[0];
        let eventYearIdValue = eventYearInfoArr[0];

        // Get names/years from the info arrays
        let competitorName = competitorInfoArr[1];
        let teamName = teamInfoArr[1];
        let eventYear = eventYearInfoArr[1];

        // Put our data we want to send in a javascript object
        let data = {
            id: regID,
            competitorId: competitorIdValue,
            teamId: teamIdValue,
            eventYearId: eventYearIdValue
        }
        console.log("this is data:", data)

        // Fetch response from put request
        const response = await fetch('/competitor-registrations/edit-competitor-registration/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful edit
            alert("Competitor registration edited successfully!");
            window.location.href = '/competitor-registrations';
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`${competitorName} is already registered to ${teamName} for ${eventYear}!`);
            };

            // Send generic error message
            console.error("Error editing course");
        }
    })
});