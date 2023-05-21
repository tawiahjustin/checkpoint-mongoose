//mongoose import
const mongoose = require('mongoose')
// Person Schema creation
const personSchema = new mongoose.Schema({
  name: { type: 'String', required: true },
  age: Number,
  favoriteFoods: [String],
})
// model export
module.exports = mongoose.model('Person', personSchema)
