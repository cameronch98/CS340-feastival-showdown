// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addTeamForm = document.getElementById('new-team-form-ajax');
    console.log(addTeamForm);

    // Modify the objects we need
    addTeamForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newName = document.getElementById("name");

        // Get the values from the form fields
        let nameValue = newName.value;

        // Put our data we want to send in a javascript object
        let data = {
            name: nameValue
        }
        console.log("this is data:", data)
        
        // Fetch response from post request
        const response = await fetch('/teams/new-team-ajax', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful deletion
            alert("Team added successfully!");
            window.location.href = '/teams';
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`${data.name} is already registered as a team!`)
            };

            // Send generic error message
            console.error("Error adding team");
        }
    })
});