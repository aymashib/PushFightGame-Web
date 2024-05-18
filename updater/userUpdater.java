package updater;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;

import static updater.lib.lib.*;

public class userUpdater {
    public static void main(String[] args) {
        String[] admins = {"Markus", "Ivan", "Ayman", "Gloria", "Cas", "Huseyin"};

        try(FileWriter out = new FileWriter("js/db/users.js")){
            try (Connection connection = DriverManager.getConnection(DATABASE_URL, USERNAME, PASSWORD)){
                String query = "SELECT player_id, player_name FROM player";
                PreparedStatement statement = connection.prepareStatement(query);
                ResultSet resultSet = statement.executeQuery();

                GsonBuilder settings = new GsonBuilder();
                settings.setPrettyPrinting();
                Gson json = settings.create();

                JsonArray jsonArray = new JsonArray();
                while(resultSet.next()){
                    JsonObject user = new JsonObject();
                    int player_id = resultSet.getInt("player_id");
                    user.addProperty("id", player_id);

                    String player_name = resultSet.getString("player_name");
                    user.addProperty("name", player_name);

                    StringBuilder password = new StringBuilder(player_name);
                    password.reverse();
                    user.addProperty("password", password.toString().toLowerCase());

                    boolean isAdmin = false;
                    for(String admin : admins) {
                        if(player_name.equals(admin)) {
                            isAdmin = true;
                            break;
                        }
                    }
                    user.addProperty("isAdmin", isAdmin);

                    jsonArray.add(user);

                    System.out.println(player_name + " " + player_id + " " + password.toString().toLowerCase());
                }
                out.write("export const usersJSON = ");
                out.write(json.toJson(jsonArray));
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}