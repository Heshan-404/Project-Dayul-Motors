const express = require("express");
const { Pool } = require("pg");

// Replace with your actual connection string
const connectionString =
  "postgresql://a_t_heshan:zvHJChsmcU2NdLqCoYmkRQ@tanned-rooster-6855.6xw.aws-ap-southeast-1.cockroachlabs.cloud:26257/dayul?sslmode=verify-full";

// Create a new PostgreSQL pool
const pool = new Pool({
  connectionString: connectionString,
});

const app = express();

// Function to get all users from the database
const getUsers = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

// Route to handle GET requests for /users
app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error in /users route:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
