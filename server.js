// Простий сервер для прийому листів з футера і надсилання на email
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Налаштуйте транспортер для вашої пошти
const transporter = nodemailer.createTransport({
  service: "gmail", // або інший поштовий сервіс
  auth: {
    user: process.env.MAIL_USER, // ваша пошта
    pass: process.env.MAIL_PASS, // пароль або app password
  },
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_RECEIVER,
      subject: `Новий лист з портфоліо від ${name}`,
      text: message,
      html: `<p><b>Від:</b> ${name} (${email})</p><p>${message}</p>`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
