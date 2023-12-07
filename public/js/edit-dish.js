document.addEventListener("DOMContentLoaded", () => {
    let editDishForm = document.getElementById('edit-dish-form');
    console.log(editDishForm);

    // Modify the objects we need
    editDishForm.addEventListener("submit", async function (e) {
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
        
        // Fetch response from put request
        const response = await fetch('/dishes/edit-dish/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful edit
            alert("Dish edited successfully!");
            window.location.href = '/dishes';
        } else {
            // Handle errors
            const error = await response.json();

            // Fetch team name, course, and event year
            const teamResponse = await fetch(`/teams/get-team?id=${data.teamId}`);
            const courseResponse = await fetch(`/courses/get-course?id=${data.courseId}`);
            const eventYearResponse = await fetch(`/event-years/get-event-year?=${data.eventYearId}`);

            // Get JSON from response
            const team = await teamResponse.json();
            const course = await courseResponse.json();
            const eventYear = await eventYearResponse.json();

            // Init regex object
            let regex = {
                'dishName': /Duplicate entry .* for key 'dish_name'/,
                'teamCourseYear': /Duplicate entry .* for key 'team_course_year'/
            }

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                if (regex.teamCourseYear.test(error.sqlMessage)) {
                    alert(`${team.team_name} already have a ${course.course_name.toLowerCase()} dish for ${eventYear.year}!`);
                } else if (regex.dishName.test(error.sqlMessage)) {
                    alert(`${data.dishName} has already been made at feastival showdown!`);
                }
            };

            // Send generic error message
            console.error("Error editing dish");
        }
    })
});