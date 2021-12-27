const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')


// const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'


const app = express()

app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

