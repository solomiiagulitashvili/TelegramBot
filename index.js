const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");

const token = "1000268978:AAFrnLjdhcqFnF-5Hj8gxuxnwVdKXQZxG3k";

const bot = new TelegramBot(token, { polling: true });

let notes = [];

bot.onText(/\/start/, msg => {
  bot.sendMessage(
    msg.from.id,
    "Введи задание и время, а я напомню (Пример: /напомни покормить кошку в 14:30)."
  );
});

bot.onText(/\/напомни (.+) в (.+)/, (msg, match) => {
  const userId = msg.from.id;
  let note = match[1];
  let time = match[2];

  notes.push({ id: userId, note: note, time: time });
  bot.sendMessage(userId, "Я напомню, если не поломаюсь.");
});

setInterval(() => {
  for (let i = 0; i < notes.length; i++) {
    const minutes = new Date().getMinutes();
    let minutesFormatted = minutes;
    console.log(minutesFormatted);
    if (minutes < 10) {
      minutesFormatted = "0" + minutes;
    }

    const currentDate = new Date().getHours() + ":" + minutesFormatted;
    console.log(currentDate);
    if (notes[i]["time"] === currentDate) {
      bot.sendMessage(notes[i]["id"], "Самое время" + " " + notes[i]["note"]);
      notes.splice(i, 1);
    }
  }
}, 1000);
app.get("/*", (req, res) => {
  res.status(200).send();
});
app.listen(process.env.PORT || 8080, () => {
  console.log("i am listening");
});
