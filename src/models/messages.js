const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yur0n:786512@cluster0.0na8y.mongodb.net/Website?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})


const dataBase = new mongoose.Schema ({
    date: {
        type: String
    },
    name: {
        type: String
    },
    dataRecieved: {
        type: Object
    }
})


const DataVK = mongoose.model('vkmessage', dataBase)

module.exports = DataVK
