document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sortPlayer").addEventListener("click", () => {
        sortTable(1, "sortPlayer");
    });

    document.getElementById("sortScore").addEventListener("click", () => {
        sortTable(3, "sortScore");
    });
});

let sortState = {
    column: null,
    ascending: true
};

function sortTable(columnIndex, buttonId) {
    const table = document.getElementById("resultTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const button = document.getElementById(buttonId);

    // Determine the sorting order
    if (sortState.column === columnIndex) {
        sortState.ascending = !sortState.ascending; // Toggle sorting order
    } else {
        sortState.column = columnIndex;
        sortState.ascending = true; // Default to ascending if a new column is sorted
    }

    // Update the button text content
    const sortButtons = document.querySelectorAll(".sort-button");
    sortButtons.forEach(btn => btn.textContent = '▼');
    button.textContent = sortState.ascending ? '▲' : '▼';

    // Sort rows based on the column values
    rows.sort((rowA, rowB) => {
        const valueA = rowA.cells[columnIndex].textContent.trim();
        const valueB = rowB.cells[columnIndex].textContent.trim();

        if (columnIndex === 1) { // Player names (strings)
            return sortState.ascending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        } else if (columnIndex === 3) { // Scores (integers)
            const numA = parseInt(valueA, 10);
            const numB = parseInt(valueB, 10);
            return sortState.ascending ? numA - numB : numB - numA;
        }
    });

    // Remove existing rows and re-append sorted rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    rows.forEach(row => tbody.appendChild(row));
}