// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addTeamForm = document.getElementById('new-team-form-ajax');
    console.log(addTeamForm);

    // Modify the objects we need
    addTeamForm.addEventListener("submit", function (e) {
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
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-team-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newName.value = '';

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});