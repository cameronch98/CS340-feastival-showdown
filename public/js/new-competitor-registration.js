// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addCompetitorRegForm = document.getElementById('new-competitor-registration-form');
    console.log(addCompetitorRegForm);

    // Modify the objects we need
    addCompetitorRegForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newCompetitorId = document.getElementById("competitor");
        let newTeamId = document.getElementById("team");
        let newEventYearId = document.getElementById("year");

        // Get the values from the form fields
        let competitorIdValue = newCompetitorId.value;
        let teamIdValue = newTeamId.value;
        let eventYearIdValue = newEventYearId.value;

        // Put our data we want to send in a javascript object
        let data = {
            competitorId: competitorIdValue,
            teamId: teamIdValue,
            eventYearId: eventYearIdValue
        }
        console.log("this is data:", data)
        
        // Fetch response from post request
        const response = await fetch('/competitor-registrations/new-competitor-registration/fetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful edit
            alert("Competitor registration added successfully!");
            window.location.href = '/competitor-registrations';
        } else {
            // Handle errors
            const error = await response.json();

            // Fetch competitor name and event year
            const competitorResponse = await fetch(`/competitors/get-competitor?id=${data.competitorId}`);
            const eventYearResponse = await fetch(`/event-years/get-event-year?id=${data.eventYearId}`);

            // Get JSON from response
            const competitor = await competitorResponse.json();
            const eventYear = await eventYearResponse.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`${competitor.competitor_name} is already registered to a team for ${eventYear.year}!`);
            };

            // Send generic error message
            console.error("Error adding competitor registration");
        }
    })
});