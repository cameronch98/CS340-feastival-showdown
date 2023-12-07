document.addEventListener("DOMContentLoaded", () => {
    let editDishForm = document.getElementById('edit-dish-form');
    console.log(editDishForm);

    // Modify the objects we need
    editDishForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateDishID = document.getElementById('dishId')
        let newDishName = document.getElementById("dishName");
        let newDishImage = document.getElementById("dishImage");
        let newDescription = document.getElementById("description");
        let newCourseId = document.getElementById("course");
        let newTeamId = document.getElementById("team");
        let newEventYearId = document.getElementById("year");

        // Get the values from the form fields
        let dishID = updateDishID.value;
        let dishNameValue = newDishName.value;
        let dishImageValue = newDishImage.value;
        let descriptionValue = newDescription.value;
        let courseIdValue = newCourseId.value;
        let teamIdValue = newTeamId.value;
        let eventYearIdValue = newEventYearId.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: dishID,
            dishName: dishNameValue,
            dishImage: dishImageValue,
            description: descriptionValue,
            courseId: courseIdValue,
            teamId: teamIdValue,
            eventYearId: eventYearIdValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/dishes/edit-dish/fetch", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newDishName.value = '';
                newDishImage.value = '';
                newDescription.value = '';
                newCourseId.value = '';
                newTeamId.value = '';
                newEventYearId.value = '';

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