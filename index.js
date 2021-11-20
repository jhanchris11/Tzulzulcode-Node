const express = require('express')
const routes = require('./routers')
const cors = require('cors')
const app = express()
const config = require("./config/index.js");
require('./config/db')
//Middleware

app.use(express.json())

app.use(cors())

app.use('/', routes)

//app

app.listen(config.port, () => {
  console.log(`Running server 🔥`)
})
