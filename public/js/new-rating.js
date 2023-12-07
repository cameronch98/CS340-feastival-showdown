// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addRatingForm = document.getElementById('new-rating-form-ajax');
    console.log(addRatingForm);

    // Modify the objects we need
    addRatingForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

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
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/ratings/new-rating/fetch", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newDishId.value = '';
                newRating.value = '';
                newComments.value = '';
                newAttendeeId.value = '';

                // Redirect to the ratings page
                window.location.href ='/ratings';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});