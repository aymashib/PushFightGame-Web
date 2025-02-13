import { gamesJSON } from "./db/db.js";
import { usersJSON } from "./db/users.js";

const games = gamesJSON;
const users = usersJSON;

// Function to populate the player name field based on the current user
function populatePlayerNameField() {
    const currentUser = getCurrentUser();
    const form_player_name = document.getElementById("player_name");

    if (currentUser) {
        if (!currentUser.isAdmin) {
            // If the user is not an admin, populate and disable the player name field with the user's name
            form_player_name.value = currentUser.name;
            form_player_name.disabled = true; // Disable it for non-admin users
        } else {
            form_player_name.removeAttribute("disabled"); // Enable the field for admin
        }
    }
}


// Call the function to populate the player name field when the page loads
window.onload = populatePlayerNameField;

document.getElementById("queryForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let form_id = document.getElementById("id");
    let form_player_name = document.getElementById("player_name");
    let form_score = document.getElementById("score");
    let form_score_comp = document.getElementById("scoreComparison");
    let form_win = document.getElementById("win");
    let form_date_before = document.getElementById("dateBefore");
    let form_date_after = document.getElementById("dateAfter");

    let filteredGames = games;
    if (form_id.value !== "") {
        let id = parseInt(form_id.value);
        filteredGames = filteredGames.filter(game => game.id === id);
    } else {
        // Populating player name moved to the separate function
        populatePlayerNameField();

        if(form_player_name.value !== "") {
            // Filter users with the provided player name
            let usersWithName = users.filter(user => user.name === form_player_name.value);

            // Filter games based on whether their player name matches any of the users
            filteredGames = filteredGames.filter(game => {
                return usersWithName.some(user => game.player_name === user.name);
            });
        }

        if (form_win.checked) {
            filteredGames = filteredGames.filter(game => game.winner === "W");
        }

        if (form_score.value !== "") {
            let score = parseInt(form_score.value);

            let compareMethod = {
                "above": (game) => game.score > score,
                "equal": (game) => game.score === score,
                "below": (game) => game.score < score
            }

            filteredGames = filteredGames.filter(compareMethod[form_score_comp.value]);
        }

        if (form_date_before.value !== "") {
            let dateBefore = new Date(form_date_before.value);
            filteredGames = filteredGames.filter(game => (new Date(game.date)) < dateBefore);
        }

        if (form_date_after.value !== "") {
            let dateAfter = new Date(form_date_after.value);
            filteredGames = filteredGames.filter(game => (new Date(game.date)) > dateAfter);
        }
    }

    let resultTable = document.getElementById("resultTable");

    // Remove existing rows from the table
    while (resultTable.rows.length > 1) {
        resultTable.deleteRow(1);
    }

    // Populate the table with filtered data
    filteredGames.forEach(game => {
        let resultRow = resultTable.insertRow(-1);

        let resultId = resultRow.insertCell(0);
        resultId.textContent = game.id;

        let resultPlayer = resultRow.insertCell(1);
        resultPlayer.textContent = game.player_name;

        let resultResult = resultRow.insertCell(2);
        resultResult.textContent = game.winner === "W" ? "WON" : "LOST";

        let resultScore = resultRow.insertCell(3);
        resultScore.textContent = game.score;

        let resultDate = resultRow.insertCell(4);
        resultDate.textContent = game.date;
    });
});


function getCurrentUser() {
    // Retrieve the current user from local storage
    const storedUsername = window.localStorage.getItem('username');
    const storedPassword = window.localStorage.getItem('password');

    // Find the user in the users array based on the stored username and password
    const currentUser = users.find(user => user.name === storedUsername && user.password === storedPassword);

    if (currentUser) {
        // Check if the user is an admin
        const isAdmin = currentUser.isAdmin;
        return { ...currentUser, isAdmin }; // Include isAdmin property in the returned object
    } else {
        return null;
    }
}
