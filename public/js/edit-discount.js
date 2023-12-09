// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let editDiscountForm = document.getElementById('edit-discount-form');
    console.log(editDiscountForm);

    // Modify the objects we need
    editDiscountForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let updateID = document.getElementById("id")
        let newDiscount = document.getElementById("discount");
        let newPercent = document.getElementById("percent");

        // Get the values from the form fields
        let discountId = updateID.value;
        let discountValue = newDiscount.value;
        let percentValue = newPercent.value;

        // Put our data we want to send in a javascript object
        let data = {
            id: discountId,
            discount: discountValue,
            percent: percentValue,
        }
        console.log("this is data:", data)
        
        // Fetch response from put request
        const response = await fetch('/discounts/edit-discount/fetch', {
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
                window.location.href = '/discounts';
            });
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            let errorMsg = document.getElementById("error-msg");
            if (error.sqlError == 1062) {
                errorMsg.textContent = `The ${data.discount.toLowerCase()} discount is already active!`;
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
            console.error("Error editing discount");
        }
    })
});

function openPopup(popup) {
    popup.classList.add("open-popup");
};

function closePopup(popup) {
    popup.classList.remove("open-popup");
};