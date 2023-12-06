// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addDiscountForm = document.getElementById('new-discount-form-ajax');
    console.log(addDiscountForm);

    // Modify the objects we need
    addDiscountForm.addEventListener("submit", async function (e) {
        console.log("submit was pressed")
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let newDiscount = document.getElementById("discount");
        let newPercent = document.getElementById("percent");

        // Get the values from the form fields
        let discountValue = newDiscount.value;
        let percentValue = newPercent.value;

        // Put our data we want to send in a javascript object
        let data = {
            discount: discountValue,
            percent: percentValue,
        }
        console.log("this is data:", data)
        
        // Fetch response from post request
        const response = await fetch('/discounts/new-discount-ajax', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            // Handle successful deletion
            alert("Discount added successfully!");
            window.location.href = '/discounts';
        } else {
            // Handle errors
            const error = await response.json();

            // Handle specific errors
            if (error.sqlError == 1062) {
                // Insert form logic to make warning appear (update this)
                alert(`The ${data.discount.toLowerCase()} discount is already active!`);
            };

            // Send generic error message
            console.error("Error adding discount");
        }
    })
});