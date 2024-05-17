package updater;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;

import static updater.lib.*;

public class lbUpdater {
    public static void main(String[] args) {
        try (FileWriter out = new FileWriter("js/db/dbData.js")) {
            try (Connection connection = DriverManager.getConnection(DATABASE_URL, USERNAME, PASSWORD)) {
                String query = "SELECT " +
                        "p.player_id, " +
                        "p.player_name, " +
                        "COUNT(DISTINCT g.game_id) AS games_played, " +
                        "SUM(CASE WHEN g.winner THEN 1 ELSE 0 END) AS wins, " +
                        "SUM(CASE WHEN NOT g.winner THEN 1 ELSE 0 END) AS losses, " +
                        "ROUND((SUM(CASE WHEN g.winner THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(DISTINCT g.game_id), 0)), 2) AS win_percentage, " +
                        "COALESCE(AVG(CASE WHEN g.winner THEN g.nr_of_movements ELSE NULL END), 0) AS avg_moves_won, " +
                        "AVG(g.avg_duration_per_move) AS avg_duration_per_move, " +
                        "ROUND(AVG(g.avg_duration_per_turn),2) AS avg_duration_per_turn " +
                        "FROM " +
                        "player p " +
                        "LEFT JOIN " +
                        "(SELECT " +
                        "g.game_id, " +
                        "g.player_id, " +
                        "g.winner, " +
                        "SUM(t.nr_of_movements) AS nr_of_movements, " +
                        "ROUND(CAST(SUM(EXTRACT(EPOCH FROM (t.end_time - t.start_time))) / NULLIF(SUM(t.nr_of_movements), 0) AS numeric), 2) AS avg_duration_per_move, " +
                        "ROUND(CAST(SUM(EXTRACT(EPOCH FROM (t.end_time - t.start_time))) / NULLIF(COUNT(t.turn_id), 0) AS numeric), 4) AS avg_duration_per_turn " +
                        "FROM " +
                        "game g " +
                        "LEFT JOIN " +
                        "turn t ON g.game_id = t.game_id " +
                        "GROUP BY " +
                        "g.game_id, g.player_id, g.winner) g ON p.player_id = g.player_id " +
                        "GROUP BY " +
                        "p.player_id, p.player_name " +
                        "ORDER BY " +
                        "wins DESC;";
                PreparedStatement statement = connection.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                GsonBuilder settings = new GsonBuilder();
                settings.setPrettyPrinting();
                Gson json = settings.create();

                JsonArray jsonArray = new JsonArray();
                while (resultSet.next()) {
                    JsonObject userData = new JsonObject();
                    int player_id = resultSet.getInt("player_id");
                    userData.addProperty("playerID", player_id);

                    String player_name = resultSet.getString("player_name");
                    userData.addProperty("name", player_name);

                    int gamesPlayed = resultSet.getInt("games_played");
                    userData.addProperty("playedGames", gamesPlayed);

                    int wins = resultSet.getInt("wins");
                    userData.addProperty("wins", wins);

                    int losses = resultSet.getInt("losses");
                    userData.addProperty("losses", losses);

                    double winPercentage = resultSet.getDouble("win_percentage");
                    userData.addProperty("win_percentage", winPercentage);

                    double avgMovesWon = resultSet.getDouble("avg_moves_won");
                    userData.addProperty("avg_moves_won", avgMovesWon);

                    double avgDurationPerMove = resultSet.getDouble("avg_duration_per_move");
                    userData.addProperty("avg_duration_per_move", avgDurationPerMove);

                    double avgDurationPerTurn = resultSet.getDouble("avg_duration_per_turn");
                    userData.addProperty("avg_duration_per_turn", avgDurationPerTurn);

                    jsonArray.add(userData);

                    System.out.println(player_id + " " + player_name + " " + gamesPlayed + " " + wins + " " + losses + " " + winPercentage + " " + avgMovesWon + " " + avgDurationPerMove + " " + avgDurationPerTurn + " ");
                }
                out.write("export const usersJSON = ");
                out.write(json.toJson(jsonArray));

                // Write the JavaScript function
                out.write("\n\nfunction populateTable() {\n");
                out.write("  const tableBody = document.getElementById(\"userData\");\n");
                out.write("  usersJSON.forEach(user => {\n");
                out.write("    const row = document.createElement('tr');\n");
                out.write("    Object.values(user).forEach(value => {\n");
                out.write("      const cell = document.createElement('td');\n");
                out.write("      cell.textContent = value;\n");
                out.write("      row.appendChild(cell);\n");
                out.write("    });\n");
                out.write("    tableBody.appendChild(row);\n");
                out.write("  });\n");
                out.write("}\n\n");

                // Call the function after DOMContentLoaded
                out.write("document.addEventListener('DOMContentLoaded', function() {\n");
                out.write("  populateTable();\n");
                out.write("});\n");
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
