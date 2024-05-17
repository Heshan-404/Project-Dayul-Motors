
const mysql = require("mysql2");

// Database Configuration
const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create a MySQL Connection Pool
const pool = mysql.createPool(dbConfig);

// Test Connection (Optional)
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database!");
  }
});

// Export the connection pool (so other files can use it)
module.exports = pool.promise();
