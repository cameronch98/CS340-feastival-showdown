// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editCourseForm = document.getElementById('edit-course-form-ajax');
    console.log(editCourseForm);

    // Modify the objects we need
    editCourseForm.addEventListener("submit", async function (e) {
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
        
        // Fetch response from put request
        const response = await fetch('/courses/edit-course-ajax', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful deletion
            alert("Course edited successfully!");
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
            console.error("Error editing course");
        }
    })
});