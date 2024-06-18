// Function to add dynamic numbering and 'Active' status based on table rows
function addDynamicNumberingAndStatus() {
    const table = document.getElementById('editableTable');
    const rows = table.getElementsByTagName('tr');

    // Start numbering from 1 (assuming first row is header)
    let counter = 1;

    // Iterate through each row (skipping the header row)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        
        // Update the first cell (ID column) with the current counter
        cells[0].innerText = counter;

        // Add 'Active' status cell as the last column
        const statusCell = document.createElement('td');
        statusCell.innerHTML = '<span class="status delivered">Active</span>';
        row.appendChild(statusCell);

        // Increment counter for the next row
        counter++;
    }
}

// Call the function to add numbering and 'Active' status when the page is loaded
addDynamicNumberingAndStatus();
