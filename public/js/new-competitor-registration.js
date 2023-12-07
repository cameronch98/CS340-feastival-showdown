// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addCompetitorRegForm = document.getElementById('new-competitor-registration-form-ajax');
    console.log(addCompetitorRegForm);

    // Modify the objects we need
    addCompetitorRegForm.addEventListener("submit", function (e) {
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
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/competitor-registrations/new-competitor-registration/fetch", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newCompetitorId.value = '';
                newTeamId.value = '';
                newEventYearId.value = '';

                // Redirect to the competitor-registration page
                window.location.href ='/competitor-registrations';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});