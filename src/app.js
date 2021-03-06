const path = require('path') //Path for ez pathing
const express = require('express')
const hbs = require('hbs') //Handlebars
const geoip = require('geoip-lite') // IP to location
const visit = require('./middleware/visitors.js') // middleware with IP check and database record



// BOTS
// require('./bots/warzone.js')                                  
require('./bots/weather.js')
require('./bots/dota.js')
require('./bots/vk.js')
require('./bots/golden.js')
const newBuy = require('./bots/golden')    
const getData = require('./bots/vk')
const DataVK = require('./models/messages.js')
const GoldUser = require('./models/gold.js')
                                      

// Import
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.set('trust proxy', true) // Proxy trust for req.ip

app.use(express.json()) // middleware to POST json (req.body)
// Setup static engine and views location

app.post('/vk', async (req, res) => {
    getData(req.body)
    res.send('ok')
    console.log(req.body)  
})

app.get('/vk', async (req, res) => {
    res.send(await DataVK.find({}))
})


app.get('', visit, (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Me',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Me'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        mes: 'Noone can help you.',
        title: 'Help',
        name: 'Me'
    })
})

app.get('/ip', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip
    if (ip === '::1') {          // So it can work on localhost
        ip = '93.77.79.107'      // So it can work on localhost
    }
    const geo = geoip.lookup(ip)
    res.render('ip', {
        title: 'IP',
        name: 'Me',
        ip,
        geo,
        lat: geo.ll[0],
        long: geo.ll[1]
        })
})

app.get('/weather', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip   //identify ip
    const geo = geoip.lookup(ip)                                                      //find location by ip
    if (!req.query.address && !geo) {                                                 //use query adress or adress by ip
        return res.send({
            error: 'You must provide an address'
        })  
    }
    geocode(req.query.address || geo.city, (error, geocodeData) => { 
        if (error) {
            return res.send({ error })
        }
        forecast(geocodeData.latitude, geocodeData.longitude,  (error, forecastData ) => {
            if (error) {
                return res.send({
                    error: error
            })
            }
            res.send({
                'forecast': forecastData.today,
                'location': geocodeData.location, //location from geocode
                'address': req.query.address,  // address from query
                daily: forecastData.tomorrow
            })
        })
    })
})

app.get('/bots', (req, res) => {
    res.render('bots', {
        title: 'Bots',
        name: 'Me'
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send(
            'You must provide a search term'
        )
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/gold', (req, res) => {
    res.render('gold', {
        title: 'GoldenShop',
        name: 'Me',
    })
})

app.get('/goldSilent', async (req, res) => {
    let goldUserName = req.query.name
    let goldUserBonus = req.query.bonus
    if (!goldUserName || !goldUserBonus) {                                                 
        return res.send({
            error: '???????????????? ?????????? ?? ?????????????? ??????'
        })  
    }
    res.send({
        message: `?????????????? ???? ??????????????, ${goldUserName}! ?????? ???????? ?????????????????? ????????????.`
    })
    try {
        let currentGoldUser = await GoldUser.findOne({name: goldUserName})
        if (!currentGoldUser) {
            const newGoldUser = new GoldUser({
                name: goldUserName,
                bonus: goldUserBonus
            })
            await newGoldUser.save().then(() => {
                console.log(`New GoldUser saved`)
            }).catch((error) => {
                console.log('Error', error)
            })
        } else {
            currentGoldUser.bonus += +goldUserBonus
            await currentGoldUser.save()
            console.log(`GoldUser updated`)
            newBuy({goldUserName, goldUserBonus})
        }
    } catch (e) {
        console.log(e)
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Help article not found.',
        name: 'Me'
    })
})



app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        mes: 'Page not found',
        name: 'Me'
    })
})



app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})