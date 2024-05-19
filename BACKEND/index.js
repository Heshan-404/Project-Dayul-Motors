const express = require("express");
const mysql = require("mysql2");

const app = express();

const connection = mysql.createConnection({
  host: "bw3ryqxw0xyxk0s9u6ze-mysql.services.clever-cloud.com",
  port: "3306",
  user: "ufbxvknaudaeqojb",
  password: "O2XsuyJPXAiqxPtmen5R",
  database: "bw3ryqxw0xyxk0s9u6ze",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

// Define your routes and make queries to your database

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error fetching data");
    } else {
      console.log("fetched");
      res.send(results);
    }
  });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }

  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  const values = [name, email];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting user:", error);
      res.status(500).send("Error adding user");
    } else {
      res
        .status(201)
        .json({ message: "User added successfully", userId: results.insertId });
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
