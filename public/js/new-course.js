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
            // Handle successful insertion with success popup
            let popup = document.getElementById("success-popup");
            openPopup(popup);

            // Trigger modal close and redirect on OK click
            let button = document.getElementById("success-button");
            button.addEventListener('click', () => {
                closePopup(popup);
                window.location.href = '/courses';
            });
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            let errorMsg = document.getElementById("error-msg");
            if (error.sqlError == 1062) {
                errorMsg.textContent = `${data.course} is already a course!`;
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
            console.error("Error adding course");
        }
    })
});

function openPopup(popup) {
    popup.classList.add("open-popup");
};

function closePopup(popup) {
    popup.classList.remove("open-popup");
};