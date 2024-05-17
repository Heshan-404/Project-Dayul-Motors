const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 3306;

// Database Configuration (These will be set as environment variables in Vercel)
const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

// Create a MySQL Connection Pool
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(express.json());

// Route to get all users
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await pool.promise().query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new user
app.post("/api/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [result] = await pool
      .promise()
      .query("INSERT INTO users (email, password) VALUES (?, ?)", [
        email,
        password,
      ]);
    res.json({
      message: "User created successfully!",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update a user by email
app.put("/api/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const { password } = req.body;
    const [result] = await pool
      .promise()
      .query("UPDATE users SET password = ? WHERE email = ?", [
        password,
        email,
      ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User updated successfully!" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
