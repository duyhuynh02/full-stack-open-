const mongoose = require('mongoose')
//dùng để make sure là collection không có duplicate value trong database
//trước khi saving a document, và sẽ throw validation error 
const uniqueValidator = require('mongoose-unique-validator')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

authorSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', authorSchema)