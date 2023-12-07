// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editCompetitorRegForm = document.getElementById('edit-competitor-registration-form');
    console.log(editCompetitorRegForm);

    // Modify the objects we need
    editCompetitorRegForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById('id');
        let newCompetitorId = document.getElementById("competitor");
        let newTeamId = document.getElementById("team");
        let newEventYearId = document.getElementById("year");

        // Get id values from the info arrays
        let regID = updateID.value;
        let competitorIdValue = newCompetitorId.value;
        let teamIdValue = newTeamId.value;
        let eventYearIdValue = newEventYearId.value;

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
                alert(`This competitor is already registered to a team for the given year!`);
            };

            // Send generic error message
            console.error("Error editing course");
        }
    })
});