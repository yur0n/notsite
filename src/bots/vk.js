const Slimbot = require('slimbot');
const bot = new Slimbot('1928057359:AAEe94RZJ7oheBjlyE-gThde79JhU72mSJU')

// const yur0n = 378931386
const rudi = 267424833

bot.on('message',  mes => {
    bot.sendMessage(mes.chat.id, 'Я буду автоматически присылать новую информацию о твоей группе.')
    console.log(mes.chat.id)
})

const getData = async (data) => {
    switch (data.type) {
        case 'message_new':
            await bot.sendMessage(rudi, 'Входящее сообщение')
                  bot.sendMessage(rudi, `От ${data.object.message.from_id}: ${data.object.message.text}`)
            break
        case 'wall_reply_new':
            await bot.sendMessage(rudi, 'Добавление комментария на стене')
                  bot.sendMessage(rudi, `От ${data.object.from_id}: ${data.object.text}`)                
        case 'board_post_new':
            await bot.sendMessage(rudi, 'Создание комментария в обсуждении')
                  bot.sendMessage(rudi, `От ${data.object.from_id}: ${data.object.text}`)     
            break
        case 'market_comment_new':
            await bot.sendMessage(rudi, 'Новый комментарий к товару')
                  bot.sendMessage(rudi, `От ${data.object.from_id}: ${data.object.text}`)  
            break
        case 'market_comment_edit':
            await bot.sendMessage(rudi, 'Редактирование комментария к товару')
                  bot.sendMessage(rudi, `От ${data.object.from_id}: ${data.object.text}`)  
            break
        case 'market_comment_restore':
            await bot.sendMessage(rudi, 'Восстановление комментария к товару')
                  bot.sendMessage(rudi, `От ${data.object.from_id}: ${data.object.text}`)  
            break
        case 'vkpay_transaction':
            await bot.sendMessage(rudi, 'Платёж через VK Pay')
                  bot.sendMessage(rudi, `От ${data.object.from_id}: ${data.object.amount}`)  
            break
    }
}

module.exports = getData

bot.startPolling();