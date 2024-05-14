document.getElementById("sortPlayer").addEventListener("click", () => {
    sortTable(1, "sortPlayer"); // Sort based on player column
});

document.getElementById("sortScore").addEventListener("click", () => {
    sortTable(3, "sortScore"); // Sort based on score column
});

function sortTable(columnIndex, buttonId) {
    const table = document.getElementById("resultTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const button = document.getElementById(buttonId);

    // Get the sorting order (ascending or descending) based on the button's current text content
    let ascending = button.textContent === '▼';

    // Invert sorting order
    ascending = !ascending;

    // Update sort button visuals
    const sortButtons = document.querySelectorAll(".sort-button");
    sortButtons.forEach(btn => btn.textContent = '▼'); // Reset all buttons
    button.textContent = ascending ? '▼' : '▲';

    // Set the dataset attributes for tracking sorted column and order
    table.dataset.sortedColumn = columnIndex;
    table.dataset.ascending = ascending;

    // Sort the rows based on the column values
    rows.sort((rowA, rowB) => {
        const valueA = rowA.cells[columnIndex].textContent;
        const valueB = rowB.cells[columnIndex].textContent;

        // For player names (strings), use localeCompare
        if (columnIndex === 1) {
            return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (columnIndex === 3) { // For scores (integers), convert to numbers and compare
            const numA = parseInt(valueA);
            const numB = parseInt(valueB);
            return ascending ? numA - numB : numB - numA;
        }
    });

    // Create a new tbody element
    const newTbody = document.createElement('tbody');

    // Append sorted rows to the new tbody
    rows.forEach(row => newTbody.appendChild(row));

    // Remove existing tbody from the table
    table.removeChild(tbody);

    // Append the sorted tbody to the table
    table.appendChild(newTbody);
}





