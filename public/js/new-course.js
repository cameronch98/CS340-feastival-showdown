// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addCourseForm = document.getElementById('new-course-form');
    console.log(addCourseForm);

    // Modify the objects we need
    addCourseForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newCourse = document.getElementById("course");

        // Get the values from the form fields
        let courseValue = newCourse.value;

        // Put our data we want to send in a javascript object
        let data = {
            course: courseValue
        }
        console.log("this is data:", data)
        
        // Fetch response from post request
        const response = await fetch('/courses/new-course/fetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful deletion
            alert("Course added successfully!");
            window.location.href = '/courses';
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`${data.course} is already a course!`);
            };

            // Send generic error message
            console.error("Error adding course");
        }
    })
});