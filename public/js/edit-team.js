// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editTeamForm = document.getElementById('edit-team-form-ajax');
    console.log("editTeamForm",editTeamForm);

    // Modify the objects we need
    editTeamForm.addEventListener("submit", function (e) {
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
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/teams/edit-team-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                window.location.href ='/teams';  
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});