const botgram = require("botgram")
const bot = botgram("1833660201:AAGFGU0dU9jXWEvvCHTLJ-uCBVfoghllVjY")
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')

bot.command("start", function (msg, reply, next) {
  reply.text(`Привет ${msg.from.name}, я хренобот - люблю хрен и даю прогноз погоды. Хрен я уже съел, самое время узнать погоду!`)
  reply.text('Я инглишспикер, поэтому город пиши на английском.')
  console.log("Received a /start command from", msg.from.username || msg.from.name);
});

bot.text(function (msg, reply, next) {
  console.log(msg.text)
  reply.text('Loading...')
  geocode(msg.text, (error, data) => {
    if (error) {
        return reply.editText(msg.id + 1, error)
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
          reply.editText(msg.id + 1, error)
        }
        reply.editText(msg.id + 1, forecastData.today)
      })
  })
}); 