function confirmAndDelete(entityName, entityId, deleteUrl) {
    console.log("delete pressed")

    document.getElementById('confirmationMessage').textContent = `Are you sure you want to delete ${entityName}?`;
    var modal = document.getElementById('confirmationModal');
    modal.style.display = "block";

    document.getElementById('confirmButton').onclick = function() {
        modal.style.display = "none";
        // Add your fetch/delete logic here
        fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: entityId })
        }).then(response => {
            if (response.ok) {
                // Handle successful deletion
                console.log("Item deleted successfully");
                // refresh page to update table
                window.location.reload();
            } else {
                // Handle errors
                console.error("Error in deletion");
            }
        });
    };

    document.getElementById('cancelButton').onclick = function() {
        modal.style.display = "none";
    };
}
//     if (confirm(`Are you sure you want to delete ${entityName}?`)) {
//         fetch(deleteUrl, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id: entityId })
//         }).then(response => {
//             if (response.ok) {
//                 // Handle successful deletion
//                 console.log("Item deleted successfully");
//                 // refresh page to update table
//                 window.location.reload();
//             } else {
//                 // Handle errors
//                 console.error("Error in deletion");
//             }
//         });
//     }
// }
