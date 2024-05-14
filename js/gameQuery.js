import { gamesJSON } from "./db/db.js";
import { usersJSON } from "./db/users.js";

const games = gamesJSON;
const users = usersJSON;

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
        if (form_player_name.value !== "") {
            let playerName = form_player_name.value;
            let matchingUser = users.find(user => user.username === playerName);
            if (matchingUser) {
                filteredGames = filteredGames.filter(game => game.player_name === playerName);
            } else {
                filteredGames = [];
            }
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

    let resultTable = document.createElement("table");
    resultTable.id = "resultTable";
    resultTable.innerHTML = "<tr><th>id</th><th>Player</th><th>Result</th><th>Score</th><th>Date</th></tr>";

    filteredGames.forEach(game => {
        let resultRow = document.createElement("tr");

        let resultId = document.createElement("td");
        resultId.textContent = game.id;
        resultRow.appendChild(resultId);

        let resultPlayer = document.createElement("td");
        resultPlayer.textContent = game.player_name;
        resultRow.appendChild(resultPlayer);

        let resultResult = document.createElement("td");
        resultResult.textContent = game.winner === "W" ? "WON" : "LOST";
        resultRow.appendChild(resultResult);

        let resultScore = document.createElement("td");
        resultScore.textContent = game.score;
        resultRow.appendChild(resultScore);

        let resultDate = document.createElement("td");
        resultDate.textContent = game.date;
        resultRow.appendChild(resultDate);

        resultTable.appendChild(resultRow);
    });

    let existingTable = document.getElementById("resultTable");
    if (existingTable) {
        existingTable.replaceWith(resultTable);
    } else {
        document.body.appendChild(resultTable);
    }
});
