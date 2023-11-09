// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editCompetitorRegForm = document.getElementById('edit-competitor-registration-form-ajax');
    console.log(editCompetitorRegForm);

    // Modify the objects we need
    editCompetitorRegForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById('id');
        let newCompetitor = document.getElementById("competitor");
        let newTeam = document.getElementById("team");
        let newYear = document.getElementById("year");

        // Get the values from the form fields
        let competitorValue = newCompetitor.value;
        let teamValue = newTeam.value;
        let yearValue = newYear.value;

        // Put our data we want to send in a javascript object
        let data = {
            competitor: competitorValue,
            team: teamValue,
            year: yearValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/edit-competitor-registration-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                // newCompetitor.value = '';
                // newTeam.value = '';
                // newYear.value = '';

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