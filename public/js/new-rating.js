// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addRatingForm = document.getElementById('new-rating-form');
    console.log(addRatingForm);

    // Modify the objects we need
    addRatingForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get data from form fields
        const data = getFormFields()
        
        // Fetch response from post request
        const response = await fetch('/ratings/new-rating/fetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        // Handle fetch response
        handleResponse(response, data);
    })
});

/**
 * Handles response with appropriate success/error notifications
 * @param {Promise} response response from insertion fetch
 * @param {Object} data data from form fields for use in error handling
 */
async function handleResponse(response, data) {
    if (response.ok) {
        // Handle successful insertion
        alert("Rating added successfully!");
        window.location.href = '/ratings';
    } else {
        // Handle errors
        const error = await response.json();

        // Fetch attendee and dish
        const attendeeResponse = await fetch(`/attendees/get-attendee?id=${data.attendeeId}`);
        const dishResponse = await fetch(`/dishes/get-dish?id=${data.dishId}`);

        // Get JSON from response
        const attendee = await attendeeResponse.json();
        const dish = await dishResponse.json();

        // Handle specific errors
        if (error.sqlError == 1062) {
            // Insert form logic to make warning appear (update this)
            alert(`${attendee.attendee_name} has already rated ${dish.dish_name.toLowerCase()}!`);
        };

        // Send generic error message
        console.error("Error editing rating");
    }
};

/**
 * Gets html form fields and returns object containing all information
 * @returns JSON object with form fields
 */
function getFormFields() {

    // Get form fields we need to get data from
    let newDishId = document.getElementById("dish");
    let newRating = document.getElementById("rating");
    let newComments = document.getElementById("comments");
    let newAttendeeId = document.getElementById("attendee");

    // Get the values from the form fields
    let dishIdValue = newDishId.value;
    let ratingValue = newRating.value;
    let commentsValue = newComments.value;
    let attendeeIdValue = newAttendeeId.value;

    // Put our data we want to send in a javascript object
    let data = {
        dishId: dishIdValue,
        rating: ratingValue,
        comments: commentsValue,
        attendeeId: attendeeIdValue
    }

    // Log and return data
    console.log("this is data:", data)
    return data
};