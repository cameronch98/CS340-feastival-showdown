// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addEventYearForm = document.getElementById('new-event-year-form');
    console.log(addEventYearForm);

    // Modify the objects we need
    addEventYearForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newYear = document.getElementById("year");

        // Get the values from the form fields
        let yearValue = newYear.value;

        // Put our data we want to send in a javascript object
        let data = {
            year: yearValue
        }
        console.log("this is data:", data)
        
        // Fetch response from post request
        const response = await fetch('/event-years/new-event-year/fetch', {
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
                window.location.href = '/event-years';
            });
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            let errorMsg = document.getElementById("error-msg");
            if (error.sqlError == 1062) {
                errorMsg.textContent = `The database is already tracking data for ${data.year}!`;
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
            console.error("Error adding event year");
        }
    })
});

function openPopup(popup) {
    popup.classList.add("open-popup");
};

function closePopup(popup) {
    popup.classList.remove("open-popup");
};