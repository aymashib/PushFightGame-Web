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

    // Get the sorting order (ascending or descending)
    let ascending = true;
    if (table.dataset.sortedColumn === columnIndex.toString()) {
        ascending = !(table.dataset.ascending === "true");
    }

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

        return ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    // Create a new tbody element
    const newTbody = document.createElement('tbody');

    // Append sorted rows to the new tbody
    rows.forEach(row => newTbody.appendChild(row));

    // Replace the existing tbody with the new one
    table.replaceChild(newTbody, tbody);
}

