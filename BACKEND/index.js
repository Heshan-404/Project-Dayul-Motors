const { Pool } = require("pg");

// Replace with your actual connection string
const connectionString =
  "postgresql://a_t_heshan:zvHJChsmcU2NdLqCoYmkRQ@tanned-rooster-6855.6xw.aws-ap-southeast-1.cockroachlabs.cloud:26257/dayul?sslmode=verify-full";

// Create a new PostgreSQL pool
const pool = new Pool({
  connectionString: connectionString,
});

// Function to get all users from the database
const getUsers = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    client.release();
    return result.rows;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error; // Re-throw the error so it can be handled appropriately
  }
};

// Example usage:
getUsers()
  .then((users) => {
    console.log("Users:", users);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
