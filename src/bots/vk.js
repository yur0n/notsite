const Slimbot = require('slimbot');
const bot = new Slimbot('1915366945:AAEwTu7T3G6A8ooESb4jSdfpDQcogsAHxJQ') //1928057359:AAEe94RZJ7oheBjlyE-gThde79JhU72mSJU


  const rudi = 378931386
// const yur0n = 378931386
// const rudi = 267424833

bot.on('message',  mes => {
    bot.sendMessage(mes.chat.id, 'Я буду автоматически присылать новую информацию о твоей группе.')
    console.log(mes.chat.id)
})

const getData = async (data) => {
try {    
    let optionsMarketComment = {
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
          { text: "Подробнее", url: `https://vk.com/market-124949590?w=product-124949590_${data.item_id}`}]]})}
    switch (data.type) {
        case 'message_new':
            let options = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/im?sel=-${data.group_id}`}]]})}
            await bot.sendMessage(rudi, 'Входящее сообщение')
                  bot.sendMessage(rudi, data.object.message.text, options)
            break
        case 'wall_reply_new':
            let options = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/sib_herb?w=wall-124949590_${data.post_id}`}]]})}
            await bot.sendMessage(rudi, 'Добавление комментария на стене')
                  bot.sendMessage(rudi, data.object.text, options)                
        case 'board_post_new':
            let options = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/topic-124949590_${data.topic_id}`}]]})}
            await bot.sendMessage(rudi, 'Создание комментария в обсуждении')
                  bot.sendMessage(rudi, data.object.text, options)     
            break
        case 'market_comment_new':
            await bot.sendMessage(rudi, 'Новый комментарий к товару')
                  bot.sendMessage(rudi, data.object.text, optionsMarketComment)
            break
        case 'market_comment_edit':
            await bot.sendMessage(rudi, 'Редактирование комментария к товару')
                  bot.sendMessage(rudi, data.object.text, optionsMarketComment)  
            break
        case 'market_comment_restore':
            await bot.sendMessage(rudi, 'Восстановление комментария к товару')
                  bot.sendMessage(rudi, data.object.text, optionsMarketComment)  
            break
        case 'vkpay_transaction':
            let options = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/market-124949590?w=product-124949590_${data.item_id}`}]]})}
                  bot.sendMessage(rudi, 'Платёж через VK Pay')
                  bot.sendMessage(rudi, `${data.object.amount} руб. с комментарием: ${data.object.description}`, options) 
            break
    }
} catch(e) {
    bot.sendMessage(rudi, 'Ошибка обработки события, необходимо связаться с yur0n')
}
}

module.exports = getData

bot.startPolling(); 






