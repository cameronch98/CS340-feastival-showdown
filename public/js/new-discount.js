// Get the objects we need to modify
document.addEventListener("DOMContentLoaded", () => {
    let addDiscountForm = document.getElementById('new-discount-form-ajax');
    console.log(addDiscountForm);

    // Modify the objects we need
    addDiscountForm.addEventListener("submit", function (e) {
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
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-discount-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Clear the input fields for another transaction
                newDiscount.value = '';
                newPercent.value = '';
                
                // Redirect to the competitor page
                window.location.href ='/discounts';  

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })
});