package updater;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class lib {
    public static final String  DATABASE_URL = "jdbc:postgresql://10.134.178.13:5432/game";
    public static final String  USERNAME = "game";
    public static final String PASSWORD = "7sur7";


    public static Connection initDatabase() throws SQLException {
        try {
            Connection connection = DriverManager.getConnection(DATABASE_URL, USERNAME, PASSWORD);
            if (connection != null) {
                System.out.println("Connected to Postgresql server");
                return connection;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}



