import { gamesJSON } from "./db/db.js";
import { usersJSON } from "./db/users.js";

const games = gamesJSON;
const users = usersJSON;

function populatePlayerNameField() {
    const currentUser = getCurrentUser();
    const formPlayerName = document.getElementById("player_name");

    if (currentUser) {
        if (!currentUser.isAdmin) {
            formPlayerName.value = currentUser.name;
            formPlayerName.disabled = true;
        } else {
            formPlayerName.removeAttribute("disabled");
        }
    }
}

window.onload = populatePlayerNameField;

document.getElementById("queryForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const formId = document.getElementById("id").value;
    const formPlayerName = document.getElementById("player_name").value;
    const formScore = document.getElementById("score").value;
    const formScoreComp = document.getElementById("scoreComparison").value;
    const formWin = document.getElementById("win").checked;
    const formDateBefore = document.getElementById("dateBefore").value;
    const formDateAfter = document.getElementById("dateAfter").value;

    let filteredGames = games;

    if (formId !== "") {
        const id = parseInt(formId);
        filteredGames = filteredGames.filter(game => game.id === id);
    } else {
        if (formPlayerName !== "") {
            const usersWithName = users.filter(user => user.name === formPlayerName);
            filteredGames = filteredGames.filter(game => {
                return usersWithName.some(user => game.player_name === user.name);
            });
        }

        if (formWin) {
            filteredGames = filteredGames.filter(game => game.winner === "W");
        }

        if (formScore !== "") {
            const score = parseInt(formScore);
            const compareMethod = {
                "above": game => game.score > score,
                "equal": game => game.score === score,
                "below": game => game.score < score
            };
            filteredGames = filteredGames.filter(compareMethod[formScoreComp]);
        }

        if (formDateBefore !== "") {
            const dateBefore = new Date(formDateBefore);
            filteredGames = filteredGames.filter(game => new Date(game.date) < dateBefore);
        }

        if (formDateAfter !== "") {
            const dateAfter = new Date(formDateAfter);
            filteredGames = filteredGames.filter(game => new Date(game.date) > dateAfter);
        }
    }

    updateResultTable(filteredGames);
});

function updateResultTable(filteredGames) {
    const resultTable = document.getElementById("resultTable");
    const tbody = resultTable.querySelector("tbody");

    // Remove existing rows
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    // Populate the table with filtered data
    filteredGames.forEach(game => {
        const resultRow = tbody.insertRow();

        const resultId = resultRow.insertCell(0);
        resultId.textContent = game.id;

        const resultPlayer = resultRow.insertCell(1);
        resultPlayer.textContent = game.player_name;

        const resultResult = resultRow.insertCell(2);
        resultResult.textContent = game.winner === "W" ? "WON" : "LOST";

        const resultScore = resultRow.insertCell(3);
        resultScore.textContent = game.score;

        const resultDate = resultRow.insertCell(4);
        resultDate.textContent = game.date;
    });
}

function getCurrentUser() {
    const storedUsername = window.localStorage.getItem('username');
    const storedPassword = window.localStorage.getItem('password');

    const currentUser = users.find(user => user.name === storedUsername && user.password === storedPassword);

    if (currentUser) {
        const isAdmin = currentUser.isAdmin;
        return { ...currentUser, isAdmin };
    } else {
        return null;
    }
}