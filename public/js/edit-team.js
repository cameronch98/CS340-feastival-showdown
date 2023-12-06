// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTeamForm = document.getElementById('edit-team-form-ajax');
    console.log("editTeamForm",editTeamForm);

    // Modify the objects we need
    editTeamForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

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
        console.log("this is data:", data)
        
        // Fetch response from put request
        const response = await fetch('/teams/edit-team-ajax', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful deletion
            alert("Team edited successfully!");
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
            console.error("Error editing team");
        }
    })
});