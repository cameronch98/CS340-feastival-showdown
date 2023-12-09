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
            // Handle successful edit with success popup
            let popup = document.getElementById("success-popup");
            openPopup(popup);

            // Trigger modal close and redirect on OK click
            let button = document.getElementById("success-button");
            button.addEventListener('click', () => {
                closePopup(popup);
                window.location.href = '/ratings';
            });
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
            let errorMsg = document.getElementById("error-msg");
            if (error.sqlError == 1062) {
                errorMsg.textContent = `${attendee.attendee_name} has already rated ${dish.dish_name.toLowerCase()}!`;
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
            console.error("Error editing rating");
        }
    })
});

function openPopup(popup) {
    popup.classList.add("open-popup");
};

function closePopup(popup) {
    popup.classList.remove("open-popup");
};