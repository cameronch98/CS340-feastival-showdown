// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editRating = document.getElementById('edit-rating-form-ajax');
    console.log(editRating);

    // Modify the objects we need
    editRating.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById("id")
        let newDish = document.getElementById("dish");
        let newRating = document.getElementById("rating");
        let newComments = document.getElementById("comments");
        let newAttendee = document.getElementById("attendee");

        // Get the values from the form fields
        let ratingID = updateID.value;
        let dishValue = newDish.value;
        let ratingValue = newRating.value;
        let commentsValue = newComments.value;
        let attendeeValue = newAttendee.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: ratingID,
            dish: dishValue,
            rating: ratingValue,
            comments: commentsValue,
            attendee: attendeeValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/edit-rating-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Redirect to the attendees page
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