// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editRating = document.getElementById('edit-rating-form');
    console.log(editRating);

    // Modify the objects we need
    editRating.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById("id")
        let newDishId = document.getElementById("dish");
        let newRating = document.getElementById("rating");
        let newComments = document.getElementById("comments");
        let newAttendeeId = document.getElementById("attendee");

        // Get the values from the form fields
        let ratingID = updateID.value;
        let dishIdValue = newDishId.value;
        let ratingValue = newRating.value;
        let commentsValue = newComments.value;
        let attendeeIdValue = newAttendeeId.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: ratingID,
            dishId: dishIdValue,
            rating: ratingValue,
            comments: commentsValue,
            attendeeId: attendeeIdValue
        }
        console.log("this is data:", data)
        
        // Fetch response from put request
        const response = await fetch('/ratings/edit-rating/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful edit
            alert("Rating edited successfully!");
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
    })
});