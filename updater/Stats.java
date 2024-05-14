package updater;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;

import static updater.lib.*;

public class Stats {
    public static void main(String[] args) throws IOException {
        try (FileWriter out = new FileWriter("js/statistics.js")) {
            try (Connection connection = DriverManager.getConnection(DATABASE_URL, USERNAME, PASSWORD)) {
                String query = "SELECT player_id, player_name FROM player";
                PreparedStatement statement = connection.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                GsonBuilder settings = new GsonBuilder();
                settings.setPrettyPrinting();
                Gson json = settings.create();

                JsonArray jsonArray = new JsonArray();
                while (resultSet.next()) {
                }
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}