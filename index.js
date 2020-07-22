const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'
const pages = require('./routes/pages')
const series = require('./routes/series')

// process request body (post)
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.Promise = global.Promise //define que o mongoose utilize a biblioteca de promises padrão

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', pages)
app.use('/series', series)

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log('listening on: ' + port))
  })
  .catch(e => {
    console.log(e)
  })
