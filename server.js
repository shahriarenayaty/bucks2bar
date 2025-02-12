// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "10mb" }));

// Serve static files from this directory
app.use(express.static(__dirname));

app.post("/send-email", (req, res) => {
  const { email, image } = req.body;
  console.log("Sending email to:", { email, image });

  if (!validateEmail(email)) {
    return res.status(400).send("Invalid email address.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  const mailOptions = {
    from: "test@resend.dev",
    to: email,
    subject: "Your Chart Image",
    text: "Please find your chart image attached.",
    attachments: [
      {
        filename: "chart.png",
        content: image.split(",")[1],
        encoding: "base64",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Failed to send email.");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully!");
    }
  });
});

// New endpoint to return dummy data
app.get("/dummy-data", (req, res) => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const dummyData = {};
  months.forEach((month) => {
    const income = Math.floor(Math.random() * 801) + 200; // random between 200-1000
    const expenses = Math.floor(Math.random() * (income - 200)) + 200;
    dummyData[month] = { income, expenses };
  });
  res.json(dummyData);
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Automatically open the browser to index.html using dynamic import
  (async () => {
    const open = await import("open");
    open.default(`http://localhost:${PORT}`);
  })();
});
