const Slimbot = require('slimbot');
const bot = new Slimbot('1928057359:AAEe94RZJ7oheBjlyE-gThde79JhU72mSJU')



// const yur0n = 378931386
const rudi = 267424833

bot.on('message',  mes => {
    bot.sendMessage(mes.chat.id, 'Я буду автоматически присылать новую информацию о твоей группе.')
    console.log(mes.chat.id)
})

const getData = async (data) => {
try {    
    const line = '➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖'
    const optionsMarketComment = {
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
          { text: "Подробнее", url: `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`}]]})}
    switch (data.type) {
        case 'wall_reply_new':
            let options1 = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/sib_herb?w=wall-124949590_${data.object.post_id}`}]]})}
            await bot.sendMessage(rudi, 'Добавление комментария на стене:')
            await bot.sendMessage(rudi, data.object.text, options1)
                  bot.sendMessage(rudi, line)
            break        
        case 'message_new':
            let options0 = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.message.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/im?sel=-${data.group_id}`}]]})}
            await bot.sendMessage(rudi, 'Входящее сообщение:')
            await bot.sendMessage(rudi, data.object.message.text, options0)
                  bot.sendMessage(rudi, line)
            break        
        case 'board_post_new':
            let options2 = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/topic-124949590_${data.object.topic_id}`}]]})}
            await bot.sendMessage(rudi, 'Создание комментария в обсуждении:')
            await bot.sendMessage(rudi, data.object.text, options2)
                  bot.sendMessage(rudi, line)     
            break
        case 'market_comment_new':
            await bot.sendMessage(rudi, 'Новый комментарий к товару:')
            await bot.sendMessage(rudi, data.object.text, optionsMarketComment)
                  bot.sendMessage(rudi, line)
            break
        case 'market_comment_edit':
            await bot.sendMessage(rudi, 'Редактирование комментария к товару:')
            await bot.sendMessage(rudi, data.object.text, optionsMarketComment)
                  bot.sendMessage(rudi, line)  
            break
        case 'market_comment_restore':
            await bot.sendMessage(rudi, 'Восстановление комментария к товару:')
            await bot.sendMessage(rudi, data.object.text, optionsMarketComment)
                  bot.sendMessage(rudi, line)  
            break
        case 'vkpay_transaction':
            let options3 = {
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify({
                  inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
                  { text: "Подробнее", url: `https://vk.com/market-124949590?w=product-124949590_${data.object.item_id}`}]]})}
            await bot.sendMessage(rudi, 'Платёж через VK Pay:')
            await bot.sendMessage(rudi, `${data.object.amount} руб. с комментарием: ${data.object.description}`, options3)
                  bot.sendMessage(rudi, line) 
            break
    }
} catch(e) {
    await bot.sendMessage(rudi, 'Ошибка обработки события, необходимо связаться с yur0n')
    bot.sendMessage(rudi, line)
}
}

module.exports = getData

bot.startPolling(); 






