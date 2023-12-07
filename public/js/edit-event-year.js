// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editEventYearForm = document.getElementById('edit-event-year-form-ajax');
    console.log(editEventYearForm);

    // Modify the objects we need
    editEventYearForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let eventYearId = document.getElementById('yearId')
        let newYear = document.getElementById("year");

        // Get the values from the form fields
        let updatedId = eventYearId.value
        let yearValue = newYear.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: updatedId,
            year: yearValue,
        }
        console.log("this is data:", data)
        
        // Fetch response from put request
        const response = await fetch('/event-years/edit-event-year/fetch', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful deletion
            alert("Event year edited successfully!");
            window.location.href = '/event-years';
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`The database is already tracking data for ${data.year}!`);
            };

            // Send generic error message
            console.error("Error editing event year");
        }
    })
});