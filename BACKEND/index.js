const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser"); // Import body-parser
const nodemailer = require("nodemailer"); // Import nodemailer
// Use body-parser middleware
const app = express();
app.use(bodyParser.json());

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "pubg200212111@gmail.com",
    pass: "mbmj gbew qeoz nflk",
  },
});
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
  const { password, email } = req.body;
  console.log("Raw Request Body:", req.body);
  console.log(password);
  console.log(email);
  if (!password || !email) {
    return res.status(400).send("password and email are required");
  }

  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  const values = [email, password];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting user:", error);
      res.status(500).send("Error adding user");
    } else {
      // Send email after successful insertion
      const mailOptions = {
        from: {
          name: "Dayul Motors", // Replace with your name
          address: "pubg200212111@gmail.com", // Replace with your email
        },
        to: email, // Send email to the newly registered user
        subject: "Welcome!",
        text: "Welcome to our service! We are glad you joined us.",
        html: "<b>Welcome to our service! We are glad you joined us.</b>",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        console.error("Email sending started");
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res
        .status(201)
        .json({ message: "User added successfully", userId: results.insertId });
    }
  });
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = "SELECT * FROM users WHERE id = ?";
  const values = [id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      res.status(500).send("Error retrieving user");
    } else {
      if (results.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.json(results[0]); // Send the first (and likely only) result
      }
    }
  });
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
