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

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
