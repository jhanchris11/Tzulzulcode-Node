const mongoose = require('mongoose')
const config = require('./index')

async function connection() {
  try {
    await mongoose.connect(
      `mongodb+srv://${config.dbUsername}:${config.dbPassword}@${config.clusterName}/${config.dbName}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log(`Successfully connected to ${config.dbName} database`)
  } catch (e) {
    throw new e('Failed connection Mongo')
  }
}

module.exports = connection
