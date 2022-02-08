const Station = require("./models/Station");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TG_TOKEN);

const alertUser = async (machineId) => {
  let station = await Station.findOne({ machineId });
  // console.log(station);
  if (station.active) {
    let message = `
ALERT 🔴
${station.name} is full.
    `;
    bot.sendMessage(process.env.CHAT_ID, message);
  }
};

module.exports = { alertUser };
