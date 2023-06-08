// import express
const express = require("express");
// create express application
const app = express();

const path = require("path");

//nodemailer
const nodemailer = require("nodemailer");

// cors
const cors = require("cors");

// configure dotnev
require("dotenv").config();

app.listen(4000, console.log("server is running on 4000..."));

// backend integration with frontend
app.use(express.static(path.join(__dirname, "../build")));

// body parser
app.use(express.json());

app.use(cors());

// send mail logic
app.post("/send-mail", async (req, res) => {
  res.send({ message: req.body });
  // setting up the email configuration
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  // setting up mailOptions
  let mailOptions = {
    from: "vishnuvardhanudagundla7@gmail.com",
    to: "vv50285@gmail.com",
    subject: "Task Remainder!!!",
    text: req.body.name,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent" + info.response);
    }
  });
});
