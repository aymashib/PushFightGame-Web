import { gamesJSON } from "./db/db.js";
import { usersJSON } from "./db/users.js";

// Load games from local storage or use default gamesJSON if not available
let games = JSON.parse(localStorage.getItem('games')) || [...gamesJSON];
const users = usersJSON;

// Function to update local storage with the modified games array
function updateLocalStorage(games) {
    localStorage.setItem('games', JSON.stringify(games));
}

// Function to populate the player name field based on the current user
function populatePlayerNameField() {
    const currentUser = getCurrentUser();
    const formPlayerName = document.getElementById("player_name");

    // If there's a current user and they are not an admin, populate and disable the player name field
    if (currentUser) {
        if (!currentUser.isAdmin) {
            formPlayerName.value = currentUser.name;
            formPlayerName.disabled = true;
        } else {
            formPlayerName.removeAttribute("disabled");
        }
    }
}

// Call populatePlayerNameField when the window loads
window.onload = populatePlayerNameField;

// Event listener for form submission
document.getElementById("queryForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const formId = document.getElementById("id").value;
    const formPlayerName = document.getElementById("player_name").value;
    const formScore = document.getElementById("score").value;
    const formScoreComp = document.getElementById("scoreComparison").value;
    const formWin = document.getElementById("win").checked;
    const formDateBefore = document.getElementById("dateBefore").value;
    const formDateAfter = document.getElementById("dateAfter").value;

    // Initialize filteredGames with all games
    let filteredGames = games;

    // Filter games by ID if specified
    if (formId !== "") {
        const id = parseInt(formId);
        filteredGames = filteredGames.filter(game => game.id === id);
    } else {
        // Filter games by player name if specified
        if (formPlayerName !== "") {
            const usersWithName = users.filter(user => user.name === formPlayerName);
            filteredGames = filteredGames.filter(game => {
                return usersWithName.some(user => game.player_name === user.name);
            });
        }

        // Filter games by win status if specified
        if (formWin) {
            filteredGames = filteredGames.filter(game => game.winner === "W");
        }

        // Filter games by score if specified
        if (formScore !== "") {
            const score = parseInt(formScore);
            const compareMethod = {
                "above": game => game.score > score,
                "equal": game => game.score === score,
                "below": game => game.score < score
            };
            filteredGames = filteredGames.filter(compareMethod[formScoreComp]);
        }

        // Filter games by date if specified
        if (formDateBefore !== "") {
            const dateBefore = new Date(formDateBefore);
            filteredGames = filteredGames.filter(game => new Date(game.date) < dateBefore);
        }

        if (formDateAfter !== "") {
            const dateAfter = new Date(formDateAfter);
            filteredGames = filteredGames.filter(game => new Date(game.date) > dateAfter);
        }
    }

    // Update the result table with the filtered games
    updateResultTable(filteredGames);
});

// Function to update the result table with filtered games
function updateResultTable(filteredGames) {
    const resultTable = document.getElementById("resultTable");
    const tbody = resultTable.querySelector("tbody");

    // Remove existing rows in the table
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Populate the table with filtered data and add delete button to each row
    filteredGames.forEach(game => {
        const resultRow = tbody.insertRow();
        populateCells(resultRow, game);
        addDeleteButton(resultRow, game, filteredGames);
    });
}

// Function to populate table cells with game data
function populateCells(row, game) {
    const resultId = row.insertCell();
    resultId.textContent = game.id;

    const resultPlayer = row.insertCell();
    resultPlayer.textContent = game.player_name;

    const resultResult = row.insertCell();
    resultResult.textContent = game.winner === "W" ? "WON" : "LOST";

    const resultScore = row.insertCell();
    resultScore.textContent = game.score;

    const resultDate = row.insertCell();
    resultDate.textContent = game.date;
}

// Function to add a delete button to each row
function addDeleteButton(row, game, filteredGames) {
    const deleteCell = row.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    // Event listener for the delete button
    deleteButton.addEventListener("click", () => {
        // Remove the corresponding game from the games array
        const index = filteredGames.indexOf(game);
        if (index !== -1) {
            filteredGames.splice(index, 1);
            // Update local storage and the table after deleting the row
            updateLocalStorage(filteredGames);
            updateResultTable(filteredGames);
        }
    });
    deleteCell.appendChild(deleteButton);
}

// Function to get the current user from local storage
function getCurrentUser() {
    const storedUsername = window.localStorage.getItem('username');
    const storedPassword = window.localStorage.getItem('password');

    // Find the user in the users array that matches the stored username and password
    const currentUser = users.find(user => user.name === storedUsername && user.password === storedPassword);

    if (currentUser) {
        const isAdmin = currentUser.isAdmin;
        return { ...currentUser, isAdmin };
    } else {
        return null;
    }
}

// Refresh button functionality
document.getElementById("refreshButton").addEventListener("click", () => {
    games = [...gamesJSON]; // Reset games to a copy of the original gamesJSON
    updateLocalStorage(games); // Update local storage
    // Note: Not updating the result table to avoid showing all games to non-admin users
});
