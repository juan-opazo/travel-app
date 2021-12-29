import fetch from "node-fetch";
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

// const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
import cors from 'cors'
app.use(cors())
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
const server = app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post('/getLocation', async(req, res) => {
    const url = `http://api.geonames.org/searchJSON?q=${req.body.location}&maxRows=1&username=${process.env.GEONAMES_ID}`;
    const response = await fetch(url);
    try {
        const data = await response.json();
        let coordinates = {
            lat: data.geonames[0].lat,
            long: data.geonames[0].lng
        };
        res.send(coordinates);
    } catch (error) {
        console.log("Error", error);
    }
})

app.post('/getWeather', async(req, res) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.long}&key=${process.env.WEATHERBIT_KEY}`;
    const response = await fetch(url)
    try {
        const data = await response.json();
        res.send(data);
    } catch(error) {
        console.log("Error", error);
    }
})

app.post('/getPhoto', async(req, res) => {
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${req.body.city}&image_type=photo`;
    const response = await fetch(url)
    try {
        const data = await response.json();
        res.send(data);
    } catch(error) {
        console.log("Error", error);
    }
})