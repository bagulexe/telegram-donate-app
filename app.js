const express = require("express");
const TonWeb = require("tonweb");

const app = express();
const port = 3000;

// Настройка TON
const tonweb = new TonWeb(); // Инициализация TonWeb
const walletAddress = "UQAzq-wfpBQCc6RB0B2XbxZCCsOb-yjseTU_HRO4uXCkFB1rUQAzq-wfpBQCc6RB0B2XbxZCCsOb-yjseTU_HRO4uXCkFB1r"; // Твой кошелек TON
const donationAmount = 10 * Math.pow(10, 9); // 10 TON в nanoTON

// Главная страница с кнопкой для доната
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>TON Donation</title>
        <style>
          body {
            background-color: #121212;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            margin: 0;
          }
          .container {
            text-align: center;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          button {
            padding: 20px 40px;
            font-size: 18px;
            cursor: pointer;
            background-color: #6200ea;
            border: none;
            color: white;
            border-radius: 12px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #3700b3;
          }
          h1 {
            font-size: 32px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <button onclick="location.href='/donate'">Fall</button> <!-- Текст кнопки изменен на "Fall" -->
        </div>
      </body>
    </html>
  `);
});

// Страница проверки доната
app.get("/donate", async (req, res) => {
  try {
    const transactions = await tonweb.getTransactions(walletAddress);

    // Проверка на успешный донат
    const donation = transactions.find(tx => tx.in_msg.value === donationAmount);

    if (donation) {
      res.send(`
        <html>
          <head><title>Success</title></head>
          <body style="background-color: #121212; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: Arial, sans-serif; margin: 0;">
            <div class="container">
              <h1>Thank you for your donation! 🎉</h1>
              <p><a href="https://your-link.com" target="_blank" style="color: #6200ea; font-size: 18px; text-decoration: none;">Go to the link</a></p>
            </div>
          </body>
        </html>
      `);
    } else {
      res.send(`
        <html>
          <head><title>Donation Failed</title></head>
          <body style="background-color: #121212; color: white; display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: Arial, sans-serif; margin: 0;">
            <div class="container">
              <h1>Fall</h1>
              <p>Donation not found</p>
              <button onclick="location.href='/'" style="background-color: #6200ea; padding: 20px 40px; font-size: 18px; cursor: pointer; color: white; border-radius: 12px;">Back</button>
            </div>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred");
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
