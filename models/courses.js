const moongose = require('mongoose')

const { Schema } = moongose

const coursesSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  image: String
})

module.exports = moongose.model('Courses', coursesSchema)
