const mongoose = require('mongoose')
const config = require('./index')

async function connection() {
  await mongoose.connect(
    `mongodb+srv://${config.username}:${config.password}@dbcluster.ikiuh.mongodb.net/CoursesDB`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
}
connection()

module.exports = mongoose
