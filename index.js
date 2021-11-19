const express = require('express')
const routes = require('./routers')
const cors = require('cors')
const app = express()

require('./config/db')
//Middleware

app.use(express.json())

app.use(cors())

app.use('/', routes)

//app

app.listen(4000, () => {
  console.log(`Running server 🔥`)
})
