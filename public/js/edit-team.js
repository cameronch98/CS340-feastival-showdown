// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTeamForm = document.getElementById('edit-team-form');
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
        const response = await fetch('/teams/edit-team/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful edit with success popup
            let popup = document.getElementById("success-popup");
            openPopup(popup);

            // Trigger modal close and redirect on OK click
            let button = document.getElementById("success-button");
            button.addEventListener('click', () => {
                closePopup(popup);
                window.location.href = '/teams';
            });
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            let errorMsg = document.getElementById("error-msg");
            if (error.sqlError == 1062) {
                errorMsg.textContent = `${data.name} is already registered as a team!`
            };

            // Open failure popup with correct error message
            let popup = document.getElementById("failure-popup");
            openPopup(popup);

            // Trigger modal close on OK click
            let button = document.getElementById("failure-button");
            button.addEventListener('click', () => {
                closePopup(popup);
            });

            // Send generic error message
            console.error("Error editing team");
        }
    })
});

function openPopup(popup) {
    popup.classList.add("open-popup");
};

function closePopup(popup) {
    popup.classList.remove("open-popup");
};