const Visitor = require('../models/visitors')


const visit = async (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip
    let visits = 1
    try {
        let currentIp = await Visitor.findOne({ ip })
        if (currentIp == null) {
            const newVisit = new Visitor({
                ip,
                visits
            })
            await newVisit.save().then(() => {
                console.log('New visitor saved')
            }).catch((error) => {
                console.log('Error', error)
            })
        } else {
            currentIp.visits += 1
            await currentIp.save()
            console.log('Visitor updated')
        }
    } catch(e) {
        console.log(e)
    }
    next()
}

module.exports = visit
