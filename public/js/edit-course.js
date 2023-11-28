// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editCourseForm = document.getElementById('edit-course-form-ajax');
    console.log(editCourseForm);

    // Modify the objects we need
    editCourseForm.addEventListener("submit", function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById('id')
        let course = document.getElementById('course')

        // Get the values from the form fields
        let courseID = updateID.value
        let courseValue = course.value
        
        // Put our data we want to send in a javascript object
        let data = {
            id: courseID,
            course: courseValue
        }
        console.log("this is data:", data)
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/courses/edit-course-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                window.location.href ='/courses';  
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});