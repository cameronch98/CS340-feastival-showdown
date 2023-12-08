document.addEventListener("DOMContentLoaded", () => {
    let addDishForm = document.getElementById('new-dish-form');
    console.log(addDishForm);

    // Modify the objects we need
    addDishForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newDishName = document.getElementById("dishName");
        let newDishImage = document.getElementById("dishImage");
        let newDescription = document.getElementById("description");
        let newCourseId = document.getElementById("course");
        let newTeamId = document.getElementById("team");
        let newEventYearId = document.getElementById("year");

        // Get the values from the form fields
        let dishNameValue = newDishName.value;
        let dishImageValue = newDishImage.value;
        let descriptionValue = newDescription.value;
        let courseIdValue = newCourseId.value;
        let teamIdValue = newTeamId.value;
        let eventYearIdValue = newEventYearId.value;

        // Put our data we want to send in a javascript object
        let data = {
            dishName: dishNameValue,
            dishImage: dishImageValue,
            description: descriptionValue,
            courseId: courseIdValue,
            teamId: teamIdValue,
            eventYearId: eventYearIdValue
        }
        console.log("this is data:", data)
        
        // Fetch response from post request
        const response = await fetch('/dishes/new-dish/fetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful insertion
            alert("Dish added successfully!");
            window.location.href = '/dishes';
        } else {
            // Handle errors
            const error = await response.json();

            // Fetch team name, course, and event year
            const teamResponse = await fetch(`/teams/get-team?id=${data.teamId}`);
            const courseResponse = await fetch(`/courses/get-course?id=${data.courseId}`);
            const eventYearResponse = await fetch(`/event-years/get-event-year?id=${data.eventYearId}`);

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
            console.error("Error adding dish");
        }
    })
});