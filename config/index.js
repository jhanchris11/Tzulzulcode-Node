require('dotenv').config()
const config = {
  dev: process.env.MODE,
  port: process.env.PORT || 4000,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD
}

module.exports = config
