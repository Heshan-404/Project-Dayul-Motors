import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import logger from "./utils/logger.js";
import config from "./config/config.js";
import db from "./utils/database.connection.js";

const app = express();
dotenv.config();
const PORT = config.SERVER_PORT;

app.get("/", (req, res, next) => {
  res.send(
    "<h1 style='text-align:center'>Welcome to Dayul Motors Backend</h1>"
  );
  next();
});

app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM PhoneBook;");
    db.release();
    res.send(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  logger.warn("Server is listening on port " + PORT);
});
