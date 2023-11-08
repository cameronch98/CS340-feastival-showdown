document.addEventListener("DOMContentLoaded", () => {
    let editDishForm = document.getElementById('edit-dish-form-ajax');
    console.log(editDishForm);

    // Modify the objects we need
    editDishForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateDishID = document.getElementById('id')
        let newDishName = document.getElementById("dishName");
        let newDishImage = document.getElementById("dishImage");
        let newDescription = document.getElementById("description");
        let newCourse = document.getElementById("course");
        let newTeam = document.getElementById("team");
        let newYear = document.getElementById("year");

        // Get the values from the form fields
        let dishNameValue = newDishName.value;
        let dishImageValue = newDishImage.value;
        let descriptionValue = newDescription.value;
        let courseValue = newCourse.value;
        let teamValue = newTeam.value;
        let yearValue = newYear.value;

        // Put our data we want to send in a javascript object
        let data = {
            dishName: dishNameValue,
            dishImage: dishImageValue,
            description: descriptionValue,
            course: courseValue,
            team: teamValue,
            year: yearValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-dish-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newDishName.value = '';
                newDishImage.value = '';
                newDescription.value = '';
                newCourse.value = '';
                newTeam.value = '';
                newYear.value = '';

                // Redirect to the dishes page
                window.location.href ='/dishes';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});