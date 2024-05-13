export const usersJSON = [
  {
    "playerID": 9,
    "name": "Mar",
    "playedGames": 3,
    "wins": 3,
    "losses": 0,
    "win_percentage": 100.0,
    "avg_moves_won": 5.0,
    "avg_duration_per_move": 3.01,
    "avg_duration_per_turn": 3.4784
  },
  {
    "playerID": 5,
    "name": "Uuesti",
    "playedGames": 1,
    "wins": 1,
    "losses": 0,
    "win_percentage": 100.0,
    "avg_moves_won": 6.0,
    "avg_duration_per_move": 2.3,
    "avg_duration_per_turn": 4.6042
  },
  {
    "playerID": 4,
    "name": "ONLINEDATABASE",
    "playedGames": 1,
    "wins": 1,
    "losses": 0,
    "win_percentage": 100.0,
    "avg_moves_won": 2.0,
    "avg_duration_per_move": 1.32,
    "avg_duration_per_turn": 1.3212
  },
  {
    "playerID": 2,
    "name": "Ivan",
    "playedGames": 1,
    "wins": 1,
    "losses": 0,
    "win_percentage": 100.0,
    "avg_moves_won": 14.0,
    "avg_duration_per_move": 4.98,
    "avg_duration_per_turn": 9.9674
  },
  {
    "playerID": 13,
    "name": "Pedro",
    "playedGames": 1,
    "wins": 1,
    "losses": 0,
    "win_percentage": 100.0,
    "avg_moves_won": 7.0,
    "avg_duration_per_move": 1.8,
    "avg_duration_per_turn": 3.1503
  },
  {
    "playerID": 7,
    "name": "Mama",
    "playedGames": 1,
    "wins": 1,
    "losses": 0,
    "win_percentage": 100.0,
    "avg_moves_won": 8.0,
    "avg_duration_per_move": 2.23,
    "avg_duration_per_turn": 4.4655
  },
  {
    "playerID": 11,
    "name": "Player1",
    "playedGames": 1,
    "wins": 1,
    "losses": 0,
    "win_percentage": 100.0,
    "avg_moves_won": 4.0,
    "avg_duration_per_move": 3.81,
    "avg_duration_per_turn": 5.0735
  },
  {
    "playerID": 14,
    "name": "Tiit",
    "playedGames": 1,
    "wins": 0,
    "losses": 1,
    "win_percentage": 0.0,
    "avg_moves_won": 0.0,
    "avg_duration_per_move": 2.07,
    "avg_duration_per_turn": 4.8369
  },
  {
    "playerID": 3,
    "name": "NEWPLAYER",
    "playedGames": 1,
    "wins": 0,
    "losses": 1,
    "win_percentage": 0.0,
    "avg_moves_won": 0.0,
    "avg_duration_per_move": 2.1,
    "avg_duration_per_turn": 2.0985
  },
  {
    "playerID": 6,
    "name": "ema",
    "playedGames": 1,
    "wins": 0,
    "losses": 1,
    "win_percentage": 0.0,
    "avg_moves_won": 0.0,
    "avg_duration_per_move": 3.12,
    "avg_duration_per_turn": 6.2357
  },
  {
    "playerID": 8,
    "name": "Papa",
    "playedGames": 1,
    "wins": 0,
    "losses": 1,
    "win_percentage": 0.0,
    "avg_moves_won": 0.0,
    "avg_duration_per_move": 1.94,
    "avg_duration_per_turn": 3.2267
  },
  {
    "playerID": 10,
    "name": "Rah",
    "playedGames": 3,
    "wins": 0,
    "losses": 3,
    "win_percentage": 0.0,
    "avg_moves_won": 0.0,
    "avg_duration_per_move": 1.3033333333333332,
    "avg_duration_per_turn": 1.7434333333333334
  },
  {
    "playerID": 12,
    "name": "AI_BOT",
    "playedGames": 1,
    "wins": 0,
    "losses": 1,
    "win_percentage": 0.0,
    "avg_moves_won": 0.0,
    "avg_duration_per_move": 0.01,
    "avg_duration_per_turn": 0.0054
  },
  {
    "playerID": 1,
    "name": "Safa",
    "playedGames": 1,
    "wins": 0,
    "losses": 1,
    "win_percentage": 0.0,
    "avg_moves_won": 0.0,
    "avg_duration_per_move": 3.58,
    "avg_duration_per_turn": 6.6443
  }
]

function populateTable() {
  const tableBody = document.getElementById("userData");
  usersJSON.forEach(user => {
    const row = document.createElement('tr');
    Object.values(user).forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  populateTable();
});
