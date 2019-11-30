// process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");

const token = "1000268978:AAFrnLjdhcqFnF-5Hj8gxuxnwVdKXQZxG3k";

const bot = new TelegramBot(token, { polling: true });

let notes = [];

bot.onText(/\/напомни (.+) в (.+)/, function(msg, match) {
  const userId = msg.from.id;
  let note = match[1];
  let time = match[2];

  notes.push({ id: userId, note: note, time: time });
  bot.sendMessage(userId, "Я напомню, если не поломаюсь.");
});

setInterval(() => {
  for (let i = 0; i < notes.length; i++) {
    const currentDate = new Date().getHours() + ":" + new Date().getMinutes();
    if (notes[i]["time"] === currentDate) {
      bot.sendMessage(notes[i]["id"], "Самое время" + " " + notes[i]["note"]);
      notes.splice(i, 1);
    }
  }
}, 1000);
