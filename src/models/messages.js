const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yur0n:786512@cluster0.0na8y.mongodb.net/Messages-From-VK?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})


const dataBase = new mongoose.Schema ({
    date: {
        type: String
    },
    type: {
        type: String
    },
    dataRecieved: {
        type: Object
    }
})


const DataVK = mongoose.model('Data', dataBase)

module.exports = DataVK
