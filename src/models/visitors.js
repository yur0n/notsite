const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yur0n:786512@cluster0.0na8y.mongodb.net/Messages-From-VK?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})

const schema = new mongoose.Schema({
    ip: 'string',
    visits: 'number',
    firstVisit: 'string',
    lastVisit: 'string'
})

const Visitor = mongoose.model('Visitor', schema)

module.exports = Visitor