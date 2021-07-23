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
    let options = {
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          inline_keyboard: [[{ text: "От кого?", url: `https://vk.com/id${data.object.from_id}`}, 
          { text: "Подробнее", url: `https://vk.com/market-124949590?w=product-124949590_${data.item_id}`}]]
        })
    }
    switch (data.type) {
        case 'message_new':
            await bot.sendMessage(rudi, 'Входящее сообщение')
                  bot.sendMessage(rudi, data.object.message.text)
            break
        case 'wall_reply_new':
            await bot.sendMessage(rudi, 'Добавление комментария на стене')
                  bot.sendMessage(rudi, data.object.text)                
        case 'board_post_new':
            await bot.sendMessage(rudi, 'Создание комментария в обсуждении')
                  bot.sendMessage(rudi, data.object.text)     
            break
        case 'market_comment_new':
            await bot.sendMessage(rudi, 'Новый комментарий к товару')
                  bot.sendMessage(rudi, data.object.text)
            break
        case 'market_comment_edit':
            await bot.sendMessage(rudi, 'Редактирование комментария к товару')
                  bot.sendMessage(rudi, data.object.text)  
            break
        case 'market_comment_restore':
            await bot.sendMessage(rudi, 'Восстановление комментария к товару')
                  bot.sendMessage(rudi, data.object.text)  
            break
        case 'vkpay_transaction':
                  bot.sendMessage(rudi, 'Платёж через VK Pay', options)
            break
    }
} catch(e) {
    bot.sendMessage(rudi, 'Ошибка обработки события, необходимо связаться с yur0n')
}
}

module.exports = getData

bot.startPolling(); 






