const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());

// Configure nodemailer (with Vercel environment variables)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pubg200212111@gmail.com",
    pass: "mbmj gbew qeoz nflk",
  },
});

// Configure MySQL connection
const connection = mysql.createPool({
  host: "bw3ryqxw0xyxk0s9u6ze-mysql.services.clever-cloud.com",
  port: "3306",
  user: "ufbxvknaudaeqojb",
  password: "O2XsuyJPXAiqxPtmen5R",
  database: "bw3ryqxw0xyxk0s9u6ze",
});

// Connect to the database (asynchronous)
connection
  .getConnection()
  .then((conn) => {
    console.log("Connected to MySQL database!");
    conn.release();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err);
  });

// Define your routes and make queries to your database

app.get("/users", async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM users");
    console.log("fetched");
    res.send(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.post("/users", async (req, res) => {
  const { password, email } = req.body;
  console.log("Raw Request Body:", req.body);
  console.log(password);
  console.log(email);

  if (!password || !email) {
    return res.status(400).send("password and email are required");
  }

  try {
    const [results] = await connection.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password]
    );
    // Send email after successful insertion
    const mailOptions = {
      from: {
        name: "Dayul Motors",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: "Welcome!",
      text: "Welcome to our service! We are glad you joined us.",
      html: "<b>Welcome to our service! We are glad you joined us.</b>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent:", info.response);
        res
          .status(201)
          .json({
            message: "User added successfully",
            userId: results.insertId,
          });
      }
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send("Error adding user");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const [results] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.json(results[0]);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error retrieving user");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
