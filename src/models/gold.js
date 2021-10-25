const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yur0n:786512@cluster0.0na8y.mongodb.net/Website?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})

const schema = new mongoose.Schema({
    name: 'string',
    bonus: 'number',
    chat: 'number'
})

const Golduser = mongoose.model('Golduser', schema)

module.exports = Golduser