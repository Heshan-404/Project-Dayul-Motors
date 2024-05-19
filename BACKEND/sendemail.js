const nodemailer = require("nodemailer");
require("dotenv").config();

const path = require("path");

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

const mailOptions = {
  from: {
    name: "Tharushka",
    address: "pubg200212111@gmail.com",
  }, // sender address
  to: ["heshantharushka2002@gmail.com"], // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
  attachments: [
    {
      filename: "test.pdf",
      path: path.join(__dirname, "test.pdf"),
      contentType: "application/pdf",
    },
    {
      filename: "sample.jpg",
      path: path.join(__dirname, "sample.jpg"),
      contentType: "image/jpg",
    },
  ],
};

const sendmail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

sendmail(transporter, mailOptions);
