// Citation for starter app code
// Date: 12/01/2023
// Adapted from the CS340 starter app tutorials
// This code has been modified heavily at this point. We are using
// fetches now and lots of additional error handling logic. The main
// similarities are getting the form elements and using an event handler
// for form submission.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Citation for the following function: successPopup, failurePopup
// Date: 12/08/2023
// Adapted from youtube video
// Learned the main logic of appending the class and removing it
// to apply different styles and make the popup appear/disappear.
// My popups are for success and failure though. More citations
// and details on the CSS borrowed in the styles sheet and html.
// Source URL: https://www.youtube.com/watch?v=AF6vGYIyV8M

document.addEventListener("DOMContentLoaded", () => {
    let editDishForm = document.getElementById('edit-dish-form');
    console.log(editDishForm);

    // Modify the objects we need
    editDishForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")

        // Prevent the form from submitting
        e.preventDefault();

        // Get data from form fields
        const data = getFormFields();

        try {
            // Fetch response from put request
            const response = await fetch('/dishes/edit-dish/fetch', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            // Check for http/sql errors
            if (!response.ok) {
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
                let errorMsg = document.getElementById("error-msg");
                if (error.sqlError == 1062) {
                    if (regex.teamCourseYear.test(error.sqlMessage)) {
                        errorMsg.textContent = `${team.team_name} already have a ${course.course_name.toLowerCase()} dish for ${eventYear.year}!`;
                    } else if (regex.dishName.test(error.sqlMessage)) {
                        errorMsg.textContent = `${data.dishName} has already been made at feastival showdown!`;
                    }
                };

                // Notify user of error with failure popup
                failurePopup();
            } else {
                // Notify user of success with success popup
                successPopup();
            }
        } catch(error) {
            // Append fetch network error to DOM tree
            let errorMsg = document.getElementById("error-msg");
            errorMsg.textContent = error;
            console.log(error);

            // Notify user of error with failure popup
            failurePopup();
        }
    })
});

/**
 * Gets html form fields and returns object containing all information
 * @returns JSON object with form fields
 */
function getFormFields() {

    // Get form fields we need to get data from
    let updateDishID = document.getElementById('dishId')
    let newDishName = document.getElementById("dishName");
    let newDescription = document.getElementById("description");
    let newCourseId = document.getElementById("course");
    let newTeamId = document.getElementById("team");
    let newEventYearId = document.getElementById("year");

    // Get the values from the form fields
    let dishID = updateDishID.value;
    let dishNameValue = newDishName.value;
    let descriptionValue = newDescription.value;
    let courseIdValue = newCourseId.value;
    let teamIdValue = newTeamId.value;
    let eventYearIdValue = newEventYearId.value;

    // Put our data we want to send in a javascript object
    let data = {
        id: dishID,
        dishName: dishNameValue,
        description: descriptionValue,
        courseId: courseIdValue,
        teamId: teamIdValue,
        eventYearId: eventYearIdValue
    }

    // Log and return data
    console.log("this is data:", data)
    return data
};

function successPopup() {
    // Get correct popup and open it
    let popup = document.getElementById("success-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close and redirect on click
    let button = document.getElementById("success-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
        window.location.href = '/dishes';
    });
};

function failurePopup() {
    // Get correct popup and open it
    let popup = document.getElementById("failure-popup");
    popup.classList.add("open-popup");

    // Add event listener to OK button to close on click
    let button = document.getElementById("failure-button");
    button.addEventListener('click', () => {
        popup.classList.remove("open-popup");
    });
};